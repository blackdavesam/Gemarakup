// Import initializers
import { initDB } from './db.js';
import { attachStaticListeners } from './listeners.js';
// Correctly import the init function from your ACTUAL elements file
import { initElements } from './elements.js';
import { setColorThief } from './state.js';

// --- INITIALIZE THE APP ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('[DEBUG] DOM fully loaded. Initializing modules.');

    // 1. Initialize Elements FIRST
    // This populates all the 'el' variables with the live DOM nodes.
    initElements();
    
    // 2. Initialize ColorThief
    if (typeof ColorThief !== 'undefined') {
        // Call the imported setter function
        setColorThief(new ColorThief());
        console.log('[DEBUG] ColorThief instance created and set in state.');
    } else {
        console.error("ColorThief library not loaded!");
    }

    // 3. Attach Listeners
    // Now 'attachStaticListeners' will have valid 'el' objects to work with.
    attachStaticListeners();

    // 4. Initialize the database (which will trigger profile screen on success)
    initDB();
});