// --- Secret Dungeon Logic ---

function enterDungeon(team, card) {
    console.log(`[DEBUG] ${team.name} entered the dungeon!`);
    
    // navigateTo and CONSTANTS are now accessible from window
    navigateTo(CONSTANTS.PAGES.DUNGEON); 
    
    const dungeonContent = document.getElementById('dungeon-content'); 
    if (!dungeonContent) {
        console.error("Dungeon content container not found!");
        exitDungeon(); 
        return;
    }

    // --- TODO: Use dungeon-specific background/music from theme if available ---

    dungeonContent.innerHTML = `
        <h2>${team.avatar} ${team.name} explores the Secret Dungeon!</h2>
        <p>Choose your path wisely...</p>
        <div id="dungeon-choices" style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 2rem;">
            <button class="dungeon-choice-btn" data-choice="chest">Mysterious Chest</button>
            <button class="dungeon-choice-btn" data-choice="portal">Glowing Portal</button>
            <button class="dungeon-choice-btn" data-choice="lever">Ancient Lever</button>
            </div>
    `;

    // Add event listeners (will call handleDungeonChoice)
    dungeonContent.querySelectorAll('.dungeon-choice-btn').forEach(btn => {
        btn.addEventListener('click', handleDungeonChoice, { once: true }); 
    });
}

function handleDungeonChoice(event) {
    const choiceMade = event.target.dataset.choice; 
    // gameState is global from window
    const team = gameState.teams[gameState.currentTurn]; 
    const teamIndex = gameState.currentTurn; 
    console.log(`[DEBUG] ${team.name} chose ${choiceMade} in the dungeon.`);
    
    // Original list of all possible outcomes
    const allDungeonOutcomes = [
        'get_out_of_jail_free', 
        'double_trouble', 
        'keep_friends_close', 
        'dangerous_gamble'
    ];

    // Select from the list
    const outcome = allDungeonOutcomes[Math.floor(Math.random() * allDungeonOutcomes.length)];
    
    console.log(`[DEBUG] Dungeon Outcome: ${outcome}`);

    let outcomeMessage = `<h2>${team.avatar} ${team.name} chose the ${event.target.textContent}!</h2>`;
    let exitDelay = 3000; 
    let shouldExitNow = true; 

    switch(outcome) {
        case 'get_out_of_jail_free':
            gameState.teams[teamIndex].hasAnnulCard = true;
            outcomeMessage += `<p>You found a 'Get Out of Jail Free' card! ワ Use it later to cancel a negative event.</p>`;
            // sfx is global from window
            if(sfx.highGain) sfx.highGain.play(); 
            break;
        case 'double_trouble':
            gameState.doubleNextOutcome = true;
            outcomeMessage += `<p>Double Trouble! 笨ｨ The effect of the next square you pick will be doubled!</p>`;
             if(sfx.special) sfx.special.play();
            break;
        case 'keep_friends_close':
             shouldExitNow = false; 
             outcomeMessage += `<p>Keep Your Friends Close... Too Close! 操 You get to pick the next square FOR an opponent!</p>`;
             if(sfx.special) sfx.special.play();
             const dungeonContentKFC = document.getElementById('dungeon-content');
             if(dungeonContentKFC) dungeonContentKFC.innerHTML = outcomeMessage;
              // promptForKeepFriendsCloseTarget is now in this file
             setTimeout(promptForKeepFriendsCloseTarget, exitDelay);
            break;
        case 'dangerous_gamble':
             shouldExitNow = false; 
             outcomeMessage += `<p>Dangerous Gamble! 軸 Choose an opponent and wager points on a roll-off!</p>`;
             if(sfx.highLoss) sfx.highLoss.play(); 
             const dungeonContentDG = document.getElementById('dungeon-content');
             if(dungeonContentDG) dungeonContentDG.innerHTML = outcomeMessage;
              // initiateDangerousGamble is now in this file
             setTimeout(initiateDangerousGamble, exitDelay); 
            break;
        default: // Added default case for safety
             outcomeMessage += `<p>...but nothing happened?</p>`;
             if(sfx.lowLoss) sfx.lowLoss.play();
             break;
    }

    if (shouldExitNow) {
        const dungeonContent = document.getElementById('dungeon-content');
        if(dungeonContent) dungeonContent.innerHTML = outcomeMessage;
        // exitDungeon is now in this file
        setTimeout(exitDungeon, exitDelay); 
    }
    // updateScoreboard is global from window
    updateScoreboard(); 
}

