document.addEventListener('DOMContentLoaded', () => {

    console.log('[DEBUG] DOM fully loaded. Initializing script.');

    // --- CONSTANTS ---
    const CONSTANTS = {
        PAGES: {
            PROFILE: 'profile',
            SETUP: 'setup',
            CREATOR: 'creator',
            GAME: 'game',
            DUNGEON: 'dungeon'
        }
    };

    // --- 1. GET ALL UI ELEMENTS ---
    const profileContainer = document.getElementById('profile-container');
    const setupContainer = document.getElementById('setup-container');
    const themeCreatorContainer = document.getElementById('theme-creator-container');
    const gameContainer = document.getElementById('game-container');
    const dungeonContainer = document.getElementById('dungeon-container');

    const changeProfileBtn = document.getElementById('change-profile-btn');
    const creatorNavBtn = document.getElementById('creator-nav-btn');
    const mainMenuNavBtn = document.getElementById('main-menu-nav-btn');

    const savedThemesList = document.getElementById('saved-themes-list');
    const noThemesMsg = document.getElementById('no-saved-themes-msg');

    const highScoreList = document.getElementById('high-score-list');
    const noHighScoresMsg = document.getElementById('no-high-scores-msg');
    const classHsBtn = document.getElementById('class-hs-btn');
    const globalHsBtn = document.getElementById('global-hs-btn');

    const imageInput = document.getElementById('image-input');
    const musicInput = document.getElementById('music-input');
    const board = document.getElementById('game-board');
    const scoreboard = document.getElementById('scoreboard');
    const defaultStartBtn = document.getElementById('default-start-btn');
    const startWithCustomBtn = document.getElementById('start-with-custom-btn');
    const saveCustomThemeBtn = document.getElementById('save-custom-theme-btn');
    const gameMenuBtn = document.getElementById('game-menu-btn');
    const backgroundMusic = document.getElementById('background-music');

    const importThemeBtn = document.getElementById('import-theme-btn');
    const themeImporter = document.getElementById('theme-importer');

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
    const EMOJI_CHOICE_LIST = ['😀', '😇', '🥸', '😎', '🤩', '🥳', '🤔', '🤫', '🤯', '🥶', '😱', '😡', '🤡', '👻', '👽', '🤖', '😈', '👿', '🧑‍🏫', '🧑‍🎓', '👨‍🔬', '👩‍🚀', '🥷', '🧙', '🧛', '🧟', '🧞', '🤴', '👸', '🕵️‍♂️', '👩‍⚕️', '👨‍⚖️', '👩‍🎨', '👨‍🍳', '👩‍✈️', '🦊', '🦁', '🐯', '🐴', '🦄', '🦓', '🦌', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦉', '🦅', '🦇', '🐺', '🐗', '🦋', '🐛', '🐜', '🐞', '🦗', '🕷️', '🦂', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🐪', '🦙', '🦒', '🐘', '🦏', '🦛', '🐐', '🐏', '🐖', '🐉', '🐲', '🌲', '🌳', '🌴', '🌵', '🌱', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄', '🌷', '🌸', '🌹', '🌺', '🌞', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌝', '🌚', '⭐', '🌟', '🌠', '💫', '✨', '☄️', '🪐', '🌍', '🌎', '🌏', '🌋', '🏔️', '❄️', '⚡️', '🔥', '💥', '💨', '💧', '💦', '🌊', '🌈', '☀️', '🌤️', '⛅️', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '🌪️', '🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🥝', '🥥', '🍍', '🥭', '🍑', '🍒', '🍈', '🥨', '🥯', '🍞', '🥐', '🥖', '🧀', '🥚', '🍳', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍿', '🍩', '🍪', '🥜', '🍫', '🍬', '🍭', '🍯', '🥛', '☕️', '🍵', '🧃', '🥤', '🧉', '⚽️', '🏀', '🏈', '⚾️', '🥎', '🎾', '🏐', '🎱', '🏓', '🏸', '🏒', '🏑', '🏏', '🪃', '🥅', '⛳️', '🏹', '🎣', '🤿', '🥊', '🥋', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎯', '🎳', '🎮', '🕹️', '🎰', '🎲', '🧩', '♟️', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '⌚️', '📱', '💻', '⌨️', '🖱️', '🖨️', '🎥', '📷', '📹', '📺', '📻', '💡', '💣', '⚔️', '🛡️', '🔑', '🗝️', '💰', '🪙', '💎', '⚗️', '🔭', '🔬', '🧬', '⚙️', '⛓️', '📎', '📌', '📍', '📏', '📐', '✂️', '📝', '📚', '📜', '📖', '📑', '🔗', '✒️', '🖋️', '🖊️', '🖌️', '🖍️', '📁', '📂', '️', '📅', '📆', '🗑️', '🚗', '🚕', '🚙', '🚌', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛵', '🚲', '🛴', '🚀', '✈️', '🚁', '🚂', '🚤', '🚢', '🏰', '🏯', '🏟️', '🏠', '🏡', '🏢', '🏬', '🏭', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🕍', '🕌', '⛩️', '🕋', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '☮️', '☯️', '🕎', '✡️', '☪️', '✝️', '☦️', '☸️', '⚜️', '💠', '♾️', '✅', '❌', '💯', '‼️', '⁉️'];
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
    const ALL_GAME_CARDS = [...CORE_CARDS, ...JACKPOT_CARDS, ...STANDARD_CARDS, { name: 'Secret Dungeon Entrance!', type: 'dungeon' } ].reduce((acc, card) => {
        if (!acc.find(c => c.name === card.name)) {
            acc.push(card);
        }
        return acc;
    }, []).sort((a, b) => { // Sort with Dungeon last
        if (a.type === 'dungeon') return 1;
        if (b.type === 'dungeon') return -1;
        return (b.value || 0) - (a.value || 0);
    });

    let shuffledDeck = [];

    // --- UPDATED gameState ---
    const gameState = {
        teams: [],
        currentTurn: 0,
        squaresLeft: 0,
        gameLength: 60,
        gameMode: 'math',
        mathDifficulty: 1,
        isTurnActive: false,
        doubleNextOutcome: false,
        keepFriendsCloseTargetTeamId: null,
        pendingEventForAnnul: null,
    };

    let sfx = {};
    let currentTheme = {
        name: '', images: {}, palette: [], emojis: [], emojiMode: 'overlay',
        backgroundImageFile: null, backgroundMusicFile: null, soundFiles: {}, soundData: {}
    };
    let activeGameTheme = {};
    let activeProfile = null;
    let colorThief = typeof ColorThief !== 'undefined' ? new ColorThief() : null;
    let db;
    let teamSetupState = { currentIndex: 0, totalTeams: 0, teams: [] };
    let currentTeamData = {};
    let questionTimer;

    // --- 3. HELPER & UTILITY FUNCTIONS ---
    function fileToBase64(file) {
        if (!file) return Promise.resolve(null);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // --- 4. DATABASE & THEME MANAGEMENT ---
     function initDB() {
        const request = indexedDB.open('GemaraKUpGameDB', 6);
        request.onerror = (event) => console.error("Database error:", event.target.errorCode);
        request.onupgradeneeded = (event) => {
            console.log("Database upgrade needed.");
            const db = event.target.result;
            if (!db.objectStoreNames.contains('profiles')) db.createObjectStore('profiles', { keyPath: 'id', autoIncrement: true });
            if (!db.objectStoreNames.contains('themes')) db.createObjectStore('themes', { keyPath: 'id', autoIncrement: true });
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
        };
    }

    function loadThemes() {
        if (!db) { console.error("loadThemes: Database not initialized."); return; }
        const transaction = db.transaction(['themes'], 'readonly');
        const store = transaction.objectStore('themes');
        const request = store.getAll();

        request.onerror = (e) => console.error("Error loading themes:", e.target.error);

        request.onsuccess = () => {
            savedThemesList.innerHTML = '';
            const themes = request.result;
            if (themes && themes.length > 0) {
                noThemesMsg.classList.add('hidden');
                themes.forEach(theme => {
                    const buttonGroup = document.createElement('div');
                    buttonGroup.className = 'theme-button-group';

                    const loadBtn = document.createElement('button');
                    loadBtn.textContent = theme.name || 'Unnamed Theme';
                    loadBtn.className = 'load-theme-btn';
                    loadBtn.onclick = () => {
                        console.log('[DEBUG] Loading saved theme:', theme.name);
                        activeGameTheme = theme;
                        showModal(gameSettingsModal);
                    };

                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Edit';
                    editBtn.className = 'edit-theme-btn';
                    editBtn.onclick = () => loadThemeIntoCreator(theme);

                    buttonGroup.appendChild(loadBtn);
                    buttonGroup.appendChild(editBtn);
                    savedThemesList.appendChild(buttonGroup);
                });
            } else {
                noThemesMsg.classList.remove('hidden');
            }
        };
    }

    function triggerThemeExport(themeData, themeName) {
        try {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(themeData, null, 2));
            const downloadAnchorNode = document.createElement('a');
            const sanitizedFileName = (themeName || 'theme').replace(/[^a-z0-9\s-]/gi, '').trim().replace(/\s+/g, '_');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `${sanitizedFileName}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        } catch (error) {
            console.error("Error triggering theme export:", error);
            alert("Failed to export theme.");
        }
    }

    function loadThemeIntoCreator(theme) {
        console.log(`[DEBUG] Editing theme: "${theme.name}" (ID: ${theme.id})`);
        currentTheme = {
            id: theme.id,
            name: theme.name,
            images: {},
            palette: theme.palette ? [...theme.palette] : [],
            emojis: theme.emojis ? [...theme.emojis] : [],
            emojiMode: theme.emojiMode || 'overlay',
            backgroundImageData: theme.backgroundImageData,
            backgroundMusicData: theme.backgroundMusicData,
            imageCategoryData: theme.images ? { ...theme.images } : {},
            soundFiles: {},
            soundData: theme.sounds ? { ...theme.sounds } : {}
        };

        navigateTo(CONSTANTS.PAGES.CREATOR);

        const emojiDisplayOptions = document.getElementById('emoji-display-options');
        if (currentTheme.emojis && currentTheme.emojis.length > 0) {
            emojiDisplayOptions.classList.remove('hidden');
            const emojiModeInput = document.querySelector(`input[name="emoji-mode"][value="${currentTheme.emojiMode}"]`);
            if (emojiModeInput) emojiModeInput.checked = true;
        } else {
            emojiDisplayOptions.classList.add('hidden');
        }
    }

    async function handleSaveCurrentTheme() {
        if (!currentTheme.backgroundImageFile && !currentTheme.backgroundImageData) {
            return alert("A background image is required to save a theme.");
        }

        const themeName = prompt("Enter a name for your theme:", currentTheme.name || "My Custom Theme");
        if (!themeName) return;

        try {
            const emojiModeElement = document.querySelector('input[name="emoji-mode"]:checked');

            const savableTheme = {
                name: themeName,
                palette: currentTheme.palette,
                emojis: currentTheme.emojis,
                emojiMode: emojiModeElement ? emojiModeElement.value : 'overlay',
                backgroundImageData: currentTheme.backgroundImageFile
                    ? await fileToBase64(currentTheme.backgroundImageFile)
                    : currentTheme.backgroundImageData,
                backgroundMusicData: currentTheme.backgroundMusicFile
                    ? await fileToBase64(currentTheme.backgroundMusicFile)
                    : currentTheme.backgroundMusicData,
                images: { ...currentTheme.imageCategoryData },
                sounds: { ...currentTheme.soundData }
            };

            for (const cardName in currentTheme.images) {
                const files = currentTheme.images[cardName];
                if (Array.isArray(files) && files.length > 0) {
                    savableTheme.images[cardName] = await Promise.all(
                        files.map(file => fileToBase64(file))
                    );
                }
            }

            for (const sfxName in currentTheme.soundFiles) {
                const file = currentTheme.soundFiles[sfxName];
                if (file) {
                    savableTheme.sounds[sfxName] = await fileToBase64(file);
                }
            }

            if (!db) { throw new Error("Database not initialized."); }
            const transaction = db.transaction(['themes'], 'readwrite');
            const store = transaction.objectStore('themes');

            const request = currentTheme.id
                ? store.put({ ...savableTheme, id: currentTheme.id })
                : store.add(savableTheme);

            request.onsuccess = () => {
                alert(`Theme "${themeName}" ${currentTheme.id ? 'updated' : 'saved'}!`);
                loadThemes();
                if (!currentTheme.id) {
                     triggerThemeExport(savableTheme, themeName);
                }
                 currentTheme = {
                    name: '', images: {}, palette: [], emojis: [], emojiMode: 'overlay',
                    backgroundImageFile: null, backgroundMusicFile: null, soundFiles: {}, soundData: {}
                };
            };
            request.onerror = (e) => {
                 console.error("Error saving/updating theme:", e.target.error);
                 alert("Failed to save theme. See console for details.");
            };

        } catch (error) {
            console.error("Error preparing theme for saving:", error);
            alert("An error occurred while preparing the theme. See console for details.");
        }
    }


    function handleImportTheme(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const themeData = JSON.parse(e.target.result);
                if (!themeData || typeof themeData !== 'object' || !themeData.name || !themeData.backgroundImageData) {
                     throw new Error("Invalid theme file format.");
                }

                if (!db) { throw new Error("Database not initialized."); }
                const transaction = db.transaction(['themes'], 'readwrite');
                const store = transaction.objectStore('themes');
                const request = store.add(themeData);

                request.onsuccess = () => {
                    alert(`Theme "${themeData.name}" imported and saved!`);
                    loadThemes();
                };
                request.onerror = (e) => {
                     console.error("Error saving imported theme:", e.target.error);
                     alert("Failed to save imported theme. It might already exist or there was a database error.");
                };
            } catch (error) {
                console.error("Error parsing or validating theme file:", error);
                alert(`Could not import theme. ${error.message}`);
            }
        };
        reader.onerror = () => {
             alert("Error reading the theme file.");
        };
        reader.readAsText(file);
        event.target.value = null;
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

    function loadSoundEffects(theme) {
        Howler.unload();
        sfx = {};

        const themeSounds = theme.sounds || {};
        const defaultSounds = {
            lowGain: 'https://cdn.pixabay.com/audio/2022/03/15/audio_a46b732152.mp3',
            highGain: 'https://cdn.pixabay.com/audio/2022/11/17/audio_821896131b.mp3',
            lowLoss: 'https://cdn.pixabay.com/audio/2021/08/04/audio_12b0a82b13.mp3',
            highLoss: 'https://cdn.pixabay.com/audio/2022/03/10/audio_e0828d18a0.mp3',
            special: 'https://cdn.pixabay.com/audio/2022/03/22/audio_6069971ce7.mp3',
            gameOver: 'https://cdn.pixabay.com/audio/2022/08/23/audio_a831fce34e.mp3'
        };

        const soundNames = ['lowGain', 'highGain', 'lowLoss', 'highLoss', 'special', 'gameOver'];

        soundNames.forEach(name => {
            const src = themeSounds[name] || defaultSounds[name];
            if (src) {
                sfx[name] = new Howl({
                     src: [src],
                     html5: true
                 });
                 sfx[name].once('load', () => console.log(`Sound "${name}" loaded.`));
                 sfx[name].on('loaderror', (id, err) => console.error(`Error loading sound "${name}":`, err));
            } else {
                 console.warn(`No source found for sound "${name}".`);
            }
        });

        console.log("Sound effect loading initiated.");
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

        const numberOfDungeonCards = 5;
        let addedDungeonCards = 0;
        for (let i = 0; i < workingDeck.length && addedDungeonCards < numberOfDungeonCards; i++) {
             const isStandard = STANDARD_CARDS.find(sc => sc.name === workingDeck[i]?.name);
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
                 if (STANDARD_CARDS.length === 0) break;
                do {
                    standardCardToAdd = STANDARD_CARDS[Math.floor(Math.random() * STANDARD_CARDS.length)];
                } while (!standardCardToAdd || standardCardToAdd.type === 'dungeon');
                workingDeck.push(standardCardToAdd);
            }
        }

        workingDeck.sort(() => 0.5 - Math.random());

        const finalDeck = workingDeck.slice(0, numberOfSquares);

        const dungeonCount = finalDeck.filter(card => card && card.type === 'dungeon').length;
        console.log(`[DEBUG] Created deck of size ${finalDeck.length}. Contains ${dungeonCount} dungeon cards.`);

        return finalDeck;
    }


    function startGame(numberOfSquares) {
        numberOfSquares = parseInt(numberOfSquares, 10) || 60;
        numberOfSquares = Math.max(10, Math.min(numberOfSquares, 100));

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

        shuffledDeck = createShuffledDeck(numberOfSquares);

        if (activeGameTheme.backgroundImageData) {
            document.body.style.backgroundImage = `url(${activeGameTheme.backgroundImageData})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        } else {
             document.body.style.backgroundImage = '';
        }
        if (activeGameTheme.backgroundMusicData && backgroundMusic) {
             if(backgroundMusic.src !== activeGameTheme.backgroundMusicData || backgroundMusic.paused){
                 backgroundMusic.src = activeGameTheme.backgroundMusicData;
                 backgroundMusic.play().catch(e => console.warn("Background music autoplay prevented.", e));
             }
        } else if (backgroundMusic) {
             backgroundMusic.pause();
             backgroundMusic.src = '';
        }

        loadSoundEffects(activeGameTheme);
        createBoard(numberOfSquares);
        startTurn();
    }

    function createBoard(numberOfSquares) {
        board.innerHTML = '';
         if (numberOfSquares <= 0) {
              console.error("Cannot create board with 0 or negative squares.");
              return;
         }
        const cols = Math.ceil(Math.sqrt(numberOfSquares));
        const rows = Math.ceil(numberOfSquares / cols);
        const actualSquares = cols * rows;

        board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        const colors = activeGameTheme.palette && activeGameTheme.palette.length > 0 ? activeGameTheme.palette : DEFAULT_COLORS;
        const useEmojis = activeGameTheme.emojis && activeGameTheme.emojis.length > 0;
        const emojiMode = activeGameTheme.emojiMode || 'overlay';

        for (let i = 0; i < actualSquares; i++) {
            const square = document.createElement('div');
            square.classList.add('square');

            if (i < numberOfSquares) {
                 if (useEmojis) {
                    square.textContent = activeGameTheme.emojis[i % activeGameTheme.emojis.length];
                    let fontSize = Math.max(1, 4 / Math.sqrt(cols));
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
        }
    }


    function handleSquareClick(e) {
        Howler.autoUnlock = true;

        if (!gameState.isTurnActive) { console.log("[DEBUG] Click ignored: Turn not active."); return; }
        const clickedSquare = e.target.closest('.square');
        if (!clickedSquare || clickedSquare.classList.contains('flipped')) { return; }

        if (gameState.keepFriendsCloseTargetTeamId) {
            handleKeepFriendsCloseSelection(clickedSquare);
            return;
        }

        gameState.isTurnActive = false;

        clickedSquare.classList.add('flipped');
        gameState.squaresLeft--;
        const eventCard = shuffledDeck.pop();

        if(eventCard) {
            console.log('[DEBUG] Popped card:', eventCard.name, '| Type:', eventCard.type, `| Squares Left: ${gameState.squaresLeft}`);
            processEvent(eventCard);
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
        let sfxToPlay = null;
        let selectedImageUrl = null;
        let originalValue = eventCard.value;

        // --- Annul Card Check (Triggers prompt) ---
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
        // --- End Annul Card Check ---

        let doubled = false;
        if (gameState.doubleNextOutcome && isOwnTurn) {
            console.log("[DEBUG] Applying Double Trouble!");
            doubled = true;
            gameState.doubleNextOutcome = false;
        }

        const imagePool = activeGameTheme.images?.[eventCard.name] || activeGameTheme.images?.['Secret Dungeon Entrance!'];
        if (imagePool && imagePool.length > 0) {
            const randomIndex = Math.floor(Math.random() * imagePool.length);
            selectedImageUrl = imagePool[randomIndex];
        }

        if (eventCard.type === 'points') {
            let valueToApply = eventCard.value;
            if (doubled) valueToApply *= 2;
            team.score += valueToApply;
            message += `<p>${eventCard.name}${doubled ? ' (x2!)' : ''}</p>`;
            if (originalValue >= 15) sfxToPlay = 'highGain';
            else if (originalValue > 0) sfxToPlay = 'lowGain';
            else if (originalValue <= -15) sfxToPlay = 'highLoss';
            else sfxToPlay = 'lowLoss';

        } else if (eventCard.type === 'special') {
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
                 console.log("[DEBUG] Dungeon card type recognized!");
                 if(sfx.special) sfx.special.play();
                 if(selectedImageUrl){
                     showFullscreenModal(selectedImageUrl, `<h2>${team.avatar} ${team.name}</h2><p>Found a Secret Dungeon Entrance!</p>`);
                     fullscreenEvent.onclick = () => {
                         hideModal(fullscreenEvent);
                         setTimeout(() => enterDungeon(team, eventCard), 300);
                         fullscreenEvent.onclick = () => {
                             hideModal(fullscreenEvent);
                             setTimeout(endTurn, 300);
                         };
                     };
                 } else {
                     showEventModal(`<h2>${team.avatar} ${team.name}</h2><p>Found a Secret Dungeon Entrance!</p>`);
                     setTimeout(() => enterDungeon(team, eventCard), 2000);
                 }
                 return;
             } else {
                  message += `<p>Dungeon entrance fades away for the chosen target!</p>`;
                  sfxToPlay = 'lowLoss';
             }
        } else {
             console.warn(`[DEBUG] Encountered unknown card type: "${eventCard.type}" for card "${eventCard.name}"`);
             message += `<p>An unusual event occurred!</p>`;
             selectedImageUrl = null;
             sfxToPlay = 'special';
        }
 
        updateScoreboard();

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

        if (sfxToPlay && sfx[sfxToPlay] && typeof sfx[sfxToPlay].play === 'function') {
             sfx[sfxToPlay].play();
        } else if (sfxToPlay) {
             console.warn(`Sound effect "${sfxToPlay}" not loaded or invalid.`);
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
            if (sfx.special && typeof sfx.special.play === 'function') sfx.special.play();

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

    function handleTransferEvent(eventCard) {
        const currentTeam = gameState.teams[gameState.currentTurn];
        const otherTeams = gameState.teams.filter(team => team.dbId !== currentTeam.dbId);
        if (otherTeams.length === 0) {
            showEventModal(`<p>You drew "${eventCard.name}" but there are no other teams!</p>`);
            setTimeout(endTurn, 2000);
            return;
        }

        if(sfx.special && typeof sfx.special.play === 'function') sfx.special.play();

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
                    gameState.teams[targetIndex].score += pointsToGive;
                } else {
                     const pointsToTake = Math.min(gameState.teams[targetIndex].score, eventCard.value);
                     gameState.teams[targetIndex].score -= pointsToTake;
                     currentTeam.score += pointsToTake;
                }
                hideModal(transferPointsModal);
                updateScoreboard();
                setTimeout(endTurn, 500);
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

            // This is the logic for the "Get out of Jail" card emoji
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
        if(sfx.gameOver && typeof sfx.gameOver.play === 'function') sfx.gameOver.play();

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
        gameState.isTurnActive = false;
        updateScoreboard(); 

        if (gameState.keepFriendsCloseTargetTeamId) {
             const targetTeam = gameState.teams.find(t=> t.dbId === gameState.keepFriendsCloseTargetTeamId);
             const actingTeam = gameState.teams[gameState.currentTurn];
             console.log("[DEBUG] Keep Friends Close is active. Player selects for opponent.");
             showEventModal(`<h2>Keep Your Friends Close!</h2><p>${actingTeam?.avatar} ${actingTeam?.name}, choose a square for ${targetTeam?.avatar} ${targetTeam?.name}!</p>`);
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
            updateScoreboard();
            if(sfx.lowLoss && typeof sfx.lowLoss.play === 'function') sfx.lowLoss.play();
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


    function renderThemeCreatorInputs() {
        const container = document.getElementById('specific-image-uploads-container');
        if (!container) { console.error("Image upload container not found."); return; }
        container.innerHTML = '';

        ALL_GAME_CARDS.forEach(card => {
            const cardName = card.name;
             const safeCardNameId = cardName.replace(/[^a-zA-Z0-9]/g, '');

            const categoryEl = document.createElement('div');
            categoryEl.className = 'specific-upload-category';
            const existingImages = currentTheme.imageCategoryData?.[cardName] || [];

            categoryEl.innerHTML = `
                <p><strong>${cardName}</strong></p>
                <label for="file-input-${safeCardNameId}" class="file-label">Add Images (Max 5)</label>
                <small style="display: block; margin-top: 5px; color: var(--text-color); font-size: 0.9rem;">Select 1-5 images. One chosen randomly.</small>
                <input type="file" id="file-input-${safeCardNameId}" data-card-name="${cardName}" multiple accept="image/*" class="hidden">
                <div class="image-preview-area" id="preview-${safeCardNameId}">
                    ${existingImages.map(imgData => imgData ? `<img src="${imgData}" class="img-thumbnail" alt="Preview">` : '').join('')}
                </div>
                <hr style="margin-top: 1rem; border-color: var(--light-bg);">
            `;
            container.appendChild(categoryEl);

            const label = categoryEl.querySelector(`label[for="file-input-${safeCardNameId}"]`);
            const input = categoryEl.querySelector(`#file-input-${safeCardNameId}`);
            if (label && input) {
                 label.onclick = () => input.click();

                input.addEventListener('change', (e) => {
                    const files = Array.from(e.target.files);
                    const targetCardName = e.target.dataset.cardName;
                    if (!targetCardName || files.length === 0) return;
                    if (files.length > 5) {
                        alert("You can only select up to 5 images per event.");
                        e.target.value = null; return;
                    }
                    currentTheme.images[targetCardName] = files;

                    const previewContainer = document.getElementById(`preview-${safeCardNameId}`);
                    if (previewContainer) {
                        previewContainer.innerHTML = '';
                        files.forEach(file => {
                             if (!file.type.startsWith('image/')) return;
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                const img = document.createElement('img');
                                img.src = event.target.result;
                                img.className = 'img-thumbnail';
                                img.alt = "Image preview";
                                previewContainer.appendChild(img);
                            };
                            reader.onerror = () => console.error("Error reading image file for preview.");
                            reader.readAsDataURL(file);
                        });
                    }
                });
            }
        });


        document.querySelectorAll('input.sfx-input').forEach(input => {
            const label = input.previousElementSibling;
            const sfxName = input.dataset.sfxName;

            if (label) label.onclick = () => input.click();

            if (label) {
                 label.textContent = 'Choose Sound';
                 label.style.borderColor = 'var(--accent-color)';
                 label.style.color = 'var(--text-color)';
            }

            if (currentTheme.soundData && currentTheme.soundData[sfxName]) {
                 if (label) {
                      label.textContent = `✅ Using saved sound`;
                      label.style.borderColor = 'var(--rank1-color)';
                      label.style.color = 'var(--rank1-color)';
                 }
            }

            input.addEventListener('change', (e) => {
                const targetSfxName = e.target.dataset.sfxName;
                const file = e.target.files[0];
                if (!targetSfxName || !file) return;

                currentTheme.soundFiles[targetSfxName] = file;

                const changedLabel = e.target.previousElementSibling;
                if (changedLabel) {
                    changedLabel.textContent = `✅ ${file.name}`;
                    changedLabel.style.borderColor = 'var(--rank1-color)';
                    changedLabel.style.color = 'var(--rank1-color)';
                }
            });
        });

         const bgInput = document.getElementById('image-input');
         const musicInputEl = document.getElementById('music-input');
         const bgLabel = document.querySelector('label[for="image-input"]');
         const musicLabel = document.querySelector('label[for="music-input"]');

         if(bgLabel && bgInput) bgLabel.onclick = () => bgInput.click();
         if(musicLabel && musicInputEl) musicLabel.onclick = () => musicInputEl.click();

         if(bgInput) bgInput.addEventListener('change', (e) => {
             const file = e.target.files[0];
             if(!file) { if(bgLabel) bgLabel.textContent = 'Choose Background'; return; }
             if(bgLabel) bgLabel.textContent = `✅ ${file.name}`;
             currentTheme.backgroundImageFile = file;
             const tempUrl = URL.createObjectURL(file);
             const img = new Image();
             img.onload = () => {
                if (!colorThief) {
                     console.warn("ColorThief not loaded. Using default colors.");
                     currentTheme.palette = [...DEFAULT_COLORS];
                     URL.revokeObjectURL(tempUrl);
                     return;
                 }
                 try {
                     const palette = colorThief.getPalette(img, 8); // Get 8 colors
                     currentTheme.palette = palette.map(rgb => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
                     console.log("Palette generated:", currentTheme.palette);
                     alert("Background image loaded and color palette generated!");
                 } catch (err) {
                     console.error("Error generating palette:", err);
                     currentTheme.palette = [...DEFAULT_COLORS];
                     alert("Error generating palette. Using default colors.");
                 }
                 URL.revokeObjectURL(tempUrl);
             };
             img.onerror = () => {
                 console.error("Error loading image for palette generation.");
                 alert("Error loading image. Using default colors.");
                 currentTheme.palette = [...DEFAULT_COLORS];
                 URL.revokeObjectURL(tempUrl);
             };
             img.src = tempUrl;
        });

         if(musicInputEl) musicInputEl.addEventListener('change', (e) => {
            const file = e.target.files[0];
             if(!file) { if(musicLabel) musicLabel.textContent = 'Choose Music'; return; }
             if(musicLabel) musicLabel.textContent = `✅ ${file.name}`;
            currentTheme.backgroundMusicFile = file;
        });

         if(currentTheme.backgroundImageData && bgLabel) bgLabel.textContent = '✅ Using saved background';
         if(currentTheme.backgroundMusicData && musicLabel) musicLabel.textContent = '✅ Using saved music';
    }


    function navigateTo(page) {
        const pages = {
            [CONSTANTS.PAGES.SETUP]: setupContainer,
            [CONSTANTS.PAGES.CREATOR]: themeCreatorContainer,
            [CONSTANTS.PAGES.GAME]: gameContainer,
            [CONSTANTS.PAGES.PROFILE]: profileContainer,
            [CONSTANTS.PAGES.DUNGEON]: dungeonContainer
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

        const isCreator = page === CONSTANTS.PAGES.CREATOR;
        const isSetup = page === CONSTANTS.PAGES.SETUP;
        const isGameOrDungeon = page === CONSTANTS.PAGES.GAME || page === CONSTANTS.PAGES.DUNGEON;
        const isProfile = page === CONSTANTS.PAGES.PROFILE;

        creatorNavBtn.classList.toggle('hidden', !isSetup);
        mainMenuNavBtn.classList.toggle('hidden', isSetup || isProfile);
        changeProfileBtn.classList.toggle('hidden', !isSetup);

        if (isGameOrDungeon) { mainMenuNavBtn.textContent = "End Game"; }
        else if (isCreator) { mainMenuNavBtn.textContent = "Main Menu"; }
        else { mainMenuNavBtn.textContent = "Main Menu"; }


        if (isSetup) {
            loadThemes(); loadHighScores('profile');
            if (activeProfile?.name) classHsBtn.textContent = `${activeProfile.name}'s Ranking`;
            else classHsBtn.textContent = 'Class Ranking';
        }
        if (isCreator) { renderThemeCreatorInputs(); }
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
     function openEmojiSelector() {
        const emojiModal = document.getElementById('emoji-select-modal');
        const emojiGrid = emojiModal.querySelector('#emoji-grid');
        if (!emojiGrid) return;
        emojiGrid.innerHTML = '';

        EMOJI_CHOICE_LIST.forEach(emoji => {
            const emojiBtn = document.createElement('button');
            emojiBtn.textContent = emoji;
            emojiBtn.className = 'emoji-choice';
            if (currentTheme.emojis && currentTheme.emojis.includes(emoji)) {
                emojiBtn.classList.add('selected');
            }
            emojiBtn.onclick = () => {
                const selectedCount = emojiGrid.querySelectorAll('.selected').length;
                if (!emojiBtn.classList.contains('selected') && selectedCount >= 8) {
                    alert("You can select a maximum of 8 emojis.");
                    return;
                }
                emojiBtn.classList.toggle('selected');
            };
            emojiGrid.appendChild(emojiBtn);
        });
        showModal(emojiModal);
    }

    // Header Buttons
    changeProfileBtn.addEventListener('click', showProfileScreen);
    creatorNavBtn.addEventListener('click', () => navigateTo(CONSTANTS.PAGES.CREATOR));
    mainMenuNavBtn.addEventListener('click', () => {
        if (dungeonContainer && !dungeonContainer.classList.contains('hidden')) {
             if (confirm("End game and return to menu?")) exitDungeon();
        } else if (gameContainer && !gameContainer.classList.contains('hidden')) {
             if (confirm("End current game and return to menu?")) resetToMenu();
        } else {
             navigateTo(CONSTANTS.PAGES.SETUP);
        }
    });

    // Profile Screen Buttons
    document.getElementById('add-profile-btn').addEventListener('click', handleAddProfile);

    // Setup Screen Buttons
    defaultStartBtn.addEventListener('click', () => {
        activeGameTheme = { palette: DEFAULT_COLORS, images: {}, emojis: [], emojiMode: 'overlay', sounds: {} };
        showModal(gameSettingsModal);
    });
    importThemeBtn.addEventListener('click', () => themeImporter.click());
    themeImporter.addEventListener('change', handleImportTheme);
    classHsBtn.addEventListener('click', () => loadHighScores('profile'));
    globalHsBtn.addEventListener('click', () => loadHighScores('global'));

    // Theme Creator Buttons
    startWithCustomBtn.addEventListener('click', () => {
        console.log("Starting with custom theme...");
        activeGameTheme = {
            name: "Custom Theme",
            palette: currentTheme.palette.length > 0 ? currentTheme.palette : DEFAULT_COLORS,
            emojis: currentTheme.emojis,
            emojiMode: document.querySelector('input[name="emoji-mode"]:checked')?.value || 'overlay',
            backgroundImageData: currentTheme.backgroundImageData,
            backgroundMusicData: currentTheme.backgroundMusicData,
            images: { ...currentTheme.imageCategoryData },
            sounds: { ...currentTheme.soundData }
        };
        
        if (currentTheme.backgroundImageFile || currentTheme.backgroundMusicFile || Object.keys(currentTheme.images).length > 0 || Object.keys(currentTheme.soundFiles).length > 0) {
             alert("Please save your theme first before playing with it!");
             return;
        }

        if (!activeGameTheme.backgroundImageData) {
            alert("A background image is required to play.");
            return;
        }

        showModal(gameSettingsModal);
    });
    saveCustomThemeBtn.addEventListener('click', handleSaveCurrentTheme);
    document.getElementById('select-emojis-btn').addEventListener('click', openEmojiSelector);
    document.getElementById('confirm-emojis-btn').addEventListener('click', () => {
        const emojiModal = document.getElementById('emoji-select-modal');
        const selectedBtns = emojiModal.querySelectorAll('#emoji-grid .selected');
        currentTheme.emojis = Array.from(selectedBtns).map(btn => btn.textContent);
        document.getElementById('emoji-display-options').classList.toggle('hidden', currentTheme.emojis.length === 0);
        hideModal(emojiModal);
        alert(`${currentTheme.emojis.length} emojis selected!`);
    });

    // Game Screen Buttons
    gameMenuBtn.addEventListener('click', () => {
         if (confirm("Are you sure you want to end the current game and return to the menu?")) {
             resetToMenu();
         }
    });

    // Modal Buttons
    confirmSettingsBtn.addEventListener('click', () => {
        const selectedMode = document.querySelector('input[name="game-mode-modal"]:checked').value;
        const selectedLength = document.querySelector('input[name="game-length-modal"]:checked').value;
        const selectedTeams = teamCountSelectModal.value;
        const selectedDifficulty = document.querySelector('input[name="math-difficulty"]:checked').value;

        gameState.gameMode = selectedMode;
        gameState.gameLength = parseInt(selectedLength, 10);
        gameState.mathDifficulty = parseInt(selectedDifficulty, 10);
        const totalTeams = parseInt(selectedTeams, 10);

        hideModal(gameSettingsModal);
        initiateGameSetup(totalTeams);
    });
    cancelSettingsBtn.addEventListener('click', () => hideModal(gameSettingsModal));
    gameOverMenuBtn.addEventListener('click', resetToMenu);

    // Fullscreen Modal Default Click
    fullscreenEvent.addEventListener('click', () => {
        hideModal(fullscreenEvent);
        setTimeout(endTurn, 300);
    });

    // --- 9. INITIALIZE THE APP ---
    initDB();


    // --- 10. EXPOSE FUNCTIONS/VARS TO GLOBAL SCOPE (for dungeon.js) ---
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
    
    window.handleKeepFriendsCloseSelection = (clickedSquareElement) => {
        if (typeof window.handleKeepFriendsCloseSelection_fromDungeon === 'function') {
            window.handleKeepFriendsCloseSelection_fromDungeon(clickedSquareElement);
        } else {
            console.error("Dungeon function handleKeepFriendsCloseSelection_fromDungeon not found on window!");
        }
    };
    
    window.shuffledDeck = shuffledDeck;

}); // End DOMContentLoaded