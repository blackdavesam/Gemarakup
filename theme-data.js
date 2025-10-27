// This file works just like your baseball game's team-data.js
// It holds a "manifest" of all your game themes.

// 1. Create a folder for your theme (e.g., "themes/my_cool_theme").
// 2. Put your images and sounds in it.
// 3. Add a new entry to the `themes` object below, pointing to your files.

const themes = {

    // The default theme that uses the classic colors and no images/sounds
    "default": {
        name: "Gemarakup Classic",
        description: "A balanced set of colors and events for a classic game.",
        // We use the default colors by leaving the palette empty
        palette: [], 
        // We leave these empty or null to use the default game logic
        backgroundImageData: null,
        backgroundMusicData: null,
        images: {}, // No custom images
        sounds: {}, // No custom sounds
        emojis: [],
        emojiMode: 'overlay'
    },

    "football": { // Theme ID
        name: "Gemarakup Football", // Display Name
        description: "", // No description for now

        // Assuming background is directly in themes/Football/
        backgroundImageData: "themes/Football/Football_Background.jpeg", 
        backgroundMusicData: "themes/Football/Football_music.mp3", 

        palette: [], // Leave empty to auto-generate from background

        emojis: ['🏈', '🏆', '🏟️', '📣', '⏱️', '👟', '🧤', '⚡'], // Example emojis
        emojiMode: 'overlay',

        images: {
            // Jackpot
            "+75 Points (JACKPOT!)": [
                "themes/Football/+75/football_plus_seventyfive00001.jpg",
                "themes/Football/+75/football_plus_seventyfive00002.jpg"
            ],
            "+50 Points (Big Bonus!)": [
                "themes/Football/+50/football_plus_fifty00001.jpg",
                "themes/Football/+50/football_plus_fifty00002.jpg",
                "themes/Football/+50/football_plus_fifty00003.jpg",
                "themes/Football/+50/football_plus_fifty00004.jpg",
                "themes/Football/+50/football_plus_fifty00005.jpg"
            ],
            "-50 Points (Disaster!)": [
                 "themes/Football/-50/football_minus_fifty00001.jpeg",
                 "themes/Football/-50/football_minus_fifty00002.jpeg",
                 "themes/Football/-50/football_minus_fifty00003.jpeg",
                 "themes/Football/-50/football_minus_fifty00004.jpeg",
                 "themes/Football/-50/football_minus_fifty00005.jpeg",
                 "themes/Football/-50/football_minus_fifty00006.jpeg",
                 "themes/Football/-50/football_minus_fifty00007.jpeg",
                 "themes/Football/-50/football_minus_fifty00008.jpeg"
            ],
            
            // Standard Points
            "+20 Points": [
                "themes/Football/+20/football_plus_twenty00001.jpg",
                "themes/Football/+20/football_plus_twenty00002.jpg",
                "themes/Football/+20/football_plus_twenty00003.jpg"
            ],
            "+15 Points": [
                "themes/Football/+15/football_plus_fifteen00001.jpeg",
                "themes/Football/+15/football_plus_fifteen00002.jpeg",
                "themes/Football/+15/football_plus_fifteen00003.jpeg",
                "themes/Football/+15/football_plus_fifteen00004.jpeg"
            ],
            "+10 Points": [
                 "themes/Football/+10/football_plus_ten00001.jpeg",
                 "themes/Football/+10/football_plus_ten00002.jpeg",
                 "themes/Football/+10/football_plus_ten00003.jpeg",
                 "themes/Football/+10/football_plus_ten00004.jpeg"
            ],
            "+5 Points": [
                 "themes/Football/+5/football_plus_five00001.jpeg",
                 "themes/Football/+5/football_plus_five00002.jpeg",
                 "themes/Football/+5/football_plus_five00003.jpeg",
                 "themes/Football/+5/football_plus_five00004.jpeg",
                 "themes/Football/+5/football_plus_five00005.jpeg",
                 "themes/Football/+5/football_plus_five00006.jpeg",
                 "themes/Football/+5/football_plus_five00007.jpeg",
                 "themes/Football/+5/football_plus_five00008.jpeg"
            ],
            "-5 Points": [
                "themes/Football/-5/football_minus_five00001.jpeg",
                "themes/Football/-5/football_minus_five00002.jpeg",
                "themes/Football/-5/football_minus_five00003.jpeg",
                "themes/Football/-5/football_minus_five00004.jpeg",
                "themes/Football/-5/football_minus_five00005.jpeg",
                "themes/Football/-5/football_minus_five00006.jpeg"
            ],
            "-10 Points": [
                 "themes/Football/-10/football_minus_ten00001.jpeg",
                 "themes/Football/-10/football_minus_ten00002.jpeg",
                 "themes/Football/-10/football_minus_ten00003.jpeg",
                 "themes/Football/-10/football_minus_ten00004.jpeg",
                 "themes/Football/-10/football_minus_ten00005.jpeg"
            ],
            "-20 Points": [
                "themes/Football/-20/football_minus_twenty00001.jpeg",
                "themes/Football/-20/football_minus_twenty00002.jpeg",
                "themes/Football/-20/football_minus_twenty00003.jpeg",
                "themes/Football/-20/football_minus_twenty00004.jpeg",
                "themes/Football/-20/football_minus_twenty00005.jpeg",
                "themes/Football/-20/football_minus_twenty00006.jpeg"
            ],
            
            // Special
            "Double Your Points!": [
                "themes/Football/Double Points/football_doublepoints00001.jpeg",
                "themes/Football/Double Points/football_doublepoints00002.jpeg",
                "themes/Football/Double Points/football_doublepoints00003.jpeg",
                "themes/Football/Double Points/football_doublepoints00004.jpeg"
            ],
            "Lose Half Your Points!": [
                "themes/Football/Half Points/football_halfpoints00001.jpeg",
                "themes/Football/Half Points/football_halfpoints00002.jpeg",
                "themes/Football/Half Points/football_halfpoints00003.jpeg",
                "themes/Football/Half Points/football_halfpoints00004.jpeg"
            ],
            
            // Transfers - PLEASE PROVIDE FILENAMES AND FOLDER NAMES
            "Take 10 Points!": [/* "themes/Football/Take_10/your_image.png", ... */],
            "Take 5 Points!": [/* "themes/Football/Take_5/your_image.png", ... */],
            "Give 10 Points!": [/* "themes/Football/Give_10/your_image.png", ... */],
            "Give 5 Points!": [/* "themes/Football/Give_5/your_image.png", ... */]
            
            // Dungeon - REMOVED
            // "Secret Dungeon Entrance!": [/* "themes/Football/Dungeon/your_image.gif", ... */]
        },
        
        // --- Paths to your sounds (Optional) ---
        // PLEASE PROVIDE FILENAMES if you have them
        sounds: {
            lowGain: null, // "themes/Football/your_sound.wav"
            highGain: null,
            lowLoss: null,
            highLoss: null,
            special: null,
            gameOver: null
        }
    } // <-- Add a comma here if you add another theme after this one}

    // Add your next theme here:
    // "my_second_theme": { ... }

};