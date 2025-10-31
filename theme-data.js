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
        emojis: [],
        emojiMode: 'overlay'
        // 'sounds' object removed
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
            
            // Transfers
            "Take 10 Points!": [],
            "Take 5 Points!": [],
            "Give 10 Points!": [],
            "Give 5 Points!": []
        }
        // 'sounds' object removed
    }, 

   "chocolate": {
        "name": "My New Theme",
        "description": "A new theme.",
        "backgroundImageData": "themes/chocolate/background.jpeg",
        "backgroundMusicData": "themes/chocolate/music.mp3",
        "palette": [],
        "emojis": [
            "❓",
            "❔"
        ],
        "emojiMode": "overlay",
        "images": {
            "+75 Points (JACKPOT!)": [
                "themes/chocolate/images/chocolate_plus_seventyfive00001.jpeg",
                "themes/chocolate/images/chocolate_plus_seventyfive00002.jpeg",
                "themes/chocolate/images/chocolate_plus_seventyfive00003.jpeg",
                "themes/chocolate/images/chocolate_plus_seventyfive00004.jpeg",
                "themes/chocolate/images/chocolate_plus_seventyfive00005.jpeg",
                "themes/chocolate/images/chocolate_plus_seventyfive00006.jpeg"
            ],
            "+50 Points (Big Bonus!)": [
                "themes/chocolate/images/chocolate_plus_fifty00001.jpeg",
                "themes/chocolate/images/chocolate_plus_fifty00002.jpeg",
                "themes/chocolate/images/chocolate_plus_fifty00003.jpeg",
                "themes/chocolate/images/chocolate_plus_fifty00004.jpeg",
                "themes/chocolate/images/chocolate_plus_fifty00005.jpeg",
                "themes/chocolate/images/chocolate_plus_fifty00006.jpeg"
            ],
            "-50 Points (Disaster!)": [
                "themes/chocolate/images/chocolate_minus_fifty00001.jpeg",
                "themes/chocolate/images/chocolate_minus_fifty00002.jpeg",
                "themes/chocolate/images/chocolate_minus_fifty00003.jpeg",
                "themes/chocolate/images/chocolate_minus_fifty00004.jpeg",
                "themes/chocolate/images/chocolate_minus_fifty00005.jpeg",
                "themes/chocolate/images/chocolate_minus_fifty00006.jpeg"
            ],
            "+5 Points": [
                "themes/chocolate/images/chocolate_plus_five00001.jpeg",
                "themes/chocolate/images/chocolate_plus_five00002.jpeg",
                "themes/chocolate/images/chocolate_plus_five00003.jpeg",
                "themes/chocolate/images/chocolate_plus_five00004.jpeg",
                "themes/chocolate/images/chocolate_plus_five00005.jpeg",
                "themes/chocolate/images/chocolate_plus_five00006.jpeg"
            ],
            "+10 Points": [
                "themes/chocolate/images/chocolate_plus_ten00001.jpeg",
                "themes/chocolate/images/chocolate_plus_ten00002.jpeg",
                "themes/chocolate/images/chocolate_plus_ten00003.jpeg",
                "themes/chocolate/images/chocolate_plus_ten00004.jpeg",
                "themes/chocolate/images/chocolate_plus_ten00005.jpeg",
                "themes/chocolate/images/chocolate_plus_ten00006.jpeg"
            ],
            "+15 Points": [
                "themes/chocolate/images/chocolate_plus_fifteen00001.jpeg",
                "themes/chocolate/images/chocolate_plus_fifteen00002.jpeg",
                "themes/chocolate/images/chocolate_plus_fifteen00003.jpeg",
                "themes/chocolate/images/chocolate_plus_fifteen00004.jpeg",
                "themes/chocolate/images/chocolate_plus_fifteen00005.jpeg",
                "themes/chocolate/images/chocolate_plus_fifteen00006.jpeg"
            ],
            "+20 Points": [
                "themes/chocolate/images/chocolate_plus_twenty00001.jpeg",
                "themes/chocolate/images/chocolate_plus_twenty00002.jpeg",
                "themes/chocolate/images/chocolate_plus_twenty00003.jpeg",
                "themes/chocolate/images/chocolate_plus_twenty00004.jpeg",
                "themes/chocolate/images/chocolate_plus_twenty00005.jpeg",
                "themes/chocolate/images/chocolate_plus_twenty00006.jpeg"
            ],
            "-5 Points": [
                "themes/chocolate/images/chocolate_minus_five00001.jpeg",
                "themes/chocolate/images/chocolate_minus_five00002.jpeg",
                "themes/chocolate/images/chocolate_minus_five00003.jpeg",
                "themes/chocolate/images/chocolate_minus_five00004.jpeg",
                "themes/chocolate/images/chocolate_minus_five00005.jpeg",
                "themes/chocolate/images/chocolate_minus_five00006.jpeg"
            ],
            "-10 Points": [
                "themes/chocolate/images/chocolate_minus_ten00001.jpeg",
                "themes/chocolate/images/chocolate_minus_ten00002.jpeg",
                "themes/chocolate/images/chocolate_minus_ten00003.jpeg",
                "themes/chocolate/images/chocolate_minus_ten00004.jpeg", 
                "themes/chocolate/images/chocolate_minus_ten00005.jpeg",
                "themes/chocolate/images/chocolate_minus_ten00006.jpeg"
            ],
            "-20 Points": [
                "themes/chocolate/images/chocolate_minus_twenty00001.jpeg",
                "themes/chocolate/images/chocolate_minus_twenty00002.jpeg",
                "themes/chocolate/images/chocolate_minus_twenty00003.jpeg",
                "themes/chocolate/images/chocolate_minus_twenty00004.jpeg",
                "themes/chocolate/images/chocolate_minus_twenty00005.jpeg",
                "themes/chocolate/images/chocolate_minus_twenty00006.jpeg"
            ],
            "Double Your Points!": [
                "themes/chocolate/images/chocolate_double_points00001.jpeg",
                "themes/chocolate/images/chocolate_double_points00002.jpeg",
                "themes/chocolate/images/chocolate_double_points00003.jpeg",
                "themes/chocolate/images/chocolate_double_points00004.jpeg",
                "themes/chocolate/images/chocolate_double_points00005.jpeg",
                "themes/chocolate/images/chocolate_double_points00006.jpeg"
            ],
            "Lose Half Your Points!": [
                "themes/chocolate/images/chocolate_half_points00001.jpeg",
                "themes/chocolate/images/chocolate_half_points00002.jpeg",
                "themes/chocolate/images/chocolate_half_points00003.jpeg",
                "themes/chocolate/images/chocolate_half_points00004.jpeg",
                "themes/chocolate/images/chocolate_half_points00005.jpeg",
                "themes/chocolate/images/chocolate_half_points00006.jpeg"
            ],
            "Take 10 Points!": [
                "themes/chocolate/images/chocolate_take_ten00001.jpeg",
                "themes/chocolate/images/chocolate_take_ten00002.jpeg",
                "themes/chocolate/images/chocolate_take_ten00003.jpeg",
                "themes/chocolate/images/chocolate_take_ten00004.jpeg",
                "themes/chocolate/images/chocolate_take_ten00005.jpeg",
                "themes/chocolate/images/chocolate_take_ten00006.jpeg"
            ],
            "Give 10 Points!": [
                "themes/chocolate/images/chocolate_give_ten00001.jpeg",
                "themes/chocolate/images/chocolate_give_ten00002.jpeg",
                "themes/chocolate/images/chocolate_give_ten00003.jpeg",
                "themes/chocolate/images/chocolate_give_ten00004.jpeg",
                "themes/chocolate/images/chocolate_give_ten00005.jpeg",
                "themes/chocolate/images/chocolate_give_ten00006.jpeg"
            ],
            "Take 5 Points!": [
                "themes/chocolate/images/chocolate_take_five00001.jpeg",
                "themes/chocolate/images/chocolate_take_five00002.jpeg",
                "themes/chocolate/images/chocolate_take_five00003.jpeg",
                "themes/chocolate/images/chocolate_take_five00004.jpeg",
                "themes/chocolate/images/chocolate_take_five00005.jpeg",
                "themes/chocolate/images/chocolate_take_five00006.jpeg"
            ],
            "Give 5 Points!": [
                "themes/chocolate/images/chocolate_give_five00001.jpeg",
                "themes/chocolate/images/chocolate_give_five00002.jpeg",
                "themes/chocolate/images/chocolate_give_five00003.jpeg",
                "themes/chocolate/images/chocolate_give_five00004.jpeg",
                "themes/chocolate/images/chocolate_give_five00005.jpeg",
                "themes/chocolate/images/chocolate_give_five00006.jpeg"
            ]
        }
        // 'sounds' object removed
    }, 

   "pizza": {
        name: "Gemarakup Pizza Edition",
        description: "A delicious theme full of cheesy goodness.",

        backgroundImageData: "themes/pizza/pizza_background.jpeg",
        backgroundMusicData: "themes/pizza/pizza_music.mp3",

        palette: [], 

        emojis: ['🍕', '🤌', '🇮🇹', '👨‍🍳', '🧀', '🍅', '🌶️', '🍄'],
        emojiMode: 'overlay',

        images: {
            "+75 Points (JACKPOT!)": [ 
                "themes/Pizza/+75/pizza_plus_seventyfive00001.jpeg",
                "themes/Pizza/+75/pizza_plus_seventyfive00002.jpeg",
                "themes/Pizza/+75/pizza_plus_seventyfive00003.jpeg",
                "themes/Pizza/+75/pizza_plus_seventyfive00004.jpeg",
                "themes/Pizza/+75/pizza_plus_seventyfive00005.jpeg",
                "themes/Pizza/+75/pizza_plus_seventyfive00006.jpeg",
            ],
            "+50 Points (Big Bonus!)": [
                "themes/Pizza/+50/pizza_plus_fifty00001.jpeg",
                "themes/Pizza/+50/pizza_plus_fifty00002.jpeg",
                "themes/Pizza/+50/pizza_plus_fifty00003.jpeg",
                "themes/Pizza/+50/pizza_plus_fifty00004.jpeg",
                "themes/Pizza/+50/pizza_plus_fifty00005.jpeg",
            ],
            "-50 Points (Disaster!)": [
                 "themes/Pizza/-50/pizza_minus_fifty00001.jpeg",
                 "themes/Pizza/-50/pizza_minus_fifty00002.jpeg",
                 "themes/Pizza/-50/pizza_minus_fifty00003.jpeg",
                 "themes/Pizza/-50/pizza_minus_fifty00004.jpeg"
            ],
            "+20 Points": [ 
                "themes/Pizza/+20/pizza_plus_twenty00001.jpeg",
                "themes/Pizza/+20/pizza_plus_twenty00002.jpeg",
                "themes/Pizza/+20/pizza_plus_twenty00003.jpeg",
                "themes/Pizza/+20/pizza_plus_twenty00004.jpeg",
                "themes/Pizza/+20/pizza_plus_twenty00005.jpeg",
            ],
            "+15 Points": [ 
                "themes/Pizza/+15/pizza_plus_fifteen00001.jpeg",
                "themes/Pizza/+15/pizza_plus_fifteen00002.jpeg",
                "themes/Pizza/+15/pizza_plus_fifteen00003.jpeg",
                "themes/Pizza/+15/pizza_plus_fifteen00004.jpeg",
                "themes/Pizza/+15/pizza_plus_fifteen00005.jpeg",
            ],
            "+10 Points": [ 
                "themes/Pizza/+10/pizza_plus_ten00001.jpeg",
                 "themes/Pizza/+10/pizza_plus_ten00002.jpeg",
                 "themes/Pizza/+10/pizza_plus_ten00003.jpeg",
                 "themes/Pizza/+10/pizza_plus_ten00004.jpeg",
                 "themes/Pizza/+10/pizza_plus_ten00005.jpeg"
            ],
            "+5 Points": [
                 "themes/Pizza/+5/pizza_plus_five00001.jpeg",
                 "themes/Pizza/+5/pizza_plus_five00002.jpeg",
                 "themes/Pizza/+5/pizza_plus_five00003.jpeg",
                 "themes/Pizza/+5/pizza_plus_five00004.jpeg",
                 "themes/Pizza/+5/pizza_plus_five00005.jpeg"
            ],
            "-5 Points": [
                "themes/Pizza/-5/pizza_minus_five00001.jpeg",
                "themes/Pizza/-5/pizza_minus_five00002.jpeg",
                "themes/Pizza/-5/pizza_minus_five00003.jpeg"
            ],
            "-10 Points": [
                 "themes/Pizza/-10/pizza_minus_ten00001.jpeg",
                 "themes/Pizza/-10/pizza_minus_ten00002.jpeg",
                 "themes/Pizza/-10/pizza_minus_ten00003.jpeg"
            ],
            "-20 Points": [
             "themes/Pizza/-20/pizza_minus_twenty00001.jpeg",
             "themes/Pizza/-20/pizza_minus_twenty00002.jpeg",
            ],
            "Double Your Points!": [
                "themes/Pizza/double_points/pizza_double_points00001.jpeg",
                "themes/Pizza/double_points/pizza_double_points00002.jpeg",
                "themes/Pizza/double_points/pizza_double_points00003.jpeg",
                "themes/Pizza/double_points/pizza_double_points00004.jpeg",
                "themes/Pizza/double_points/pizza_double_points00005.jpeg",
            ],
            "Lose Half Your Points!": [
                "themes/Pizza/lose_half/pizza_halfpoints00001.jpeg",
                "themes/Pizza/lose_half/pizza_halfpoints00002.jpeg",
                "themes/Pizza/lose_half/pizza_halfpoints00003.jpeg",
                "themes/Pizza/lose_half/pizza_halfpoints00004.jpeg"
            ],
            "Take 10 Points!": [
                "themes/Pizza/take_10/pizza_take_ten00001.jpeg",
                "themes/Pizza/take_10/pizza_take_ten00002.jpeg",
                "themes/Pizza/take_10/pizza_take_ten00003.jpeg",
                "themes/Pizza/take_10/pizza_take_ten00004.jpeg"
            ],
            "Take 5 Points!": [
                "themes/Pizza/take_5/pizza_take_five00001.jpeg",
                "themes/Pizza/take_5/pizza_take_five00002.jpeg",
                "themes/Pizza/take_5/pizza_take_five00003.jpeg",
                "themes/Pizza/take_5/pizza_take_five00004.jpeg",
                "themes/Pizza/take_5/pizza_take_five00005.jpeg",
            ],
            "Give 10 Points!": [
                "themes/Pizza/give_10/pizza_give_ten00001.jpeg",
                "themes/Pizza/give_10/pizza_give_ten00002.jpeg",
                "themes/Pizza/give_10/pizza_give_ten00003.jpeg",
                "themes/Pizza/give_10/pizza_give_ten00004.jpeg",
                "themes/Pizza/give_10/pizza_give_ten00005.jpeg", 
            ],
            "Give 5 Points!": [
                "themes/Pizza/give_5/pizza_give_five00001.jpeg",
                "themes/Pizza/give_5/pizza_give_five00002.jpeg",
                "themes/Pizza/give_5/pizza_give_five00003.jpeg",
                "themes/Pizza/give_5/pizza_give_five00004.jpeg",
                "themes/Pizza/give_5/pizza_give_five00005.jpeg",
            ]
        }
        // 'sounds' object removed
    }, 

   "niagarafalls": {
        "name": "Niagara Falls Adventure",
        "description": "Join Leibish & Shulem on a wild Niagara Falls adventure!",
        "backgroundImageData": "themes/niagarafalls/background.jpeg",
        "backgroundMusicData": "themes/niagarafalls/music.mp3",
        "palette": [],
        "emojis": [
            "💦 ",
            "💧",
            "🌧️", 
            "🎡",
            "🍭",
        ],
        "emojiMode": "overlay",
        "images": {
            "+75 Points (JACKPOT!)": [
                "themes/niagarafalls/images/niagarafalls_plus_seventyfive00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_seventyfive00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_seventyfive00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_seventyfive00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_seventyfive00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_seventyfive00006.jpeg"
            ],
            "+50 Points (Big Bonus!)": [
                "themes/niagarafalls/images/niagarafalls_plus_fifty00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_fifty00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_fifty00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_fifty00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_fifty00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_fifty00006.jpeg"
            ],
            "-50 Points (Disaster!)": [
                "themes/niagarafalls/images/niagarafalls_minus_fifty00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_fifty00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_fifty00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_fifty00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_fifty00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_fifty00006.jpeg"
            ],
            "+5 Points": [
                "themes/niagarafalls/images/niagarafalls_plus_five00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_five00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_five00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_five00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_five00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_five00006.jpeg"
            ],
            "+10 Points": [
                "themes/niagarafalls/images/niagarafalls_plus_ten00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_ten00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_ten00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_ten00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_ten00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_ten00006.jpeg"
            ],
            "+15 Points": [
                "themes/niagarafalls/images/niagarafalls_plus_fifteen00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_fifteen00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_fifteen00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_fifteen00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_fifteen00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_fifteen00006.jpeg"
            ],
            "+20 Points": [
                "themes/niagarafalls/images/niagarafalls_plus_twenty00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_twenty00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_twenty00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_twenty00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_twenty00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_plus_twenty00006.jpeg"
            ],
            "-5 Points": [
                "themes/niagarafalls/images/niagarafalls_minus_five00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_five00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_five00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_five00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_five00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_five00006.jpeg"
            ],
            "-10 Points": [
                "themes/niagarafalls/images/niagarafalls_minus_ten00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_ten00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_ten00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_ten00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_ten00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_ten00006.jpeg"
            ],
            "-20 Points": [
                "themes/niagarafalls/images/niagarafalls_minus_twenty00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_twenty00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_twenty00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_twenty00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_twenty00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_minus_twenty00006.jpeg"
            ],
            "Double Your Points!": [
                "themes/niagarafalls/images/niagarafalls_double_points00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_double_points00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_double_points00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_double_points00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_double_points00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_double_points00006.jpeg"
            ],
            "Lose Half Your Points!": [
                "themes/niagarafalls/images/niagarafalls_half_points00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_half_points00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_half_points00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_half_points00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_half_points00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_half_points00006.jpeg"
            ],
            "Take 10 Points!": [
                "themes/niagarafalls/images/niagarafalls_take_ten00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_take_ten00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_take_ten00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_take_ten00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_take_ten00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_take_ten00006.jpeg"
            ],
            "Give 10 Points!": [
                "themes/niagarafalls/images/niagarafalls_give_ten00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_give_ten00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_give_ten00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_give_ten00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_give_ten00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_give_ten00006.jpeg"
            ],
            "Take 5 Points!": [
                "themes/niagarafalls/images/niagarafalls_take_five00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_take_five00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_take_five00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_take_five00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_take_five00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_take_five00006.jpeg"
            ],
            "Give 5 Points!": [
                "themes/niagarafalls/images/niagarafalls_give_five00001.jpeg",
                "themes/niagarafalls/images/niagarafalls_give_five00002.jpeg",
                "themes/niagarafalls/images/niagarafalls_give_five00003.jpeg",
                "themes/niagarafalls/images/niagarafalls_give_five00004.jpeg",
                "themes/niagarafalls/images/niagarafalls_give_five00005.jpeg",
                "themes/niagarafalls/images/niagarafalls_give_five00006.jpeg"
            ]
        }
        // 'sounds' object removed
    }

};