function exitDungeon() {
    console.log("[DEBUG] Exiting dungeon.");
    
    // navigateTo is global from window
    navigateTo(CONSTANTS.PAGES.GAME); 
    // updateScoreboard is global from window
    updateScoreboard(); 

    if (!gameState.keepFriendsCloseTargetTeamId) { 
         // endTurn is global from window
         setTimeout(endTurn, 500); 
    } else {
         // startTurn is global from window
         startTurn(); 
    }
}

// --- Keep Friends Close Functions ---
function promptForKeepFriendsCloseTarget() {
     const currentTeam = gameState.teams[gameState.currentTurn];
     const opponents = gameState.teams.filter(t => t.dbId !== currentTeam.dbId);

     if (opponents.length === 0) {
         console.log("[DEBUG] KFC: No opponents to target.");
         showEventModal("<p>Keep Friends Close... but you have no opponents!</p>");
         exitDungeon(); 
         return;
     }
     
     // transferTitle, etc. are global from window
     transferTitle.textContent = "Keep Friends Close";
     transferDescription.textContent = `${currentTeam.avatar} ${currentTeam.name}, choose which opponent you will select a square for:`;
     transferTeamButtons.innerHTML = ''; 

     opponents.forEach(targetTeam => {
        const btn = document.createElement('button');
        btn.className = 'team-transfer-btn'; 
        btn.innerHTML = `${targetTeam.avatar} ${targetTeam.name}`;
        btn.onclick = () => {
            gameState.keepFriendsCloseTargetTeamId = targetTeam.dbId; 
            console.log(`[DEBUG] KFC Target Selected: ${targetTeam.name} (ID: ${targetTeam.dbId})`);
            hideModal(transferPointsModal);
            exitDungeon(); 
        };
        transferTeamButtons.appendChild(btn);
    });

     showModal(transferPointsModal);
}

window.handleKeepFriendsCloseSelection_fromDungeon = function(clickedSquareElement)  {
     console.log(`[DEBUG] KFC: Square selected for target ID ${gameState.keepFriendsCloseTargetTeamId}`);
     gameState.isTurnActive = false; 

     clickedSquareElement.classList.add('flipped');
     gameState.squaresLeft--;
     // shuffledDeck is global from window
     const eventCard = shuffledDeck.pop(); 

     if (eventCard) {
          console.log('[DEBUG] KFC Popped card:', eventCard.name, '| Type:', eventCard.type); 
          // processEvent is global from window
          processEvent(eventCard, gameState.keepFriendsCloseTargetTeamId); 
     } else {
          console.warn("[DEBUG] KFC: Popped undefined card from deck!");
          gameState.keepFriendsCloseTargetTeamId = null;
          if (gameState.squaresLeft <= 0) {
              // endGame is global from window
              endGame(); 
          } else {
              // endTurn is global from window
              setTimeout(endTurn, 500); 
          }
     }
}

// --- Dangerous Gamble Functions ---
function initiateDangerousGamble() {
     const currentTeam = gameState.teams[gameState.currentTurn];
     const opponents = gameState.teams.filter(t => t.dbId !== currentTeam.dbId);

     if (opponents.length === 0) {
         console.log("[DEBUG] Gamble: No opponents.");
         showEventModal("<p>Dangerous Gamble... but no one to gamble with!</p>");
         exitDungeon(); 
         return;
     }

     // gambleModal etc are global from window
     if (!gambleModal || !gambleOpponentSelect || !gambleAmountSelect || !confirmGambleBtn || !cancelGambleBtn || !gambleResultDisplay) {
          console.error("Gamble modal elements not found in HTML!");
          showEventModal("<p>Error: Gamble UI is missing!</p>");
          exitDungeon();
          return;
     }

     gambleOpponentSelect.innerHTML = opponents.map(opp => 
         `<option value="${opp.dbId}">${opp.name}</option>`
     ).join('');

     gambleResultDisplay.innerHTML = '';
     confirmGambleBtn.disabled = false; 

     // NEW: Hide the cancel button
     if (cancelGambleBtn) {
        cancelGambleBtn.style.display = 'none';
     }

     showModal(gambleModal);

     confirmGambleBtn.onclick = () => {
          const opponentId = gambleOpponentSelect.value;
          const amount = parseInt(gambleAmountSelect.value, 10);
          confirmGambleBtn.disabled = true; 
          // resolveGamble is now in this file
          resolveGamble(currentTeam, opponentId, amount); 
     };

     // CANCEL BUTTON LOGIC REMOVED
}

