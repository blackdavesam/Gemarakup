// game.js
import * as state from './state.js';
import el from './elements.js'; // <-- CORRECTED: Default import
import { navigateTo, showModal, hideModal, showFullscreenModal, showEventModal, updateScoreboard } from './ui.js';
import { saveHighScore } from './db.js';

// --- GAME LIFECYCLE ---

export function startGame(numberOfSquares) {
    navigateTo(state.CONSTANTS.PAGES.GAME);
    
    const newTeams = state.gameState.teams.map(t => ({
        ...t,
        score: 0,
        hasAnnulCard: false
    }));

    state.setGameState({
        ...state.gameState,
        currentTurn: 0,
        squaresLeft: numberOfSquares,
        teams: newTeams,
        isHotStreak: false,
        doubleNextOutcome: false,
        keepFriendsCloseTargetTeamId: null
    });

    state.setShuffledDeck(createShuffledDeck(numberOfSquares));
    
    const theme = state.activeGameTheme;
    if (theme.backgroundImageData) {
        document.body.style.backgroundImage = `url(${theme.backgroundImageData})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    } else {
         document.body.style.backgroundImage = '';
    }
    
    if (theme.backgroundMusicData) {
        el.backgroundMusic.src = theme.backgroundMusicData;
        el.backgroundMusic.play().catch(e => console.warn("Audio autoplay was prevented.", e));
    } else {
         el.backgroundMusic.pause();
         el.backgroundMusic.src = '';
    }

    loadSoundEffects(theme);
    createBoard(numberOfSquares);
    startTurn();
}

function createBoard(numberOfSquares) {
    el.board.innerHTML = '';
    const cols = Math.ceil(Math.sqrt(numberOfSquares));
    const rows = Math.ceil(numberOfSquares / cols);
    el.board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    el.board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const theme = state.activeGameTheme;
    const colors = theme.palette && theme.palette.length > 0 ? theme.palette : state.DEFAULT_COLORS;
    const useEmojis = theme.emojis && theme.emojis.length > 0;
    const emojiMode = theme.emojiMode || 'overlay';

    for (let i = 0; i < numberOfSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');

        if (useEmojis) {
            square.textContent = theme.emojis[i % theme.emojis.length];
            square.style.fontSize = '3rem';
            square.style.textAlign = 'center';
            square.style.lineHeight = '1.2';
        }

        if (useEmojis && emojiMode === 'replace') {
            square.style.backgroundColor = 'var(--light-bg)';
        } else {
            square.style.backgroundColor = colors[i % colors.length];
        }

        square.addEventListener('click', handleSquareClick);
        el.board.appendChild(square);
    }
}

function endGame() {
    if(state.sfx.gameOver) state.sfx.gameOver.play();
    
    const winner = [...state.gameState.teams].sort((a, b) => b.score - a.score)[0];
    const db = state.db;

    if (db) {
        const transaction = db.transaction(['teams'], 'readwrite');
        const store = transaction.objectStore('teams');
        
        state.gameState.teams.forEach(playedTeam => {
            if (playedTeam.dbId) { 
                const request = store.get(playedTeam.dbId);
                request.onsuccess = () => {
                    const teamRecord = request.result;
                    if (teamRecord) {
                        teamRecord.totalScore = (teamRecord.totalScore || 0) + playedTeam.score;
                        if (playedTeam.dbId === winner.dbId) {
                            teamRecord.wins = (teamRecord.wins || 0) + 1;
                        } else {
                            teamRecord.losses = (teamRecord.losses || 0) + 1;
                        }
                        store.put(teamRecord);
                    }
                };
            }
        });
        
        transaction.oncomplete = () => { console.log("All team stats have been saved."); };
        transaction.onerror = (e) => { console.error("Error saving team stats:", e.target.error); };
    }

    el.winnerAvatar.textContent = winner.avatar;
    el.winnerName.textContent = winner.name;
    el.winnerScore.textContent = `Final Score: ${winner.score}`;
    saveHighScore(winner);
    showModal(el.gameOverModal);
}

export function resetToMenu() {
    hideModal(el.gameOverModal); 
    navigateTo(state.CONSTANTS.PAGES.SETUP);
    document.body.style.backgroundImage = '';
    el.backgroundMusic.pause();
    el.backgroundMusic.src = '';
    
    state.setGameState({ ...state.gameState, teams: [], currentTurn: 0 });
    
    if (typeof Howler !== 'undefined') {
        Howler.unload();
    }
    state.setSfx({});
}

// --- TURN LOGIC ---

export function startTurn() {
    console.log(`[DEBUG] Starting turn for ${state.gameState.teams[state.gameState.currentTurn].name}. Mode: ${state.gameState.gameMode}`);
    state.gameState.isTurnActive = false;
    updateScoreboard();
    
    if (state.gameState.keepFriendsCloseTargetTeamId) {
         console.log("[DEBUG] Keep Friends Close is active. Current player selects for opponent.");
         showEventModal(`<h2>Keep Your Friends Close!</h2><p>${state.gameState.teams[state.gameState.currentTurn].avatar} ${state.gameState.teams[state.gameState.currentTurn].name}, choose a square for your target!</p>`);
         state.gameState.isTurnActive = true; 
         return; 
    }

    if (state.gameState.gameMode === 'math') {
        const question = new MathQuestion(state.gameState.mathDifficulty);
        displayQuestion(question);
    } else { 
        state.gameState.isTurnActive = true;
    }
}

export function endTurn() {
     if (state.gameState.isHotStreak) {
          console.log("[DEBUG] Hot Streak active, turn continues for same player.");
          state.gameState.isTurnActive = true;
          showEventModal("<h2>Hot Streak!</h2><p>Pick another square!</p>");
          return;
     }

     if (state.gameState.squaresLeft <= 0) {
        endGame();
        return;
    }
    
    const newTurn = (state.gameState.currentTurn + 1) % state.gameState.teams.length;
    state.setGameState({ ...state.gameState, currentTurn: newTurn });
    startTurn();
}

function handleSquareClick(e) {
    if (typeof Howler !== 'undefined') {
        Howler.autoUnlock = true;
    }

    if (!state.gameState.isTurnActive) return;
    if (e.target.classList.contains('flipped')) return;

    if (state.gameState.keepFriendsCloseTargetTeamId) {
        handleKeepFriendsCloseSelection(e.target);
        return;
    }

    state.gameState.isTurnActive = false; 
    e.target.classList.add('flipped');
    state.gameState.squaresLeft--;
    
    const eventCard = state.shuffledDeck.pop();
    state.setShuffledDeck(state.shuffledDeck); // Update state reference

    if(eventCard) {
        console.log('[DEBUG] Popped card:', eventCard.name, '| Type:', eventCard.type); 
        processEvent(eventCard);
    } else {
         console.warn("[DEBUG] Popped undefined card from deck!");
        if (state.gameState.squaresLeft <= 0) {
             endGame();
        } else {
             setTimeout(endTurn, 500); 
        }
    }
}

export function processEvent(eventCard, overrideTargetTeamId = null) {
    const targetTeamId = overrideTargetTeamId || state.gameState.teams[state.gameState.currentTurn].dbId;
    const targetTeamIndex = state.gameState.teams.findIndex(t => t.dbId === targetTeamId);

    if (targetTeamIndex === -1) {
         console.error(`Target team with ID ${targetTeamId} not found!`);
         setTimeout(endTurn, 500);
         return;
    }
    
    const team = state.gameState.teams[targetTeamIndex];
    const isOwnTurn = team.dbId === state.gameState.teams[state.gameState.currentTurn].dbId;

    let message = `<h2>${team.avatar} ${team.name}</h2>`;
    let sfxToPlay = null; 
    let selectedImageUrl = null; 
    let originalValue = eventCard.value; 
    let annulled = false;

    // 1. Check for Annul Card
    if (team.hasAnnulCard && 
       ((eventCard.type === 'points' && eventCard.value < 0) || 
        (eventCard.type === 'special' && eventCard.action === 'lose_half'))) 
    {
        console.log(`[DEBUG] Team ${team.name} annuls negative outcome with card.`);
        message += `<p>Used 'Get Out of Jail Free' card! 🃏</p>`;
        message += `<p><s>${eventCard.name}</s> Annulled!</p>`;
        team.hasAnnulCard = false; 
        sfxToPlay = 'special';
        annulled = true; 
    }

    // 2. Check for Double Trouble
    let doubled = false;
    if (state.gameState.doubleNextOutcome && isOwnTurn) {
        console.log("[DEBUG] Applying Double Trouble!");
        doubled = true;
        state.gameState.doubleNextOutcome = false;
    }

    // 3. Get Image
    const imagePool = state.activeGameTheme.images?.[eventCard.name] || state.activeGameTheme.images?.['Secret Dungeon Entrance!'];
    if (imagePool && imagePool.length > 0) {
        selectedImageUrl = imagePool[Math.floor(Math.random() * imagePool.length)];
    }

    // 4. Process Card Type
    if (eventCard.type === 'points' && !annulled) {
        let valueToApply = eventCard.value;
        if (doubled) valueToApply *= 2;
        team.score += valueToApply;
        message += `<p>${eventCard.name}${doubled ? ' (x2!)' : ''}</p>`;
        
        if (originalValue >= 15) sfxToPlay = 'highGain';
        else if (originalValue > 0) sfxToPlay = 'lowGain';
        else if (originalValue <= -15) sfxToPlay = 'highLoss';
        else sfxToPlay = 'lowLoss';
        
    } else if (eventCard.type === 'special' && !annulled) {
        sfxToPlay = 'special';
        if (eventCard.action === 'double') {
            const multiplier = doubled ? 4 : 2;
            team.score *= multiplier;
            message += `<p>Double Points!${doubled ? ' (x2!)' : ''}</p>`;
        } else if (eventCard.action === 'lose_half') {
            if (!doubled) {
                team.score = Math.floor(team.score / 2);
                message += `<p>Lost half your points!</p>`;
            } else {
                message += `<p>Lost half your points! (Double Trouble Ignored)</p>`;
            }
        }
    } else if (eventCard.type === 'transfer') {
         if (isOwnTurn) {
             handleTransferEvent(eventCard);
             return; 
         } else {
             message += `<p>"${eventCard.name}" has no effect on chosen target!</p>`;
             sfxToPlay = 'lowLoss';
         }
    
    } else if (eventCard.type === 'dungeon') {
         if (isOwnTurn) { 
             if(state.sfx.special) state.sfx.special.play(); 
             
             const dungeonMessage = `<h2>${team.avatar} ${team.name}</h2><p>Found a Secret Dungeon Entrance!</p>`;
             if(selectedImageUrl){
                 showFullscreenModal(selectedImageUrl, dungeonMessage);
                 el.fullscreenEvent.onclick = () => {
                     hideModal(el.fullscreenEvent);
                     // NavigateTo handles calling enterDungeon
                     navigateTo(state.CONSTANTS.PAGES.DUNGEON); 
                 };
             } else {
                 showEventModal(dungeonMessage);
                 setTimeout(() => navigateTo(state.CONSTANTS.PAGES.DUNGEON), 2000); 
             }
             return; // Stop processing, navigation will handle next step
         } else {
              message += `<p>Dungeon entrance fades away for the chosen target!</p>`;
              sfxToPlay = 'lowLoss';
         }
    } else if (annulled) {
        // Event was annulled, message is already set
    } else {
         console.warn(`[DEBUG] Encountered unknown card type: "${eventCard.type}"`);
         message += `<p>An unusual event occurred!</p>`;
         sfxToPlay = 'special'; 
    }

    // 5. Check for Hot Streak End
    if (state.gameState.isHotStreak && isOwnTurn && !annulled && 
        ((eventCard.type === 'points' && eventCard.value < 0) || 
         (eventCard.type === 'special' && eventCard.action === 'lose_half'))) 
    {
        console.log("[DEBUG] Hot Streak ended by negative outcome.");
        state.gameState.isHotStreak = false;
        message += `<p style='color: var(--rank-last-color);'>Hot Streak Ended!</p>`;
    }

    updateScoreboard(); 

    // 6. Display Outcome
    if (selectedImageUrl) {
        showFullscreenModal(selectedImageUrl, message);
        el.fullscreenEvent.onclick = () => { // Set the click handler *now*
             hideModal(el.fullscreenEvent);
             if (!state.gameState.isHotStreak) {
                  setTimeout(endTurn, 300);
             } else {
                  state.gameState.isTurnActive = true; 
                  console.log("[DEBUG] Hot Streak continues, turn active.");
             }
        };
    } else {
        showEventModal(message);
         if (!state.gameState.isHotStreak) {
              setTimeout(endTurn, 2000);
         } else {
               setTimeout(() => {
                    state.gameState.isTurnActive = true; 
                    console.log("[DEBUG] Hot Streak continues, turn active.");
               }, 2000); 
         }
    }

    if (sfxToPlay && state.sfx[sfxToPlay]) {
        state.sfx[sfxToPlay].play();
    }

    // 7. Reset Keep Friends Close
    if (state.gameState.keepFriendsCloseTargetTeamId) {
        console.log("[DEBUG] Resetting Keep Friends Close state.");
        state.gameState.keepFriendsCloseTargetTeamId = null; 
         setTimeout(endTurn, 500);
    }
}

function handleTransferEvent(eventCard) {
    const currentTeam = state.gameState.teams[state.gameState.currentTurn];
    const otherTeams = state.gameState.teams.filter(team => team.dbId !== currentTeam.dbId);
    
    if (otherTeams.length === 0) {
        showEventModal(`<p>You drew "${eventCard.name}" but there are no other teams!</p>`);
        setTimeout(endTurn, 2000);
        return;
    }
    
    if(state.sfx.special) state.sfx.special.play();

    el.transferTitle.textContent = eventCard.name;
    el.transferDescription.textContent = eventCard.action === 'give' ? `Choose a team to give ${eventCard.value} points to.` : `Choose a team to take ${eventCard.value} points from.`;
    el.transferTeamButtons.innerHTML = '';
    
    otherTeams.forEach(targetTeam => {
        const btn = document.createElement('button');
        btn.className = 'team-transfer-btn';
        btn.innerHTML = `${targetTeam.avatar} ${targetTeam.name}`;
        btn.onclick = () => {
             const targetIndex = state.gameState.teams.findIndex(t => t.dbId === targetTeam.dbId);
             if (targetIndex === -1) return; 

            if (eventCard.action === 'give') {
                currentTeam.score -= eventCard.value;
                state.gameState.teams[targetIndex].score += eventCard.value;
            } else { 
                const pointsToTake = Math.min(state.gameState.teams[targetIndex].score, eventCard.value);
                currentTeam.score += pointsToTake;
                 state.gameState.teams[targetIndex].score -= pointsToTake;
            }
            hideModal(el.transferPointsModal);
            updateScoreboard();
            setTimeout(endTurn, 500);
        };
        el.transferTeamButtons.appendChild(btn);
    });
    showModal(el.transferPointsModal);
}


// --- MATH & SOUNDS ---

function displayQuestion(question) {
    el.questionTimerDisplay.textContent = '';
    const optionsHTML = question.options.map(option => `<button class="option-btn">${option}</button>`).join('');
    
    if(el.questionContent){
         el.questionContent.innerHTML = `<h2>${question.questionText}</h2><div class="options-grid">${optionsHTML}</div>`;
         showModal(el.questionModal);
         
         if (state.questionTimer) clearInterval(state.questionTimer);
         
         const newContent = el.questionContent.cloneNode(true);
         el.questionContent.parentNode.replaceChild(newContent, el.questionContent);
         // Update the reference in the elements module
         el.questionContent = newContent; 
         
         newContent.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                handleAnswer(btn.textContent == question.correctAnswer);
            }, { once: true });
        });
    } else {
         console.error("Question content element not found!");
         setTimeout(endTurn, 500); 
    }
}

export function handleAnswer(isCorrect) {
    hideModal(el.questionModal);
    if (isCorrect) {
        showEventModal("<h2>Correct!</h2><p>Now, choose a square.</p>");
        state.gameState.isTurnActive = true;
    } else {
        const team = state.gameState.teams[state.gameState.currentTurn];
        team.score = Math.max(0, team.score - 5); 
        if(state.sfx.lowLoss) state.sfx.lowLoss.play();
        showEventModal(`<h2>Incorrect!</h2><p>-5 points for ${team.name}</p>`);
        setTimeout(endTurn, 2000);
    }
}

export function loadSoundEffects(theme) {
    const themeSounds = theme.sounds || {};
    const defaultSounds = {
        lowGain: 'https://cdn.pixabay.com/audio/2022/03/15/audio_a46b732152.mp3',
        highGain: 'https://cdn.pixabay.com/audio/2022/11/17/audio_821896131b.mp3',
        lowLoss: 'https://cdn.pixabay.com/audio/2021/08/04/audio_12b0a82b13.mp3',
        highLoss: 'https://cdn.pixabay.com/audio/2022/03/10/audio_e0828d18a0.mp3',
        special: 'https://cdn.pixabay.com/audio/2022/03/22/audio_6069971ce7.mp3',
        gameOver: 'https://cdn.pixabay.com/audio/2022/08/23/audio_a831fce34e.mp3'
    };

    if (typeof Howl === 'undefined') {
        console.error("Howler.js not loaded! Sounds will not play.");
        return;
    }

    state.setSfx({
        lowGain: new Howl({ src: [themeSounds.lowGain || defaultSounds.lowGain], html5: true }),
        highGain: new Howl({ src: [themeSounds.highGain || defaultSounds.highGain], html5: true }),
        lowLoss: new Howl({ src: [themeSounds.lowLoss || defaultSounds.lowLoss], html5: true }),
        highLoss: new Howl({ src: [themeSounds.highLoss || defaultSounds.highLoss], html5: true }),
        special: new Howl({ src: [themeSounds.special || defaultSounds.special], html5: true }),
        gameOver: new Howl({ src: [themeSounds.gameOver || defaultSounds.gameOver], html5: true })
    });
    
    console.log("Sound effects loaded.");
}

function createShuffledDeck(numberOfSquares) {
    let workingDeck = [];
    const coreSets = Math.max(1, Math.floor(numberOfSquares / 30));
    for (let i = 0; i < coreSets; i++) {
        workingDeck.push(...state.CORE_CARDS, ...state.CORE_CARDS);
    }
    
    const jackpotCardsToAdd = (numberOfSquares <= 45) ? [state.JACKPOT_CARDS[0]] 
                         : (numberOfSquares <= 75) ? state.JACKPOT_CARDS 
                         : [...state.JACKPOT_CARDS, ...state.JACKPOT_CARDS];
    
    jackpotCardsToAdd.forEach(card => {
         if (workingDeck.length < numberOfSquares) workingDeck.push(card);
    });

    const numberOfDungeonCards = 5;
    let addedDungeonCards = 0;
    for (let i = 0; i < workingDeck.length && addedDungeonCards < numberOfDungeonCards; i++) {
        const isStandard = state.STANDARD_CARDS.some(sc => sc.name === workingDeck[i].name);
        if (isStandard) {
            workingDeck[i] = { name: 'Secret Dungeon Entrance!', type: 'dungeon' };
            addedDungeonCards++;
        }
    }
    while(addedDungeonCards < numberOfDungeonCards && workingDeck.length < numberOfSquares) {
         workingDeck.push({ name: 'Secret Dungeon Entrance!', type: 'dungeon' });
         addedDungeonCards++;
    }

    const remainingSlots = numberOfSquares - workingDeck.length;
    if (remainingSlots > 0) {
        for (let i = 0; i < remainingSlots; i++) {
            let standardCardToAdd;
            do {
                standardCardToAdd = state.STANDARD_CARDS[Math.floor(Math.random() * state.STANDARD_CARDS.length)];
            } while (standardCardToAdd.type === 'dungeon'); 
            workingDeck.push(standardCardToAdd);
        }
    }

    const finalDeck = workingDeck.sort(() => 0.5 - Math.random());
    
    const dungeonCount = finalDeck.slice(0, numberOfSquares).filter(card => card.type === 'dungeon').length;
    console.log(`[DEBUG] Created deck of size ${numberOfSquares}. Contains ${dungeonCount} dungeon cards.`);

    return finalDeck.slice(0, numberOfSquares); 
}