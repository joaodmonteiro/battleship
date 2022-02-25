import { createGameboards, updateDOM } from './DOM.js';
import { Gameboard } from './Gameboard.js';

// Display the boards
createGameboards();

// Create gameboards
const pcGameboard = Gameboard('pc');
const userGameboard = Gameboard('user');

pcGameboard.placeShipsRandom();
userGameboard.placeShipsRandom();

// Show empty cells



updateDOM(userGameboard, pcGameboard);


// Let user move his ships

// > Click START GAME

let turn = 'user';

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if(cell.id.slice(0, 2) == 'pc') {
            if(turn == 'user') {
                let hit = pcGameboard.getAttacked(getCellFromID(cell.id)); 
    
                if(hit) {
                    updateDOM(userGameboard, pcGameboard);
                    turn = 'pc';
                    // PC PLAY
                    pcPlay();
                }
            }
            console.log('success hits:');
            console.log(pcGameboard.successHits);
            console.log('verified empty');
            console.log(pcGameboard.verifiedEmpty);
        }
    });
});

function pcPlay() {
    turn = 'user';
}

function getCellFromID(id) {
    const x = id.slice(-2, -1);
    const y = id.slice(-1);
    return [x, y];
}
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
