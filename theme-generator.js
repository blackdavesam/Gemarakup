document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINE CARD NAME-PARTS ---
    // This maps the full card name to the filename part you want.
    const CARD_FILENAME_MAP = {
        "+75 Points (JACKPOT!)": "plus_seventyfive",
        "+50 Points (Big Bonus!)": "plus_fifty",
        "-50 Points (Disaster!)": "minus_fifty",
        "+5 Points": "plus_five",
        "+10 Points": "plus_ten",
        "+15 Points": "plus_fifteen",
        "+20 Points": "plus_twenty",
        "-5 Points": "minus_five",
        "-10 Points": "minus_ten",
        "-20 Points": "minus_twenty",
        "Double Your Points!": "double_points",
        "Lose Half Your Points!": "half_points",
        "Take 10 Points!": "take_ten",
        "Give 10 Points!": "give_ten",
        "Take 5 Points!": "take_five",
        "Give 5 Points!": "give_five"
    };
    
    const ALL_CARD_NAMES = Object.keys(CARD_FILENAME_MAP);
    
    // ALL_SOUND_NAMES constant removed

    // --- 2. GET UI ELEMENTS ---
    const generateBtn = document.getElementById('generate-theme-btn');
    const outputContainer = document.getElementById('output-container');
    const outputCode = document.getElementById('output-code');

    // --- 3. GENERATE THE THEME CODE ---
    function generateCode() {
        // Get all values from the form
        const themeId = document.getElementById('theme-id').value || 'my_theme';
        const themeName = document.getElementById('theme-name').value || 'My New Theme';
        const themeDesc = document.getElementById('theme-desc').value || 'A new theme.';
        const baseName = document.getElementById('base-name').value || themeId;
        const imgCount = parseInt(document.getElementById('image-count').value, 10) || 6;
        const imgExt = document.getElementById('image-ext').value.replace('.', '') || 'jpeg';
        // soundExt variable removed

        // Define the main paths
        const imgFolderPath = `themes/${themeId}/images/`;
        // soundFolderPath removed

        let themeObject = {
            name: themeName,
            description: themeDesc,
            backgroundImageData: `themes/${themeId}/background.${imgExt}`,
            backgroundMusicData: `themes/${themeId}/music.mp3`, // Music is still per-theme
            palette: [],
            emojis: ['❓', '❔'],
            emojiMode: 'overlay',
            images: {},
            // 'sounds' object is no longer added to the theme
        };

        // Build the 'images' object
        ALL_CARD_NAMES.forEach(cardName => {
            const fileNamePart = CARD_FILENAME_MAP[cardName];
            const imagePaths = [];
            
            // Loop to create the 6 (or whatever user specified) file names
            for (let i = 1; i <= imgCount; i++) {
                // Creates a number like "00001", "00002"
                const numberStr = String(i).padStart(5, '0'); 
                const fullPath = `${imgFolderPath}${baseName}_${fileNamePart}${numberStr}.${imgExt}`;
                imagePaths.push(fullPath);
            }
            themeObject.images[cardName] = imagePaths;
        });

        // "Build the 'sounds' object" loop has been removed

        // --- Format the output ---
        const prettyString = JSON.stringify(themeObject, null, 4);
        const outputString = `"${themeId}": ${prettyString},`;

        outputCode.value = outputString;
        outputContainer.classList.remove('hidden');
    }

    // --- 4. INITIALIZE ---
    generateBtn.addEventListener('click', generateCode);

    // Auto-fill base name from theme-id
    document.getElementById('theme-id').addEventListener('input', (e) => {
        document.getElementById('base-name').value = e.target.value;
    });

});