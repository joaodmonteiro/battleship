import { createGameboards } from './DOM.js';
import { Gameboard } from './Gameboard.js';

createGameboards();

const userGameboard = Gameboard();

userGameboard.placeShipsRandom();

// generate random PC ship layout
// Let user place his ships
// Click start
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Start Game Loop
        // User Turn
            // Place bomb on a cell from available cells
            // Check whether it hit a ship
                // if Yes  
                    // Call getHit() to that ship
                    // Mark cell as discovered
                    // Check for surrounding verified empty cells
                        // Mark them as discovered
                    // Change DOM stuff
                    // Check If PC ships are all sunk
                        // if YES - EXIT Game Loop   - - - - - - - - 
                        // if NO - continue
                // if NO
                    // Mark that cell as 'verified empty'
                    // Change DOM stuff
        // PC turn
            // Choose random cell to attack from available cells
            // Check whether it hit a ship
                // if Yes  
                    // Call getHit() to that ship
                    // Mark cell as discovered
                    // Check for surrounding verified empty cells
                        // Mark them as discovered
                    // Change DOM stuff
                    // Check If PC ships are all sunk
                        // if YES - EXIT Game Loop   - - - - - - - - 
                        // if NO - continue
                // if NO
                    // Mark that cell as 'verified empty'
                    // Change DOM stuff
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Show Winner 
