document.addEventListener('DOMContentLoaded', () => {

    console.log('[DEBUG] DOM fully loaded. Initializing script.');

    // --- CONSTANTS ---
    const CONSTANTS = {
        PAGES: {
            PROFILE: 'profile',
            SETUP: 'setup',
            GAME: 'game'
        }
    };
    
    // --- ITEM 1: New Global Sound Map ---
    // This map defines all sounds. We will load these from the root /audio/ folder.
    const GLOBAL_SOUND_MAP = {
        // Card Sounds
        plus_75: 'audio/plus_75.mp3',
        plus_50: 'audio/plus_50.mp3',
        plus_20: 'audio/plus_20.mp3',
        plus_15: 'audio/plus_15.mp3',
        plus_10: 'audio/plus_10.mp3',
        plus_5: 'audio/plus_5.mp3',
        minus_5: 'audio/minus_5.mp3',
        minus_10: 'audio/minus_10.mp3',
        minus_20: 'audio/minus_20.mp3',
        minus_50: 'audio/minus_50.mp3',
        double_points: 'audio/double_points.mp3',
        lose_half: 'audio/lose_half.mp3',
        take_10: 'audio/take_10.mp3',
        give_10: 'audio/give_10.mp3',
        take_5: 'audio/take_5.mp3',
        give_5: 'audio/give_5.mp3',
        // Game Sounds
        gameOver: 'audio/gameOver.mp3',
        special: 'audio/special.mp3' // A generic special sound for Annul, etc.
    };

    // This maps the card names from the game to the sound keys defined above.
    const CARD_SOUND_KEY_MAP = {
        "+75 Points (JACKPOT!)": "plus_75",
        "+50 Points (Big Bonus!)": "plus_50",
        "-50 Points (Disaster!)": "minus_50",
        "+5 Points": "plus_5",
        "+10 Points": "plus_10",
        "+15 Points": "plus_15",
        "+20 Points": "plus_20",
        "-5 Points": "minus_5",
        "-10 Points": "minus_10",
        "-20 Points": "minus_20",
        "Double Your Points!": "double_points",
        "Lose Half Your Points!": "lose_half",
        "Take 10 Points!": "take_10",
        "Give 10 Points!": "give_10",
        "Take 5 Points!": "take_5",
        "Give 5 Points!": "give_5"
    };

    // --- 1. GET ALL UI ELEMENTS ---
    const profileContainer = document.getElementById('profile-container');
    const setupContainer = document.getElementById('setup-container');
    const gameContainer = document.getElementById('game-container');

    const changeProfileBtn = document.getElementById('change-profile-btn');
    const mainMenuNavBtn = document.getElementById('main-menu-nav-btn');

    const highScoreList = document.getElementById('high-score-list');
    const noHighScoresMsg = document.getElementById('no-high-scores-msg');
    const classHsBtn = document.getElementById('class-hs-btn');
    const globalHsBtn = document.getElementById('global-hs-btn');

    const board = document.getElementById('game-board');
    const scoreboard = document.getElementById('scoreboard');
    
    const builtInThemesList = document.getElementById('built-in-themes-list');
    const themeCarousel = document.getElementById('theme-carousel');
const themeNavLeft = document.getElementById('theme-nav-left');
const themeNavRight = document.getElementById('theme-nav-right');
const themeInfoName = document.getElementById('theme-info-name');
const themeInfoDescription = document.getElementById('theme-info-description');
const themeStartBtn = document.getElementById('theme-start-btn');

    const gameMenuBtn = document.getElementById('game-menu-btn'); // This is now hidden by CSS
    const backgroundMusic = document.getElementById('background-music');

    // Modals
    const gameSettingsModal = document.getElementById('game-settings-modal');
    const confirmSettingsBtn = document.getElementById('confirm-settings-btn');
    const cancelSettingsBtn = document.getElementById('cancel-settings-btn');
    const teamCountSelectModal = document.getElementById('team-count-select-modal');
    const teamSetupModal = document.getElementById('team-setup-modal');
    const eventModal = document.getElementById('event-modal');
    const eventMessage = document.getElementById('event-message');
    const fullscreenEvent = document.getElementById('fullscreen-event');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenMessage = document.getElementById('fullscreen-message');
    const gameOverModal = document.getElementById('game-over-modal');
    const winnerAvatar = document.getElementById('winner-avatar');
    const winnerName = document.getElementById('winner-name');
    const winnerScore = document.getElementById('winner-score');
    const gameOverMenuBtn = document.getElementById('game-over-menu-btn');
    const transferPointsModal = document.getElementById('transfer-points-modal');
    const transferTitle = document.getElementById('transfer-title');
    const transferDescription = document.getElementById('transfer-description');
    const transferTeamButtons = document.getElementById('transfer-team-buttons');
    const questionModal = document.getElementById('question-modal');
    // Gamble Modal Elements
    const gambleModal = document.getElementById('gamble-modal');
    const gambleOpponentSelect = document.getElementById('gamble-opponent-select');
    const gambleAmountSelect = document.getElementById('gamble-amount-select');
    const confirmGambleBtn = document.getElementById('confirm-gamble-btn');
    const cancelGambleBtn = document.getElementById('cancel-gamble-btn');
    const gambleResultDisplay = document.getElementById('gamble-result');
    // Annul Modal Elements
    const annulCardModal = document.getElementById('annul-card-modal');
    const annulCardPrompt = document.getElementById('annul-card-prompt');
    const annulCardOutcome = document.getElementById('annul-card-outcome');
    const confirmAnnulBtn = document.getElementById('confirm-annul-btn');
    const cancelAnnulBtn = document.getElementById('cancel-annul-btn');


    // --- 2. GLOBAL STATE & DATA ---
    const DEFAULT_COLORS = ['#ff005c', '#00f9ff', '#24ff00', '#ffc600', '#a000ff', '#ff5722', '#00a1ff', '#fdfdfd'];
    const EMOJI_CHOICE_LIST = ['😀', '😇', '🥸', '😎', '🤩', '🥳', '🤔', '🤫', '🤯', '🥶', '😱', '😡', '🤡', '👻', '👽', '🤖', '😈', '👿', '🧑‍🏫', '🧑‍🎓', '👨‍🔬', '👩‍🚀', '🥷', '🧙', '🧛', '🧟', '🧞', '🤴', '👸', '🕵️‍♂️', '👩‍⚕️', '👨‍⚖️', '👩‍🎨', '👨‍🍳', '👩‍✈️', '🦊', '🦁', '🐯', '🐴', '🦄', '🦓', '🦌', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦉', '🦅', '🦇', '🐺', '🐗', '🦋', '🐛', '🐜', '🐞', '🦗', '🕷️', '🦂', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🐪', '🦙', '🦒', '🐘', '🦏', '🦛', '🐐', '🐏', '🐖', '🐉', '🐲', '🌲', '🌳', '🌴', '🌵', '🌱', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄', '🌷', '🌸', '🌹', '🌺', '🌞', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌝', '🌚', '⭐', '🌟', '🌠', '💫', '✨', '☄️', '🪐', '🌍', '🌎', '🌏', '🌋', '🏔️', '❄️', '⚡️', '🔥', '💥', '💨', '💧', '💦', '🌊', '🌈', '☀️', '🌤️', '⛅️', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '🌪️', '🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🥝', '🥥', '🍍', '🥭', '🍑', '🍒', '🍈', '🥨', '🥯', '🍞', '🥐', '🥖', '🧀', '🥚', '🍳', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍿', '🍩', '🍪', '🥜', '🍫', '🍬', '🍭', '🍯', '🥛', '☕️', '🍵', '🧃', '🥤', '🧉', '⚽️', '🏀', '🏈', '⚾️', '🥎', '🎾', '🏐', '🎱', '🏓', '🏸', '🏒', '🏑', '🏏', 'G', '🥅', '⛳️', '🏹', '🎣', '𤿿', '🥊', '🥋', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎯', '🎳', '🎮', '🕹️', '🎰', '🎲', '🧩', '♟️', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '⌚️', '📱', '💻', '⌨️', '🖱️', '🖨️', '🎥', '📷', '📹', '📺', '📻', '💡', '💣', '⚔️', '🛡️', '🔑', '🗝️', '💰', '🪙', '💎', '⚗️', '🔭', '🔬', '🧬', '⚙️', '⛓️', '📎', '📌', '📍', '📏', '📐', '✂️', '📝', '📚', '📜', '📖', '📑', '🔗', '✒️', '🖋️', '🖊️', '🖌️','📁', '📂', '️', '📅', '📆', '🗑️', '🚗', '🚕', '🚙', '🚌', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛵', '🚲', '🛴', '🚀', '✈️', '🚁', '🚂', '🚤', '🚢', '🏰', '🏯', '🏟️', '🏠', '🏡', '🏢', '🏬', '🏭', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🕍', '🕌', '⛩️', '🕋', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '☮️', '☯️', '🕎', '✡️', '☪️', '✝️', '☦️', '☸️', '⚜️', '💠', '♾️', '✅', '❌', '💯', '‼️', '⁉️'];
    const AVATAR_TIERS = [
        { name: 'Challenger', unlockScore: 0, emojis: [ '🦊', '🦁', '🐸', '🐙', '🦖', '🦋', '🐳', 'h', '🦦', '🦢', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦓', '🦒', '🐘', '', '🐪', '🦙', '🦘', '🐃', '🐂', '🐄', '🐖', '🐏', '🐐', '🐓', '🦃', '🕊️', '🦜', '🦢', '🦩', '🦚', '🐧', '🐨', '🐼', '🐻', '❄️', '🔥', '💧', '💨', '🥷', '🦹', '🧙', '🧛', '🧟', '🧞', '🤠', '🤡', '👻', '💀', '🤖', '👽', '🚀', '🎯', '💡', '💣', '⚔️', '🛡️', '🏹', '🎱', '🎲', '🍕', '🍔', '🎸', '🎨', '🗿', '⚓' ] },
        { name: 'Adept', unlockScore: 250, emojis: [ '🌟', '💎', '🧙‍♂️', '🐉', '🏆', '🧠', '🎩', '🔑', '💰', '📜', '📈', '🔬', '🔭', '🧭', '⚙️', '⛓️', '📎', '📌', '📍', '⚗️', '🧲', '💣', '⚖️' ] },
        { name: 'Veteran', unlockScore: 500, emojis: [ '👑', '⚜️', '🏰', '🌌', '🕯️', '⏳', '🗝️', '🗺️', '🌐', '🛰️', '📡', '🛸', '🚁', '🚂', '🚄', '🚅', '🚈' ] },
        { name: 'Master', unlockScore: 1000, emojis: [ '🔱', '🏅', '🌠', '🪐', '🦾', '🌋', '🌪️', '⚡', '💥', '☄️', '☀️', '🌕', '🌑', '🌀', '🌊' ] },
        { name: 'Legendary', unlockScore: 2000, emojis: [ '🦄', '🐲', '😇', '🧿', '🧬', '♾️', '✡️', '🕎', '🕍', '🕌', '⛪', '⛩️', '🕋', '🗿', '🗽', '🐉', '🧝' ] },
        { name: 'G.O.A.T.', unlockScore: 5000, emojis: [ '✨', '💠', '🥇', '💫', '💥', '⚜️' ] }
    ];
    const NAME_GEN = { adjectives: ['Amazing', 'Ancient', 'Astounding', 'Atomic', 'Awesome', 'Bizarre', 'Blazing', 'Brilliant', 'Cheesy', 'Cheeky', 'Clever', 'Colossal', 'Cosmic', 'Courageous', 'Crunchy', 'Cunning', 'Dancing', 'Daring', 'Dauntless', 'Devout', 'Dynamic', 'Electric', 'Epic', 'Explosive', 'Fantastic', 'Fearless', 'Ferocious', 'Flying', 'Galactic', 'Gigantic', 'Glorious', 'Golden', 'Goofy', 'Happy', 'Heilig', 'Hilarious', 'Hyper', 'Incredible', 'Indomitable', 'Ingenious', 'Invincible', 'Joyful', 'Kosher', 'Laughing', 'Legendary', 'Magnificent', 'Majestic', 'Mighty', 'Mysterious', 'Mystical', 'Mythic', 'Quantum', 'Raging', 'Rambunctious', 'Righteous', 'Rowdy', 'Sagacious', 'Saucy', 'Scholarly', 'Silent', 'Singing', 'Sneaky', 'Spectacular', 'Speedy', 'Spicy', 'Squishy', 'Stupendous', 'Super', 'Supersonic', 'Tenacious', 'Thundering', 'Tiny', 'Turbo', 'Unbeatable', 'Unstoppable', 'Valiant', 'Victorious', 'Volcanic', 'Wacky', 'Wise', 'Witty', 'Zany', 'Zealous'], nouns_plural: ['Avengers', 'Bagels', 'Behemoths', 'Blintzes', 'Bochurim', 'Chachamim', 'Commandos', 'Conquerors', 'Cyborgs', 'Defenders', 'Dominators', 'Dragons', 'Dreidels', 'Eagles', 'Explorers', 'Falafels', 'Geniuses', 'Geonim', 'Giants', 'Gladiators', 'Golems', 'Griffins', 'Guardians', 'Hydras', 'Innovators', 'Juggernauts', 'Krakens', 'Kugels', 'Lamdanim', 'Latkes', 'Leviathans', 'Lions', 'Maimonides', 'Masmidim', 'Masters', 'Mavericks', 'Menschim', 'Neviim', 'Ninjas', 'Paladins', 'Patriarchs', 'Phoenixes', 'Philosophers', 'Pioneers', 'Pirates', 'Pickles', 'Prodigies', 'Prophets', 'Rambams', 'Raptors', 'Rebbis', 'Rebels', 'Robots', 'Rockets', 'Sages', 'Scholars', 'Schnitzels', 'Sentinels', 'Sharks', 'Stars', 'Talmidim', 'Tigers', 'Titans', 'Tzadikim', 'Unicorns', 'Warriors', 'Wizards', 'Wombats', 'Yetis'], nouns_singular: ['Atom', 'Babka', 'Bagel', 'Blintz', 'Burger', 'Challah', 'Chavrusa', 'Chesed', 'Cholent', 'Chumash', 'Comet', 'Computer', 'Daf', 'Donut', 'Esrog', 'Falafel', 'Galaxy', 'Gefilte Fish', 'Gemara', 'Halacha', 'Hamentash', 'Hot Dog', 'Keyboard', 'Kippah', 'Kishka', 'Kneidel', 'Kreplach', 'Kugel', 'Laser', 'Latke', 'Lokshen', 'Lulav', 'Matzah Ball', 'Menorah', 'Mezuzah', 'Mishna', 'Mitzvah', 'Molecule', 'Mouse', 'Nosh', 'Pencil', 'Pickle', 'Pizza', 'Planet', 'Platypus', 'Rugelach', 'Seder', 'Schmear', 'Schnitzel', 'Shabbos', 'Shawarma', 'Shofar', 'Shtick', 'Shul', 'Siddur', 'Sloth', 'Smartboard', 'Sufganiyot', 'Sugya', 'Sukkah', 'Sushi', 'Taco', 'Talmud', 'Tefillin', 'Textbook', 'Torah', 'Tzedakah', 'Tzimmes', 'Whiteboard', 'Wombat', 'Yeshiva'], suffixes: ['Alliance', 'All-Stars', 'Army', 'Assembly', 'Bandits', 'Brigade', 'Cabal', 'Cartel', 'Champions', 'Circle', 'Clan', 'Coalition', 'Collective', 'Commanders', 'Conglomerate', 'Conquerors', 'Crew', 'Crunchers', 'Division', 'Drivers', 'Dynasty', 'Eaters', 'Experts', 'Fanatics', 'Federation', 'Fellowship', 'Force', 'Gang', 'Geniuses', 'Guild', 'Heroes', 'Horde', 'League', 'Learners', 'Legends', 'Maniacs', 'Masters', 'Mob', 'Monsters', 'Munchers', 'Order', 'Posse', 'Protectors', 'Regiment', 'Scholars', 'Society', 'Squad', 'Syndicate', 'Titans', 'Tribe', 'Union', 'United', 'Vanguard', 'Warriors'] };
    // --- Card Constants ---
    const CORE_CARDS = [
        { name: 'Double Your Points!', type: 'special', action: 'double' },
        { name: 'Lose Half Your Points!', type: 'special', action: 'lose_half' },
        { name: 'Take 10 Points!', type: 'transfer', action: 'take', value: 10 },
        { name: 'Give 10 Points!', type: 'transfer', action: 'give', value: 10 },
        { name: 'Take 5 Points!', type: 'transfer', action: 'take', value: 5 },
        { name: 'Give 5 Points!', type: 'transfer', action: 'give', value: 5 }
    ];
    const JACKPOT_CARDS = [
        { name: '+75 Points (JACKPOT!)', type: 'points', value: 75 },
        { name: '+50 Points (Big Bonus!)', type: 'points', value: 50 },
        { name: '-50 Points (Disaster!)', type: 'points', value: -50 }
    ];
    const STANDARD_CARDS = [
        { name: '+5 Points', type: 'points', value: 5 },
        { name: '+10 Points', type: 'points', value: 10 },
        { name: '+15 Points', type: 'points', value: 15 },
        { name: '+20 Points', type: 'points', value: 20 },
        { name: '-5 Points', type: 'points', value: -5 },
        { name: '-10 Points', type: 'points', value: -10 },
        { name: '-20 Points', type: 'points', value: -20 }
    ];

    const ALL_GAME_CARDS = [...CORE_CARDS, ...JACKPOT_CARDS, ...STANDARD_CARDS ].reduce((acc, card) => {
        if (!acc.find(c => c.name === card.name)) {
            acc.push(card);
        }
        return acc;
    }, []).sort((a, b) => (b.value || 0) - (a.value || 0));

    let shuffledDeck = [];

    // --- UPDATED gameState ---
    const gameState = {
        teams: [],
        currentTurn: 0,
        squaresLeft: 0,
        gameLength: 60, // This will be set by the modal (36, 60, or 84)
        gameMode: 'math',
        mathDifficulty: 1,
        isTurnActive: false,
        doubleNextOutcome: false,
        keepFriendsCloseTargetTeamId: null,
        pendingEventForAnnul: null,
        totalTurnsElapsed: 0, 
    };

    let sfx = {};
    let carouselThemeData = [];
let carouselCellCount = 0;
let carouselSelectedIndex = 0;
let carouselTheta = 0;
    
    let activeGameTheme = {};
    let activeProfile = null;
    let colorThief = typeof ColorThief !== 'undefined' ? new ColorThief() : null;
    let db;
    let teamSetupState = { currentIndex: 0, totalTeams: 0, teams: [] };
    let currentTeamData = {};
    let questionTimer;

    // --- 3. HELPER & UTILITY FUNCTIONS ---
    // (None needed for this update)
    // [NEW FUNCTION - Add this]
/**
 * Shows a floating points animation over a team's scoreboard element.
 * @param {number} teamIndex - The index of the team (0-3).
 * @param {number} points - The points to display (e.g., 10, -5).
 */
function showPointsAnimation(teamIndex, points) {
    if (points === 0) return; // Don't show for 0

    // Find the specific team's div in the scoreboard
    const teamDiv = scoreboard.querySelector(`.team:nth-child(${teamIndex + 1})`);
    if (!teamDiv) return;

    const animText = document.createElement('div');
    animText.classList.add('points-animation');

    if (points > 0) {
        animText.textContent = `+${points}`;
        animText.classList.add('positive');
    } else {
        animText.textContent = `${points}`; // Already has -
        animText.classList.add('negative');
    }

    // Position the animation over the scoreboard
    const rect = teamDiv.getBoundingClientRect();
    animText.style.left = `${rect.left + rect.width / 2 - 20}px`;
    animText.style.top = `${rect.top + 10}px`;

    document.body.appendChild(animText);

    // Remove the element after the animation finishes
    setTimeout(() => {
        animText.remove();
    }, 1500);
}

    // --- 4. DATABASE & THEME MANAGEMENT ---
     function initDB() {
        const request = indexedDB.open('GemaraKUpGameDB', 7); 
        request.onerror = (event) => console.error("Database error:", event.target.errorCode);
        request.onupgradeneeded = (event) => {
            console.log("Database upgrade needed.");
            const db = event.target.result;
            if (!db.objectStoreNames.contains('profiles')) db.createObjectStore('profiles', { keyPath: 'id', autoIncrement: true });
            
            if (db.objectStoreNames.contains('themes')) db.deleteObjectStore('themes');

            if (!db.objectStoreNames.contains('highscores')) {
                const scoreStore = db.createObjectStore('highscores', { keyPath: 'id', autoIncrement: true });
                scoreStore.createIndex('score', 'score', { unique: false });
                scoreStore.createIndex('profileId', 'profileId', { unique: false });
            }
            if (!db.objectStoreNames.contains('teams')) {
                const teamStore = db.createObjectStore('teams', { keyPath: 'id', autoIncrement: true });
                teamStore.createIndex('profileId', 'profileId', { unique: false });
            }
        };
        request.onsuccess = (event) => {
            db = event.target.result;
            console.log("Database initialized successfully.");
            
            showProfileScreen();
            loadBuiltInThemes();
        };
    }

    // [NEW CODE - Replaces the old function]
function loadBuiltInThemes() {
    if (!themeCarousel) return; // Check for the new element

    // Clear old data
    themeCarousel.innerHTML = '';
    carouselThemeData = [];
    carouselSelectedIndex = 0;
    
    if (typeof themes === 'undefined' || Object.keys(themes).length === 0) {
        themeInfoName.textContent = "Error";
        themeInfoDescription.textContent = "theme-data.js not loaded or is empty.";
        return;
    }

    // 1. Populate the carouselThemeData array
    for (const themeId in themes) {
        carouselThemeData.push({ id: themeId, ...themes[themeId] });
    }

    carouselCellCount = carouselThemeData.length;
    carouselTheta = 360 / carouselCellCount;

    // 2. Create a "cell" for each theme
    carouselThemeData.forEach((theme, index) => {
        const cell = document.createElement('div');
        cell.className = 'theme-cell';
        
        // Use background image if available
        if (theme.backgroundImageData) {
            cell.style.backgroundImage = `url("${theme.backgroundImageData}")`;
        }

        // Add overlay with info
        cell.innerHTML = `
            <div class="theme-cell-overlay">
                <h3>${theme.name}</h3>
                <p>${theme.description || 'A custom game theme.'}</p>
            </div>
        `;
        
        // Calculate the 3D position of this cell
        const angle = carouselTheta * index;
        const translateZ = (carouselCellCount > 8) ? 450 : (carouselCellCount * 40); // Adjust radius
        cell.style.transform = `rotateY(${angle}deg) translateZ(${translateZ}px)`;
        
        themeCarousel.appendChild(cell);
    });

    // 3. Set up navigation
    themeNavLeft.onclick = () => {
        carouselSelectedIndex--;
        updateCarousel();
    };

    themeNavRight.onclick = () => {
        carouselSelectedIndex++;
        updateCarousel();
    };

    // 4. Set up the "Start Game" button
    themeStartBtn.onclick = () => {
        // Get the currently selected theme
        activeGameTheme = carouselThemeData[carouselSelectedIndex];
        console.log(`[DEBUG] Selected theme: ${activeGameTheme.name}`);
        showModal(gameSettingsModal);
    };

    // 5. Show the first theme
    updateCarousel();
}
// [NEW FUNCTION - Add this]
function updateCarousel() {
    // This function spins the whole carousel
    const angle = carouselTheta * carouselSelectedIndex * -1;
    themeCarousel.style.transform = `translateZ(-${(carouselCellCount > 8) ? 450 : (carouselCellCount * 40)}px) rotateY(${angle}deg)`;

    // Update the info display
    const currentTheme = carouselThemeData[carouselSelectedIndex];
    if (currentTheme) {
        themeInfoName.textContent = currentTheme.name;
        themeInfoDescription.textContent = currentTheme.description || 'A custom game theme.';
    }
}
    function loadHighScores(scope = 'profile') {
        if (!db) { console.error("loadHighScores: Database not initialized."); return; }
        highScoreList.innerHTML = '';
        noHighScoresMsg.classList.add('hidden');

        try {
            const transaction = db.transaction(['highscores', 'profiles'], 'readonly');
            const scoreStore = transaction.objectStore('highscores');
            const profileStore = transaction.objectStore('profiles');

            let scoreRequest;

            if (scope === 'profile' && activeProfile) {
                const index = scoreStore.index('profileId');
                scoreRequest = index.getAll(activeProfile.id);
                classHsBtn.classList.add('active');
                globalHsBtn.classList.remove('active');
            } else {
                scoreRequest = scoreStore.getAll();
                classHsBtn.classList.remove('active');
                globalHsBtn.classList.add('active');
            }

            scoreRequest.onerror = (event) => {
                console.error("High score query failed:", event.target.error);
                noHighScoresMsg.classList.remove('hidden');
            };

            scoreRequest.onsuccess = () => {
                const scores = scoreRequest.result;
                if (!scores || scores.length === 0) {
                    noHighScoresMsg.classList.remove('hidden');
                    return;
                }

                const profileRequest = profileStore.getAll();
                profileRequest.onerror = (event) => {
                     console.error("Failed to load profiles for high scores:", event.target.error);
                     renderScores(scores.sort((a, b) => b.score - a.score).slice(0, 10), {}, scope);
                };
                profileRequest.onsuccess = () => {
                     const profiles = profileRequest.result;
                     const profileMap = profiles.reduce((map, profile) => {
                         map[profile.id] = profile.name;
                         return map;
                     }, {});
                     renderScores(scores.sort((a, b) => b.score - a.score).slice(0, 10), profileMap, scope);
                };
            };

            const renderScores = (sortedScores, profileMap, currentScope) => {
                highScoreList.innerHTML = sortedScores.map((entry, index) => {
                    const profileName = profileMap[entry.profileId] || 'Unknown Profile';
                    return `
                        <li class="highscore-entry">
                            <span class="hs-rank">#${index + 1}</span>
                            <span class="hs-score">${entry.score}</span>
                            <span class="hs-team-name">${entry.avatar || '❓'} ${entry.name || 'Anon'}</span>
                            ${currentScope === 'global' ? `<span class="hs-profile-name">(${profileName})</span>` : ''}
                        </li>
                    `;
                }).join('');
            };

        } catch (error) {
             console.error("Error accessing IndexedDB for high scores:", error);
             noHighScoresMsg.classList.remove('hidden');
        }
    }


    function saveHighScore(winner) {
        if (!db || !activeProfile) {
             console.warn("Cannot save high score: Database or profile not available.");
             return;
        }
        try {
            const transaction = db.transaction(['highscores'], 'readwrite');
            const store = transaction.objectStore('highscores');
            const scoreRecord = {
                 name: winner.name,
                 avatar: winner.avatar,
                 score: winner.score,
                 date: new Date().toISOString(),
                 profileId: activeProfile.id
             };
            const request = store.add(scoreRecord);
            request.onsuccess = () => console.log("High score saved successfully.");
            request.onerror = (e) => console.error("Error saving high score:", e.target.error);
        } catch (error) {
             console.error("Error accessing IndexedDB for saving high score:", error);
        }
    }

    // --- 5. GAME LOGIC ---

    // --- ITEM 1: Rewritten sound loading function ---
    function loadSoundEffects() {
        Howler.unload(); // Unload all previous sounds
        sfx = {}; // Clear the sfx object

        console.log("Loading global sound effects...");

        // Loop through our new global map and load each sound
        for (const key in GLOBAL_SOUND_MAP) {
            const path = GLOBAL_SOUND_MAP[key];
            if (path) {
                sfx[key] = new Howl({
                     src: [path],
                     html5: true
                 });
                 sfx[key].once('load', () => console.log(`Sound "${key}" loaded from ${path}`));
                 sfx[key].on('loaderror', (id, err) => console.error(`Error loading sound "${key}" from ${path}:`, err));
            } else {
                 console.warn(`No source found for sound "${key}".`);
            }
        }
        console.log("Global sound effect loading initiated.");
    }
    
    // Helper to play sounds safely
    function playSound(soundKey) {
        if (soundKey && sfx[soundKey] && typeof sfx[soundKey].play === 'function') {
             sfx[soundKey].play();
        } else if (soundKey) {
             console.warn(`Sound effect "${soundKey}" not loaded or invalid.`);
        }
    }


    function createShuffledDeck(numberOfSquares) {
        let workingDeck = [];
        const coreSets = Math.max(1, Math.floor(numberOfSquares / 30));
        for (let i = 0; i < coreSets; i++) {
            [...CORE_CARDS, ...CORE_CARDS].forEach(card => {
                if (workingDeck.length < numberOfSquares) workingDeck.push(card);
            });
        }

        const jackpotCardsToAdd = (numberOfSquares <= 45) ? [JACKPOT_CARDS[0]]
                             : (numberOfSquares <= 75) ? JACKPOT_CARDS
                             : [...JACKPOT_CARDS, ...JACKPOT_CARDS];

        jackpotCardsToAdd.forEach(card => {
             if (workingDeck.length < numberOfSquares) workingDeck.push(card);
        });

        const remainingSlots = numberOfSquares - workingDeck.length;
        if (remainingSlots > 0) {
            for (let i = 0; i < remainingSlots; i++) {
                let standardCardToAdd;
                 if (STANDARD_CARDS.length === 0) break;
                do {
                    standardCardToAdd = STANDARD_CARDS[Math.floor(Math.random() * STANDARD_CARDS.length)];
                } while (!standardCardToAdd || standardCardToAdd.type === 'dungeon');
                workingDeck.push(standardCardToAdd);
            }
        }

        workingDeck.sort(() => 0.5 - Math.random());

        const finalDeck = workingDeck.slice(0, numberOfSquares);

        console.log(`[DEBUG] Created deck of size ${finalDeck.length}.`);

        return finalDeck;
    }


    function startGame(numberOfSquares) {
        // This value now comes from the modal (36, 60, or 84)
        numberOfSquares = parseInt(numberOfSquares, 10);

        navigateTo(CONSTANTS.PAGES.GAME);
        gameState.currentTurn = 0;
        gameState.squaresLeft = numberOfSquares;

        gameState.teams.forEach(t => {
            t.score = 0;
            t.hasAnnulCard = false;
        });

        gameState.doubleNextOutcome = false;
        gameState.keepFriendsCloseTargetTeamId = null;
        gameState.pendingEventForAnnul = null;
        gameState.totalTurnsElapsed = 0;

        shuffledDeck = createShuffledDeck(numberOfSquares);
        window.shuffledDeck = shuffledDeck;

        if (activeGameTheme.backgroundImageData) {
            const url = activeGameTheme.backgroundImageData.startsWith('data:') 
                ? activeGameTheme.backgroundImageData 
                : `${activeGameTheme.backgroundImageData}`; 
            
            document.body.style.backgroundImage = `url(${url})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        } else {
             document.body.style.backgroundImage = '';
        }
        
        if (activeGameTheme.backgroundMusicData && backgroundMusic) {
            const musicUrl = activeGameTheme.backgroundMusicData.startsWith('data:')
                ? activeGameTheme.backgroundMusicData
                : `${activeGameTheme.backgroundMusicData}`;

             if(backgroundMusic.src !== musicUrl || backgroundMusic.paused){
                 backgroundMusic.src = musicUrl;
                 backgroundMusic.play().catch(e => console.warn("Background music autoplay prevented.", e));
             }
        } else if (backgroundMusic) {
             backgroundMusic.pause();
             backgroundMusic.src = '';
        }

        // --- ITEM 1: Load global sounds ---
        loadSoundEffects(); 
        
        createBoard(numberOfSquares);
        startTurn();
    }

    function createBoard(numberOfSquares) {
        board.innerHTML = '';
         if (numberOfSquares <= 0) {
              console.error("Cannot create board with 0 or negative squares.");
              return;
         }
        // [NEW CODE]
// This new logic finds a "cleaner" grid (e.g., 10x6 for 60 squares)
let cols = Math.ceil(Math.sqrt(numberOfSquares));
let rows = Math.ceil(numberOfSquares / cols);

// Smart factor finder for our specific game lengths
if (numberOfSquares === 36) { // 6x6
    cols = 6;
    rows = 6;
} else if (numberOfSquares === 60) { // 10x6
    cols = 10;
    rows = 6;
} else if (numberOfSquares === 84) { // 12x7
    cols = 12;
    rows = 7;
}

const actualSquares = cols * rows;

board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
// We REMOVED the line for gridTemplateRows. This is critical.
// This stops the JS from conflicting with the CSS aspect-ratio.

        let colors = activeGameTheme.palette;
        if (!colors || colors.length === 0) {
            if (activeGameTheme.backgroundImageData && colorThief) {
                const img = new Image();
                img.crossOrigin = "Anonymous"; 
                img.onload = () => {
                    try {
                        const palette = colorThief.getPalette(img, 8);
                        colors = palette.map(rgb => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
                        console.log("Generated palette from background:", colors);
                        applyColors(colors); 
                    } catch (e) {
                        console.error("ColorThief error, using default colors:", e);
                        colors = DEFAULT_COLORS;
                        applyColors(colors);
                    }
                };
                img.onerror = () => {
                     console.error("Could not load BG image for palette, using default colors.");
                     colors = DEFAULT_COLORS;
                     applyColors(colors);
                };
                img.src = activeGameTheme.backgroundImageData;
            } else {
                colors = DEFAULT_COLORS; // Fallback
            }
        }
        
        if (!colors || colors.length === 0) {
             colors = DEFAULT_COLORS;
        }

        const useEmojis = activeGameTheme.emojis && activeGameTheme.emojis.length > 0;
        const emojiMode = activeGameTheme.emojiMode || 'overlay';

        const applyColors = (colorPalette) => {
            const squares = board.querySelectorAll('.square');
            squares.forEach((square, i) => {
                if (useEmojis && emojiMode === 'replace') {
                    square.style.backgroundColor = 'var(--light-bg)';
                    square.style.color = colorPalette[i % colorPalette.length];
                } else {
                    square.style.backgroundColor = colorPalette[i % colorPalette.length];
                }
            });
        };

        for (let i = 0; i < actualSquares; i++) {
            const square = document.createElement('div');
// [NEW CODE]
            square.classList.add('square', 'square-enter');
            if (i < numberOfSquares) {
                 if (useEmojis) {
                    square.textContent = activeGameTheme.emojis[i % activeGameTheme.emojis.length];
                    // --- ITEM 2: Larger Emojis ---
                    // Increased '5.5' from '4'
                    let fontSize = Math.max(1.5, 7 / Math.sqrt(cols));
                    square.style.fontSize = `${fontSize}rem`;
                    square.style.lineHeight = '1';
                }

                if (useEmojis && emojiMode === 'replace') {
                    square.style.backgroundColor = 'var(--light-bg)';
                     square.style.color = colors[i % colors.length];
                } else {
                    square.style.backgroundColor = colors[i % colors.length];
                }
                square.addEventListener('click', handleSquareClick);
            } else {
                 square.style.opacity = 0;
                 square.style.pointerEvents = 'none';
            }
            board.appendChild(square);
            // --- Animate squares appearing ---
const allSquares = board.querySelectorAll('.square-enter');
allSquares.forEach((sq, index) => {
    // Stagger the animation
    setTimeout(() => {
        sq.style.opacity = '1';
        sq.style.transform = 'scale(1)';
    }, index * 15); // 15ms delay per square
});
        }
        
        if (colors.length > 0) {
            applyColors(colors);
        }
    }


    function handleSquareClick(e) {
        Howler.autoUnlock = true;

        if (!gameState.isTurnActive) { console.log("[DEBUG] Click ignored: Turn not active."); return; }
        const clickedSquare = e.target.closest('.square');
        if (!clickedSquare || clickedSquare.classList.contains('flipped')) { return; }

        if (gameState.keepFriendsCloseTargetTeamId) {
            console.warn("KFC active but no handler!");
            return;
        }

        gameState.isTurnActive = false;

clickedSquare.classList.add('flipped');
clickedSquare.style.opacity = '0';
clickedSquare.style.transform = 'rotateY(180deg) scale(0.5)';
clickedSquare.style.pointerEvents = 'none';
clickedSquare.style.cursor = 'default';        gameState.squaresLeft--;
        const eventCard = shuffledDeck.pop();

        if(eventCard) {
            console.log('[DEBUG] Popped card:', eventCard.name, '| Type:', eventCard.type, `| Squares Left: ${gameState.squaresLeft}`);
            
            let cardToProcess = eventCard;
            const safeTurns = gameState.teams.length; 
            
            const isNegativeCard = (cardToProcess.type === 'points' && cardToProcess.value < 0) || 
                                 (cardToProcess.type === 'special' && cardToProcess.action === 'lose_half');

            if (gameState.totalTurnsElapsed <= safeTurns && isNegativeCard) {
                console.log(`[DEBUG] Safe turn (${gameState.totalTurnsElapsed}/${safeTurns}). Buffering negative card: ${cardToProcess.name}`);
                
                const replacementCard = STANDARD_CARDS.find(c => c.value === 5) || { name: '+5 Points', type: 'points', value: 5 };
                console.log(`[DEBUG] Using replacement card: ${replacementCard.name}`);
                
                const randomIndex = Math.floor(Math.random() * (shuffledDeck.length * 0.75)); 
                shuffledDeck.splice(randomIndex, 0, cardToProcess);
                
                cardToProcess = replacementCard;
            }

            processEvent(cardToProcess);
        } else {
             console.warn("[DEBUG] Popped undefined card from deck!");
            if (gameState.squaresLeft <= 0) {
                 endGame();
            } else {
                 setTimeout(endTurn, 500);
                 console.error("Deck ran out before all squares were flipped.");
                 showEventModal("<p>The deck seems to be empty!</p>");
            }
        }
    }


    function processEvent(eventCard, overrideTargetTeamId = null, skipAnnulCheck = false) {
        console.log(`[DEBUG] Processing card type: "${eventCard.type}"`, `Skip Annul: ${skipAnnulCheck}`);

        const targetTeamId = overrideTargetTeamId || gameState.teams[gameState.currentTurn].dbId;
        const targetTeamIndex = gameState.teams.findIndex(t => t.dbId === targetTeamId);
        if (targetTeamIndex === -1) {
             console.error(`Target team with ID ${targetTeamId} not found!`);
             setTimeout(endTurn, 500); return;
        }
        const team = gameState.teams[targetTeamIndex];
        const isOwnTurn = team.dbId === gameState.teams[gameState.currentTurn].dbId;

        let message = `<h2>${team.avatar} ${team.name}</h2>`;
        let selectedImageUrl = null;
        let soundKeyToPlay = CARD_SOUND_KEY_MAP[eventCard.name]; // --- ITEM 1: Get sound key ---

        const isNegativeEvent = (eventCard.type === 'points' && eventCard.value < 0) ||
                                (eventCard.type === 'special' && eventCard.action === 'lose_half') ||
                                (eventCard.type === 'transfer' && eventCard.action === 'give');

        if (!skipAnnulCheck && team.hasAnnulCard && isNegativeEvent) {
            console.log(`[DEBUG] Negative event for team ${team.name} with Annul Card. Prompting.`);
            gameState.pendingEventForAnnul = {
                card: eventCard,
                overrideTargetTeamId: overrideTargetTeamId
            };
            promptToUseAnnulCard(team, eventCard);
            return;
        }

        let doubled = false;
        if (gameState.doubleNextOutcome && isOwnTurn) {
            console.log("[DEBUG] Applying Double Trouble!");
            doubled = true;
            gameState.doubleNextOutcome = false;
        }

        const imagePool = activeGameTheme.images?.[eventCard.name]; 
        if (imagePool && imagePool.length > 0) {
            const randomIndex = Math.floor(Math.random() * imagePool.length);
            selectedImageUrl = imagePool[randomIndex]; 
        }

        if (eventCard.type === 'points') {
            let valueToApply = eventCard.value;
            if (doubled) valueToApply *= 2;
            team.score += valueToApply;
            // [NEW CODE]
            showPointsAnimation(targetTeamIndex, valueToApply);
            team.score = Math.max(0, team.score);
            message += `<p>${eventCard.name}${doubled ? ' (x2!)' : ''}</p>`;
            // Sound key is already set

        } else if (eventCard.type === 'special') {
            if (eventCard.action === 'double') {
                const multiplier = doubled ? 4 : 2;
                team.score *= multiplier;
                message += `<p>Double Points!${doubled ? ' (x2!)' : ''}</p>`;
            } else if (eventCard.action === 'lose_half') {
                if (!doubled) {
                    team.score = Math.max(0, Math.floor(team.score / 2));
                    message += `<p>Lost half your points!</p>`;
                } else {
                    message += `<p>Lost half your points! (Double Trouble Ignored)</p>`;
                }
            }
        } else if (eventCard.type === 'transfer') {
             if (isOwnTurn) {
                 playSound(soundKeyToPlay); // Play sound before showing modal
                 handleTransferEvent(eventCard);
                 return; // handleTransferEvent will call endTurn
             } else {
                 message += `<p>"${eventCard.name}" has no effect on chosen target!</p>`;
                 soundKeyToPlay = 'minus_5'; // Play a generic low-loss sound
             }
        } else {
             console.warn(`[DEBUG] Encountered unknown card type: "${eventCard.type}" for card "${eventCard.name}"`);
             message += `<p>An unusual event occurred!</p>`;
             selectedImageUrl = null;
             soundKeyToPlay = 'special';
        }
 
        updateScoreboard();
        playSound(soundKeyToPlay); // --- ITEM 1: Play the unique sound ---

        const turnEndDelay = selectedImageUrl ? 300 : 2000;

        if (selectedImageUrl) {
            showFullscreenModal(selectedImageUrl, message);
             fullscreenEvent.onclick = () => {
                 hideModal(fullscreenEvent);
                 setTimeout(endTurn, 500);
             };
        } else {
            showEventModal(message);
            setTimeout(endTurn, turnEndDelay);
        }

        if (gameState.keepFriendsCloseTargetTeamId) {
            console.log("[DEBUG] Resetting Keep Friends Close state after outcome.");
            gameState.keepFriendsCloseTargetTeamId = null;
            setTimeout(endTurn, turnEndDelay + 100);
        }
    }

    function promptToUseAnnulCard(team, eventCard) {
        if (!annulCardModal || !annulCardPrompt || !annulCardOutcome || !confirmAnnulBtn || !cancelAnnulBtn) {
            console.error("Annul card modal elements not found!");
            handleAnnulConfirm();
            return;
        }

        annulCardPrompt.textContent = `${team.avatar} ${team.name}, you drew a negative outcome:`;
        annulCardOutcome.textContent = `"${eventCard.name}"`;

        confirmAnnulBtn.onclick = () => handleAnnulConfirm();
        cancelAnnulBtn.onclick = () => handleAnnulCancel();

        showModal(annulCardModal);
    }

    function handleAnnulConfirm() {
        hideModal(annulCardModal);
        if (!gameState.pendingEventForAnnul) {
             console.error("handleAnnulConfirm called with no pending event!");
             setTimeout(endTurn, 500);
             return;
        }

        const teamIndex = gameState.teams.findIndex(t => t.dbId === (gameState.pendingEventForAnnul.overrideTargetTeamId || gameState.teams[gameState.currentTurn].dbId));

        if (teamIndex !== -1) {
            gameState.teams[teamIndex].hasAnnulCard = false;
            updateScoreboard();

            const team = gameState.teams[teamIndex];
            showEventModal(`<h2>${team.avatar} ${team.name}</h2><p>Used 'Get Out of Jail Free' card! 🃏 Outcome annulled.</p>`);
            playSound('special');

            setTimeout(endTurn, 2000);

        } else {
            console.error("Annul Confirm: Target team not found!");
            setTimeout(endTurn, 500);
        }
        gameState.pendingEventForAnnul = null;
    }

    function handleAnnulCancel() {
        hideModal(annulCardModal);
        if (!gameState.pendingEventForAnnul) {
            console.error("handleAnnulCancel called with no pending event!");
             setTimeout(endTurn, 500);
            return;
        }

        const { card, overrideTargetTeamId } = gameState.pendingEventForAnnul;
        gameState.pendingEventForAnnul = null;

         const teamIndex = gameState.teams.findIndex(t => t.dbId === (overrideTargetTeamId || gameState.teams[gameState.currentTurn].dbId));
         const team = teamIndex !== -1 ? gameState.teams[teamIndex] : { avatar: '?', name: 'Unknown' };
         showEventModal(`<h2>${team.avatar} ${team.name}</h2><p>Chose not to use the Annul Card.</p>`);

        setTimeout(() => {
            processEvent(card, overrideTargetTeamId, true);
        }, 2100);
    }

    // --- ITEM 8: Updated Transfer Event Logic ---
    function handleTransferEvent(eventCard) {
        const currentTeam = gameState.teams[gameState.currentTurn];
        const otherTeams = gameState.teams.filter(team => team.dbId !== currentTeam.dbId);
        if (otherTeams.length === 0) {
            showEventModal(`<p>You drew "${eventCard.name}" but there are no other teams!</p>`);
            setTimeout(endTurn, 2000);
            return;
        }

        // Sound is now played *before* this function is called.

        transferTitle.textContent = eventCard.name;
        transferDescription.textContent = eventCard.action === 'give' ? `Choose a team to give ${eventCard.value} points to.` : `Choose a team to take ${eventCard.value} points from.`;
        transferTeamButtons.innerHTML = '';
        otherTeams.forEach(targetTeam => {
            const btn = document.createElement('button');
            btn.className = 'team-transfer-btn';
            btn.innerHTML = `${targetTeam.avatar} ${targetTeam.name}`;
            btn.onclick = () => {
                 const targetIndex = gameState.teams.findIndex(t => t.dbId === targetTeam.dbId);
                 if (targetIndex === -1) { console.error("Transfer target disappeared?"); return; }

                if (eventCard.action === 'give') {
                    const pointsToGive = Math.min(currentTeam.score, eventCard.value);
                    currentTeam.score -= pointsToGive;
                    currentTeam.score = Math.max(0, currentTeam.score);
                    gameState.teams[targetIndex].score += pointsToGive;
                    showPointsAnimation(gameState.currentTurn, -pointsToGive);
    showPointsAnimation(targetIndex, pointsToGive);
                } else {
                     const pointsToTake = Math.min(gameState.teams[targetIndex].score, eventCard.value);
                     gameState.teams[targetIndex].score -= pointsToTake;
                     gameState.teams[targetIndex].score = Math.max(0, gameState.teams[targetIndex].score);
                     currentTeam.score += pointsToTake;
                     showPointsAnimation(targetIndex, -pointsToTake);
    showPointsAnimation(gameState.currentTurn, pointsToTake);
                }
                
                hideModal(transferPointsModal);
                updateScoreboard();

                // --- NEW LOGIC: Show image after selection ---
                const imagePool = activeGameTheme.images?.[eventCard.name]; 
                let selectedImageUrl = null;
                if (imagePool && imagePool.length > 0) {
                    const randomIndex = Math.floor(Math.random() * imagePool.length);
                    selectedImageUrl = imagePool[randomIndex];
                }

                // Create a message based on the action
                let transferMessage = `<h2>${currentTeam.avatar} ${currentTeam.name}</h2>`;
                if (eventCard.action === 'give') {
                    transferMessage += `<p>Gave ${eventCard.value} points to ${targetTeam.avatar} ${targetTeam.name}!</p>`;
                } else {
                    transferMessage += `<p>Took ${eventCard.value} points from ${targetTeam.avatar} ${targetTeam.name}!</p>`;
                }

                if (selectedImageUrl) {
                    showFullscreenModal(selectedImageUrl, transferMessage);
                    fullscreenEvent.onclick = () => {
                        hideModal(fullscreenEvent);
                        setTimeout(endTurn, 500);
                    };
                } else {
                    showEventModal(transferMessage); // Show simple modal if no image
                    setTimeout(endTurn, 2000);
                }
                // --- END NEW LOGIC ---
            };
            transferTeamButtons.appendChild(btn);
        });
        showModal(transferPointsModal);
    }

    function updateScoreboard() {
        if(!scoreboard || gameState.teams.length === 0) return;

        const teamsWithScores = gameState.teams.map((team, index) => ({ ...team, originalIndex: index }));
        teamsWithScores.sort((a, b) => b.score - a.score);

        const minScore = teamsWithScores.length > 0 ? teamsWithScores[teamsWithScores.length - 1].score : 0;

        scoreboard.innerHTML = gameState.teams.map((team, index) => {
            const rank = teamsWithScores.findIndex(t => t.originalIndex === index) + 1;
            let rankClass = `rank-${rank}`;
            if (rank > 3 && team.score === minScore && gameState.teams.length > 1) rankClass += ' rank-last';

            const isGameBoard = !gameContainer.classList.contains('hidden');
            const isActive = isGameBoard && index === gameState.currentTurn;
            const activeClass = isActive ? 'active-turn' : '';

            const annulCardIcon = team.hasAnnulCard ? ' <span title="Has Annul Card">🃏</span>' : '';

            return `<div class="team ${activeClass} ${rankClass}">
                        <div class="team-info">
                             <span class="team-avatar">${team.avatar || '❓'}</span>
                             <span class="team-name">${team.name || 'Unnamed'}${annulCardIcon}</span>
                        </div>
                        <div class="team-score">${team.score}</div>
                   </div>`;
        }).join('');
    }

    function endTurn() {
         if (gameState.squaresLeft <= 0) {
            endGame();
            return;
        }

        gameState.currentTurn = (gameState.currentTurn + 1) % gameState.teams.length;
        startTurn();
    }

    function endGame() {
        console.log("[DEBUG] Game ending.");
        gameState.isTurnActive = false;
        playSound('gameOver');

        const winner = [...gameState.teams].sort((a, b) => b.score - a.score)[0];

        if (db && activeProfile) {
            try {
                const transaction = db.transaction(['teams'], 'readwrite');
                const store = transaction.objectStore('teams');

                gameState.teams.forEach(playedTeam => {
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
                            } else {
                                 console.warn(`Could not find team record with ID ${playedTeam.dbId} to update stats.`);
                            }
                        };
                         request.onerror = (e) => console.error(`Error fetching team record ${playedTeam.dbId}:`, e.target.error);
                    }
                });

                transaction.oncomplete = () => { console.log("Team stats update transaction completed."); };
                transaction.onerror = (e) => { console.error("Error during team stats update transaction:", e.target.error); };
            } catch (error) {
                 console.error("Error accessing IndexedDB for saving team stats:", error);
            }
        } else {
             console.warn("Cannot save team stats: Database or profile not available.");
        }


        if (winner && winnerAvatar && winnerName && winnerScore) {
             winnerAvatar.textContent = winner.avatar || '🏆';
             winnerName.textContent = winner.name || 'Winner!';
             winnerScore.textContent = `Final Score: ${winner.score}`;
             saveHighScore(winner);
             showModal(gameOverModal);
        } else {
             console.error("Game Over: Winner data or modal elements missing.");
             alert(`Game Over! Winner: ${winner ? winner.name : 'Unknown'} with ${winner ? winner.score : '?'} points!`);
             resetToMenu();
        }
    }


    function startTurn() {
        console.log(`[DEBUG] Starting turn for ${gameState.teams[gameState.currentTurn]?.name}. Mode: ${gameState.gameMode}`);
        gameState.totalTurnsElapsed++; 
        gameState.isTurnActive = false;
        updateScoreboard(); 

        if (gameState.keepFriendsCloseTargetTeamId) {
             console.log("[DEBUG] Keep Friends Close is active... but dungeon is removed. Resetting.");
             showEventModal(`<h2>KFC Error!</h2><p>Resetting turn.</p>`);
             gameState.keepFriendsCloseTargetTeamId = null;
             gameState.isTurnActive = true;
             return;
        }

        if (gameState.gameMode === 'math') {
            const question = new MathQuestion(gameState.mathDifficulty);
            displayQuestion(question);
        } else {
            gameState.isTurnActive = true;
        }
    }


     function displayQuestion(question) {
        const questionContent = document.getElementById('question-content');
        const timerDisplay = document.getElementById('question-timer');
        if(!questionContent || !timerDisplay) {
             console.error("Question modal elements missing!");
             setTimeout(endTurn, 500);
             return;
        }

        timerDisplay.textContent = '';
        const optionsHTML = question.options.map(option => `<button class="option-btn">${option}</button>`).join('');

        const freshContent = questionContent.cloneNode(false);
        freshContent.innerHTML = `<h2>${question.questionText}</h2><div class="options-grid">${optionsHTML}</div>`;
        questionContent.parentNode.replaceChild(freshContent, questionContent);

        showModal(questionModal);
        if (questionTimer) clearInterval(questionTimer);

        freshContent.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                handleAnswer(btn.textContent == question.correctAnswer);
            }, { once: true });
        });
    }


    function handleAnswer(isCorrect) {
        if (questionTimer) clearInterval(questionTimer);
        hideModal(questionModal);

        if (isCorrect) {
            showEventModal("<h2>Correct!</h2><p>Now, choose a square.</p>");
            gameState.isTurnActive = true;
        } else {
            const team = gameState.teams[gameState.currentTurn];
            team.score = Math.max(0, team.score - 5);
            showPointsAnimation(gameState.currentTurn, -5);
            updateScoreboard();
            playSound('minus_5');
            showEventModal(`<h2>Incorrect!</h2><p>-5 points for ${team.name}</p>`);
            setTimeout(endTurn, 2000);
        }
    }

    function resetToMenu() {
        hideModal(gameOverModal);
        navigateTo(CONSTANTS.PAGES.SETUP);

        document.body.style.backgroundImage = '';
        if (backgroundMusic) {
             backgroundMusic.pause();
             backgroundMusic.src = '';
        }
        if (board) board.innerHTML = '';
        if (scoreboard) scoreboard.innerHTML = '';

        gameState.teams = [];
        gameState.currentTurn = 0;
        gameState.squaresLeft = 0;
        gameState.doubleNextOutcome = false;
        gameState.keepFriendsCloseTargetTeamId = null;
        gameState.pendingEventForAnnul = null;
        shuffledDeck = [];

        Howler.unload();
        sfx = {};

        console.log("Game reset to menu.");
    }



    // --- 6. NAVIGATION & PROFILE MGMT ---
    function showProfileScreen() {
        navigateTo(CONSTANTS.PAGES.PROFILE);
        loadAndDisplayProfiles();
    }

    function loadAndDisplayProfiles() {
        if (!db) { console.error("loadAndDisplayProfiles: Database not initialized."); return; }
        try {
            const transaction = db.transaction(['profiles'], 'readonly');
            const store = transaction.objectStore('profiles');
            const request = store.getAll();
            const profileList = document.getElementById('profile-list');
            profileList.innerHTML = '';

            request.onerror = (e) => console.error("Error loading profiles:", e.target.error);

            request.onsuccess = () => {
                const profiles = request.result;
                if (profiles && profiles.length > 0) {
                    profiles.forEach(profile => {
                        const btn = document.createElement('button');
                        btn.textContent = profile.name;
                        btn.className = 'load-theme-btn';
                        btn.style.width = '100%';
                        btn.style.marginBottom = '1rem';
                        btn.onclick = () => {
                            activeProfile = profile;
                            console.log(`[DEBUG] Profile "${activeProfile.name}" selected.`);
                            navigateTo(CONSTANTS.PAGES.SETUP);
                        };
                        profileList.appendChild(btn);
                    });
                } else {
                    profileList.innerHTML = '<p>No profiles found. Create one below!</p>';
                }
            };
        } catch (error) {
             console.error("Error accessing IndexedDB for profiles:", error);
             document.getElementById('profile-list').innerHTML = '<p>Error loading profiles.</p>';
        }
    }


    function handleAddProfile() {
        const profileNameInput = document.getElementById('new-profile-name-input');
        const profileName = profileNameInput.value.trim();
        if (!profileName) {
             alert("Please enter a name for the profile.");
             return;
        }
        if (!db) {
             alert("Database not ready. Please wait and try again.");
             return;
        }

        try {
            const transaction = db.transaction(['profiles'], 'readwrite');
            const store = transaction.objectStore('profiles');
            const request = store.add({ name: profileName });

            request.onsuccess = () => {
                profileNameInput.value = '';
                loadAndDisplayProfiles();
            };
            request.onerror = (e) => {
                 console.error("Error adding profile:", e.target.error);
                 alert("Failed to add profile. Name might already exist or DB error.");
            };
        } catch (error) {
            console.error("Error accessing IndexedDB to add profile:", error);
            alert("An error occurred while trying to add the profile.");
        }
    }

    function navigateTo(page) {
        const pages = {
            [CONSTANTS.PAGES.SETUP]: setupContainer,
            [CONSTANTS.PAGES.GAME]: gameContainer,
            [CONSTANTS.PAGES.PROFILE]: profileContainer,
        };

        console.log(`[DEBUG] Navigating to page: "${page}"`);
        Object.values(pages).forEach(p => { if (p) p.classList.add('hidden'); });

        if (pages[page]) {
            pages[page].classList.remove('hidden');
            console.log(`[DEBUG] Displaying container for "${page}"`);
        } else {
             console.error(`Navigation error: Page "${page}" container not found. Falling back to SETUP.`);
             if (pages[CONSTANTS.PAGES.SETUP]) pages[CONSTANTS.PAGES.SETUP].classList.remove('hidden');
             page = CONSTANTS.PAGES.SETUP;
        }

        const isSetup = page === CONSTANTS.PAGES.SETUP;
        const isGame = page === CONSTANTS.PAGES.GAME;
        const isProfile = page === CONSTANTS.PAGES.PROFILE;

        mainMenuNavBtn.classList.toggle('hidden', isSetup || isProfile);
        changeProfileBtn.classList.toggle('hidden', !isSetup);

        if (isGame) { mainMenuNavBtn.textContent = "End Game"; }
        else { mainMenuNavBtn.textContent = "Main Menu"; }


        if (isSetup) {
            loadHighScores('profile');
            if (activeProfile?.name) classHsBtn.textContent = `${activeProfile.name}'s Ranking`;
            else classHsBtn.textContent = 'Class Ranking';
        }
        if (isProfile) { classHsBtn.textContent = 'Class Ranking'; }
    }


    function showModal(modal) { if(modal) modal.classList.remove('hidden'); }
    function hideModal(modal) {
        if (!modal) return;
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('fade-out');
        }, 300);
    }

    function showFullscreenModal(imageUrl, message) {
        if (fullscreenImage) fullscreenImage.src = imageUrl || '';
        if (fullscreenMessage) fullscreenMessage.innerHTML = message || '';
        if (fullscreenEvent) showModal(fullscreenEvent);
    }

    function showEventModal(message) {
        if (eventMessage) eventMessage.innerHTML = message || '';
        if (eventModal) {
            showModal(eventModal);
            setTimeout(() => hideModal(eventModal), 2000);
        }
    }

    // --- 7. TEAM SETUP LOGIC ---
    // (This whole section is unchanged and correct)
    function initiateGameSetup(totalTeams) {
        console.log('[DEBUG] initiateGameSetup() called.');
        teamSetupState = { currentIndex: 0, totalTeams: totalTeams, teams: [] };
        renderTeamChoiceView();
        showModal(teamSetupModal);
    }

    function renderTeamChoiceView() {
        const teamNum = teamSetupState.currentIndex + 1;
        const modalContent = document.querySelector('#team-setup-modal .modal-content');
        if (!modalContent) return;
        modalContent.innerHTML = `
            <h2>Setup Team ${teamNum} of ${teamSetupState.totalTeams}</h2>
            <p style="margin: 1rem 0;">How do you want to add this team?</p>
            <div class="team-setup-actions" style="display: flex; gap: 1rem; justify-content: center;">
                <button id="modal-create-team-btn">Create a New Team</button>
                <button id="modal-choose-team-btn">Choose a Saved Team</button>
            </div>
            <button id="modal-cancel-btn" style="margin-top: 2rem; background-color: var(--rank-last-color)">Cancel Setup</button>
        `;
        document.getElementById('modal-create-team-btn').onclick = () => {
            currentTeamData = { avatar: AVATAR_TIERS[0].emojis[0], members: [] };
            renderCreateTeamView();
        };
        document.getElementById('modal-choose-team-btn').onclick = renderSavedTeamView;
        document.getElementById('modal-cancel-btn').onclick = () => hideModal(teamSetupModal);
    }

    function renderCreateTeamView() {
        const modalContent = document.querySelector('#team-setup-modal .modal-content');
        if (!modalContent) return;
        modalContent.innerHTML = `
            <h2>Create a New Team</h2>
            <div class="form-group">
                <label for="modal-team-name-input">Team Name</label>
                <div style="display: flex; align-items: center; margin-top: 0.5rem;">
                    <input type="text" id="modal-team-name-input" placeholder="Enter name or use suggestion">
                    <button id="refresh-name-btn" style="margin-left: 10px; font-size: 1.5rem; padding: 5px 10px;" title="Suggest Name">🔄</button>
                </div>
            </div>
            <div class="form-group">
                <label>Team Avatar</label>
                <button id="modal-open-avatar-selector-btn" style="font-size: 2.5rem; padding: 10px; width: 100%; text-align: center;"></button>
            </div>
            <div class="team-setup-actions" style="display: flex; gap: 1rem; justify-content: center;">
                <button id="modal-save-quick-btn">Save & Continue</button>
                <button id="modal-continue-roster-btn">Add Roster & Save</button>
                <button id="modal-back-btn">Back</button>
            </div>
        `;

        const nameInput = document.getElementById('modal-team-name-input');
        const refreshBtn = document.getElementById('refresh-name-btn');
        const avatarButton = document.getElementById('modal-open-avatar-selector-btn');
        avatarButton.textContent = currentTeamData.avatar || AVATAR_TIERS[0].emojis[0];

        function generateAndSuggestName() {
            const adj = NAME_GEN.adjectives[Math.floor(Math.random() * NAME_GEN.adjectives.length)];
            let finalName;
            if (Math.random() > 0.4) {
                const noun = NAME_GEN.nouns_plural[Math.floor(Math.random() * NAME_GEN.nouns_plural.length)];
                finalName = `The ${adj} ${noun}`;
            } else {
                const noun = NAME_GEN.nouns_singular[Math.floor(Math.random() * NAME_GEN.nouns_singular.length)];
                const suffix = NAME_GEN.suffixes[Math.floor(Math.random() * NAME_GEN.suffixes.length)];
                finalName = `${adj} ${noun} ${suffix}`;
            }
            nameInput.value = finalName;
        }

        avatarButton.onclick = () => {
            const teamForAvatarSelection = {
                totalScore: 0,
                avatar: currentTeamData.avatar || AVATAR_TIERS[0].emojis[0]
            };
            renderAvatarSelector( teamForAvatarSelection, (selectedEmoji) => {
                    currentTeamData.avatar = selectedEmoji;
                    hideModal(document.getElementById('avatar-select-modal'));
                    renderCreateTeamView();
                }, () => {
                    hideModal(document.getElementById('avatar-select-modal'));
                }
            );
        };

        refreshBtn.onclick = generateAndSuggestName;

        document.getElementById('modal-save-quick-btn').onclick = () => {
            currentTeamData.name = nameInput.value.trim();
            if (!currentTeamData.name) return alert("Team name cannot be empty.");
            currentTeamData.members = [];
            saveAndFinalizeCurrentTeam();
        };

        document.getElementById('modal-continue-roster-btn').onclick = () => {
            currentTeamData.name = nameInput.value.trim();
            if (!currentTeamData.name) return alert("Team name cannot be empty.");
            renderRosterView();
        };

        document.getElementById('modal-back-btn').onclick = renderTeamChoiceView;
        generateAndSuggestName();
    }

    function renderRosterView() {
        const modalContent = document.querySelector('#team-setup-modal .modal-content');
        if (!modalContent) return;
        modalContent.innerHTML = `
            <h2>Add Students to "${currentTeamData.name}"</h2>
            <p>This step is optional. Add names of students on this team.</p>
            <div class="form-group" style="display:flex; align-items:center;">
                <input type="text" id="modal-student-name-input" placeholder="Enter student's name" style="flex-grow: 1;">
                <button id="modal-add-student-btn" style="margin-left: 10px;">Add</button>
            </div>
            <ul id="modal-student-list" style="list-style: none; padding: 10px; margin: 1rem 0; background-color: var(--primary-bg); border-radius: 8px; min-height: 100px; max-height: 150px; overflow-y: auto;"></ul>
            <div class="team-setup-actions" style="display: flex; gap: 1rem; justify-content: center;">
                <button id="modal-save-team-btn">Save Team & Continue</button>
                <button id="modal-roster-back-btn">Back to Team Details</button>
            </div>
        `;

        const studentInput = document.getElementById('modal-student-name-input');
        const studentList = document.getElementById('modal-student-list');
        const addStudentBtn = document.getElementById('modal-add-student-btn');

        if (!currentTeamData.members) currentTeamData.members = [];

        currentTeamData.members.forEach(name => {
             const li = document.createElement('li');
             li.textContent = name;
             li.style.padding = '5px';
             studentList.appendChild(li);
        });

        function addStudent() {
            const studentName = studentInput.value.trim();
            if (studentName && !currentTeamData.members.includes(studentName)) {
                currentTeamData.members.push(studentName);
                const li = document.createElement('li');
                li.textContent = studentName;
                li.style.padding = '5px';
                studentList.appendChild(li);
                studentInput.value = '';
                studentInput.focus();
            } else if (studentName) {
                 alert(`"${studentName}" is already on the roster.`);
            }
        }

        addStudentBtn.onclick = addStudent;
        studentInput.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); addStudent(); } };
        document.getElementById('modal-save-team-btn').onclick = saveAndFinalizeCurrentTeam;
        document.getElementById('modal-roster-back-btn').onclick = renderCreateTeamView;
    }

    function renderAvatarSelector(team, onSelectCallback, onBackCallback) {
        const totalScore = team.totalScore || 0;
        let selectedAvatar = team.avatar || AVATAR_TIERS[0].emojis[0];

        const avatarModal = document.getElementById('avatar-select-modal');
        const modalContent = avatarModal.querySelector('.modal-content');
        if (!modalContent) return;

        modalContent.innerHTML = `
            <h2>Choose Your Team's Avatar</h2>
            <p style="margin-bottom: 1rem;">Total Score: <strong>${totalScore}</strong>. Higher scores unlock more tiers!</p>
            <div id="avatar-tabs"></div>
            <div id="avatar-grid"></div>
            <div class="team-setup-actions" style="margin-top: 1.5rem;">
                <button id="modal-confirm-avatar-btn">Confirm Avatar</button>
                <button id="modal-back-to-team-create-btn">Back</button>
            </div>
        `;

        const tabsContainer = modalContent.querySelector('#avatar-tabs');
        const gridContainer = modalContent.querySelector('#avatar-grid');

        AVATAR_TIERS.forEach(tier => {
            const isUnlocked = totalScore >= tier.unlockScore;
            const tab = document.createElement('button');
            tab.textContent = tier.name;
            tab.className = 'avatar-tab-btn';
            if (!isUnlocked) {
                tab.disabled = true;
                tab.title = `Unlocks at ${tier.unlockScore} points`;
            }
            tab.onclick = () => {
                modalContent.querySelectorAll('.avatar-tab-btn').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderAvatarGrid(tier, gridContainer, (emoji) => {
                    selectedAvatar = emoji;
                });
                 const currentBtn = Array.from(gridContainer.querySelectorAll('.avatar-choice-btn')).find(b => b.textContent === selectedAvatar);
                 if(currentBtn) currentBtn.classList.add('selected');
            };
            tabsContainer.appendChild(tab);
        });

        modalContent.querySelector('#modal-confirm-avatar-btn').onclick = () => onSelectCallback(selectedAvatar);
        modalContent.querySelector('#modal-back-to-team-create-btn').onclick = onBackCallback;

        showModal(avatarModal);

        const firstEnabledTab = tabsContainer.querySelector('.avatar-tab-btn:not(:disabled)');
        if(firstEnabledTab) firstEnabledTab.click();
        else gridContainer.innerHTML = "<p>No avatars available.</p>";
    }

    function renderAvatarGrid(tier, gridContainer, onSelect) {
        gridContainer.innerHTML = '';
        tier.emojis.forEach(emoji => {
            const emojiBtn = document.createElement('button');
            emojiBtn.textContent = emoji;
            emojiBtn.className = 'avatar-choice-btn';
            emojiBtn.onclick = () => {
                gridContainer.querySelectorAll('.avatar-choice-btn').forEach(b => b.classList.remove('selected'));
                emojiBtn.classList.add('selected');
                onSelect(emoji);
            };
            gridContainer.appendChild(emojiBtn);
        });
    }

    function renderSavedTeamView() {
        const modalContent = document.querySelector('#team-setup-modal .modal-content');
        if (!modalContent) return;
        modalContent.innerHTML = `
            <h2>Choose a Saved Team</h2>
            <div id="modal-saved-teams-list" style="margin: 1rem 0; max-height: 300px; overflow-y: auto;">
                <p>Loading teams...</p>
            </div>
            <div class="team-setup-actions">
                <button id="modal-back-from-saved-btn">Back</button>
            </div>
        `;
        document.getElementById('modal-back-from-saved-btn').onclick = renderTeamChoiceView;

        const listEl = document.getElementById('modal-saved-teams-list');
        if (!db || !activeProfile) {
             listEl.innerHTML = '<p>Error: Database or profile not loaded.</p>'; return;
        }

        try {
            const transaction = db.transaction(['teams'], 'readonly');
            const store = transaction.objectStore('teams');
            const index = store.index('profileId');
            const request = index.getAll(activeProfile.id);

            request.onerror = (e) => {
                 listEl.innerHTML = '<p>Error loading saved teams.</p>';
                 console.error("Error fetching teams:", e.target.error);
            };

            request.onsuccess = () => {
                listEl.innerHTML = '';
                const teams = request.result;
                const teamsInUse = teamSetupState.teams.map(t => t.dbId);

                if (!teams || teams.length === 0) {
                    listEl.innerHTML = '<p>No saved teams for this profile yet.</p>';
                } else {
                    teams.forEach(team => {
                        const btn = document.createElement('button');
                        btn.className = 'load-theme-btn';
                        btn.style.width = '100%';
                        btn.style.marginBottom = '1rem';
                        btn.style.display = 'flex';
                        btn.style.alignItems = 'center';
                        btn.innerHTML = `<span style="font-size: 2rem; margin-right: 1rem;">${team.avatar || '❓'}</span> ${team.name || 'Unnamed Team'}`;

                        if(teamsInUse.includes(team.id)) {
                            btn.disabled = true;
                            btn.style.opacity = 0.5;
                            btn.style.cursor = 'not-allowed';
                            btn.title = "Already selected for this game";
                        } else {
                             btn.onclick = () => finalizeTeamSelection(team);
                        }
                        listEl.appendChild(btn);
                    });
                }
            };
        } catch (error) {
             console.error("Error accessing IndexedDB for saved teams:", error);
             listEl.innerHTML = '<p>Error accessing database.</p>';
        }
    }


    function saveAndFinalizeCurrentTeam() {
        if (!db || !activeProfile) { alert("Database or profile error."); return; }

        const newTeam = {
            profileId: activeProfile.id,
            name: currentTeamData.name,
            avatar: currentTeamData.avatar || AVATAR_TIERS[0].emojis[0],
            members: currentTeamData.members || [],
            wins: 0,
            losses: 0,
            totalScore: 0
        };

        try {
            const transaction = db.transaction(['teams'], 'readwrite');
            const store = transaction.objectStore('teams');
            const request = store.add(newTeam);

            request.onerror = (e) => {
                 console.error("Error saving new team:", e.target.error);
                 alert("Failed to save the new team. Name might already exist?");
            };

            request.onsuccess = (e) => {
                newTeam.id = e.target.result;
                console.log(`Team "${newTeam.name}" saved with ID: ${newTeam.id}`);
                finalizeTeamSelection(newTeam);
            };
        } catch (error) {
             console.error("Error accessing IndexedDB to save team:", error);
             alert("An error occurred while saving the team.");
        }
    }


    function finalizeTeamSelection(teamObject) {
        teamSetupState.teams.push({
            dbId: teamObject.id,
            name: teamObject.name,
            avatar: teamObject.avatar,
            score: 0,
            hasAnnulCard: false
        });

        teamSetupState.currentIndex++;

        if (teamSetupState.currentIndex < teamSetupState.totalTeams) {
            renderTeamChoiceView();
        } else {
            hideModal(teamSetupModal);
            gameState.teams = teamSetupState.teams;
            startGame(gameState.gameLength);
        }
    }


    // --- 8. EVENT LISTENERS ---
    
    // Header Buttons
    changeProfileBtn.addEventListener('click', showProfileScreen);
    
    // --- ITEM 9: Updated Main Menu Button Logic ---
    mainMenuNavBtn.addEventListener('click', () => {
        if (gameContainer && !gameContainer.classList.contains('hidden')) {
             // Now calls endGame() instead of resetToMenu()
             if (confirm("Are you sure you want to end the current game and show the final scores?")) {
                 endGame(); 
             }
        } else {
             navigateTo(CONSTANTS.PAGES.SETUP);
        }
    });

    // Profile Screen Buttons
    document.getElementById('add-profile-btn').addEventListener('click', handleAddProfile);

    // Setup Screen Buttons
    classHsBtn.addEventListener('click', () => loadHighScores('profile'));
    globalHsBtn.addEventListener('click', () => loadHighScores('global'));

    // Game Screen Buttons
    gameMenuBtn.addEventListener('click', () => {
         // This button is hidden, but the listener is harmless
         if (confirm("Are you sure you want to end the current game?")) {
             endGame(); // Changed to endGame() for consistency
         }
    });

    // Modal Buttons
    confirmSettingsBtn.addEventListener('click', () => {
        const selectedMode = document.querySelector('input[name="game-mode-modal"]:checked').value;
        const selectedLength = document.querySelector('input[name="game-length-modal"]:checked').value;
        const selectedTeams = teamCountSelectModal.value;
        const selectedDifficulty = document.querySelector('input[name="math-difficulty"]:checked').value;

        gameState.gameMode = selectedMode;
        gameState.gameLength = parseInt(selectedLength, 10); // This is now 36, 60, or 84
        gameState.mathDifficulty = parseInt(selectedDifficulty, 10);
        const totalTeams = parseInt(selectedTeams, 10);

        hideModal(gameSettingsModal);
        initiateGameSetup(totalTeams);
    });
    cancelSettingsBtn.addEventListener('click', () => hideModal(gameSettingsModal));
    gameOverMenuBtn.addEventListener('click', resetToMenu);

    

    // --- 9. INITIALIZE THE APP ---
    initDB(); 


    // --- 10. EXPOSE FUNCTIONS/VARS TO GLOBAL SCOPE ---
    window.CONSTANTS = CONSTANTS;
    window.gameState = gameState;
    window.sfx = sfx;
    
    window.transferPointsModal = transferPointsModal;
    window.transferTitle = transferTitle;
    window.transferDescription = transferDescription;
    window.transferTeamButtons = transferTeamButtons;
    window.gambleModal = gambleModal;
    window.gambleOpponentSelect = gambleOpponentSelect;
    window.gambleAmountSelect = gambleAmountSelect;
    window.confirmGambleBtn = confirmGambleBtn;
    window.cancelGambleBtn = cancelGambleBtn;
    window.gambleResultDisplay = gambleResultDisplay;

    window.navigateTo = navigateTo;
    window.showModal = showModal;
    window.hideModal = hideModal;
    window.showEventModal = showEventModal;
    window.updateScoreboard = updateScoreboard;
    window.endTurn = endTurn;
    window.startTurn = startTurn;
    window.processEvent = processEvent;
    window.endGame = endGame;
        
    window.shuffledDeck = shuffledDeck;

}); // End DOMContentLoaded