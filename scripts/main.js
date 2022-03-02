import { createGameboards, updateDOM } from './DOM.js';
import { Gameboard } from './Gameboard.js';

let gameStarted = false;

// Display the boards
createGameboards();

// Create gameboards
const pcGameboard = Gameboard('pc');
const userGameboard = Gameboard('user');

pcGameboard.placeShipsRandom();
userGameboard.placeShipsRandom();

// Update gamboards
updateDOM(userGameboard, pcGameboard);

const startButton = document.querySelector('.start-game');
const cells = document.querySelectorAll('.cell');

// Let user move his ships around
let dragged;

if(!gameStarted) {
    let shipCell;
    cells.forEach(cell => {
        cell.addEventListener('drag', event => {
    
        }, false);
    
        cell.addEventListener('dragstart', event => {
            dragged = event.target;
            let draggedCell = getCellFromID(cell.id);

            shipCell = userGameboard.shipCells.find( cell => cell.shipCell[0] == draggedCell[0] && cell.shipCell[1] == draggedCell[1]);

            // let allShipCells = userGameboard.shipCells.filter( c => c.ship == shipCell.ship);

            // let allElements = [];
            // allShipCells.forEach( (a, index) => {
            //     event.dataTransfer.setData(document.querySelector(`#user-cell-${a.shipCell[0]}${a.shipCell[1]}`), index);
            // });
            
            console.log(shipCell);
        }, false);

        cell.addEventListener('dragenter', event => {
            let newPosition = getCellFromID(event.target.id);

            console.log(`length: ${shipCell.ship.length}, position: ${newPosition}, orientation: ${shipCell.orient}`);

            if(userGameboard.isSpaceAvailable(shipCell.ship.length, newPosition, shipCell.orient)) {
                console.log('yes');
            } else {
                console.log('no');
            }
            
        }, false);

        cell.addEventListener('click', event => {

            let clickedCell = getCellFromID(cell.id);

            console.log(clickedCell);
            console.log(userGameboard.isSpaceAvailable(1, clickedCell, 1));

        })
    });
}

// > Click START GAME
startButton.addEventListener('click', () => {
    startGame();
    gameStarted = true;
});

let turn = 'user';

function startGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if(cell.id.slice(0, 2) == 'pc') {
                if(turn == 'user') {
                    let attackedCell = getCellFromID(cell.id);
    
                    if(!pcGameboard.hasCellBeenAttacked(attackedCell)) {
                        let hit = pcGameboard.getAttacked(getCellFromID(cell.id)); 
    
                        if(pcGameboard.checkIfAllShipsSunk()) {
                            updateDOM(userGameboard, pcGameboard);
                            showWinner('You');
                        }
    
                        if(!hit) {
                            turn = 'pc';
                            pcPlay();    
                        }   
                    }   
                }
                updateDOM(userGameboard, pcGameboard);
            }  
        });
    });
}



function pcPlay() {
    // Pick random cell from available list to attack 
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
    
    let cellToAttack = [randomX, randomY];

    if(!userGameboard.hasCellBeenAttacked(cellToAttack)) {
        let hit = userGameboard.getAttacked([randomX, randomY]);

        if(userGameboard.checkIfAllShipsSunk()) {
            updateDOM(userGameboard, pcGameboard);
            showWinner('PC');
        }

       if(!hit) {
           turn = 'user';
       }
       else {
            setTimeout( () => {
                pcPlay();
            }, 1000);
       }
    } else {
        pcPlay();
    }
    
    updateDOM(userGameboard, pcGameboard);

}

function getCellFromID(id) {
    const x = id.slice(-2, -1);
    const y = id.slice(-1);
    return [+x, +y];
}

function showWinner(winner) {
    alert('The winner is ' + winner);
}