// --- UPDATED to Best of 7 ---
// This replaces the function in dungeon.js
function resolveGamble(playerTeam, opponentId, amount) {
     const opponentTeamIndex = gameState.teams.findIndex(t => t.dbId == opponentId);
     if (opponentTeamIndex === -1) {
          console.error(`Gamble: Opponent ID ${opponentId} not found.`);
          gambleResultDisplay.innerHTML = `<p style="color: var(--rank-last-color);">Error finding opponent!</p>`;
          setTimeout(() => { hideModal(gambleModal); exitDungeon(); }, 2000);
          return;
     }
     const opponentTeam = gameState.teams[opponentTeamIndex];

     // --- Best of 7 Logic (This part is fine) ---
     let playerWins = 0;
     let opponentWins = 0;
     const rollsHistory = []; 

     while (playerWins < 4 && opponentWins < 4) {
        const playerRoll = Math.floor(Math.random() * 20) + 1;
        const opponentRoll = Math.floor(Math.random() * 20) + 1;

        let roundText = `(Roll ${rollsHistory.length + 1}) ${playerTeam.avatar}: ${playerRoll} vs ${opponentTeam.avatar}: ${opponentRoll}`;

        if (playerRoll > opponentRoll) {
            playerWins++;
            roundText += ` - <strong>${playerTeam.avatar} wins round!</strong>`;
        } else if (opponentRoll > playerRoll) {
            opponentWins++;
            roundText += ` - <strong>${opponentTeam.avatar} wins round!</strong>`;
        } else {
            roundText += ` - <em>Tie! Re-rolling...</em>`;
        }
        rollsHistory.push(`<p style="margin: 2px 0; opacity: 0.8;">${roundText}</p>`);
     }
     
     // --- Build Result Display (This is the fixed part) ---
     let resultText = `<h2>Final Score: ${playerWins} to ${opponentWins}</h2>`;

     if (playerWins > opponentWins) {
          // Player wins: Take points from opponent
          // FIX: Calculate the *actual* amount that can be taken
          const pointsToTake = Math.min(opponentTeam.score, amount); 
          
          // FIX: Update the result message to show the *actual* points
          resultText += `<h3 style="color: var(--rank1-color); font-weight: bold;">You Win! You take ${pointsToTake} points!</h3>`;
          
          // FIX: Apply the *actual* amount to both players
          playerTeam.score += pointsToTake;
          opponentTeam.score -= pointsToTake;
          if(sfx.highGain) sfx.highGain.play();
     } else {
          // Opponent wins: Give points to opponent
          // FIX: Calculate the *actual* amount that can be given
          const pointsToGive = Math.min(playerTeam.score, amount);
          
          // FIX: Update the result message to show the *actual* points
          resultText += `<h3 style="color: var(--rank-last-color); font-weight: bold;">You Lose! You give ${pointsToGive} points!</h3>`;
          
          // FIX: Apply the *actual* amount to both players
          opponentTeam.score += pointsToGive;
          playerTeam.score -= pointsToGive;
           if(sfx.highLoss) sfx.highLoss.play();
     }

     // Add the roll history
     resultText += `<div style="max-height: 120px; overflow-y: auto; background: rgba(0,0,0,0.2); border-radius: 5px; padding: 8px; margin-top: 1rem; text-align: left; font-size: 0.9rem;">`;
     resultText += rollsHistory.join('');
     resultText += `</div>`;

     gambleResultDisplay.innerHTML = resultText;
     updateScoreboard();

     // Longer delay to allow reading the results
     setTimeout(() => {
          hideModal(gambleModal);
          exitDungeon();
     }, 6000);
}