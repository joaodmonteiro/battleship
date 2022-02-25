import { Ship } from './Ship.js';
// const Ship = require('./Ship');

const Gameboard = (user) => {
    // contain the location of the ships
    let ships = []; // array of Ship objects and their respective positions

    // empty cells
    let emptyCells = [];

    // verified empty cells 
    let verifiedEmpty = [];

    // successfull hits
    let successHits = [];

    // Missed shots
    let missedShots = [];

    for( let i=0; i < 10; i++) { 
        for( let j=0; j < 10; j++) {
            const c = [+i, +j];
            emptyCells.push(c); 
        }
    }

    const placeShipsRandom = () => {
        // 4 cells
        placeShipRandom(4);
        // 3 cells
        placeShipRandom(3);
        placeShipRandom(3);
        // // 2 cells
        placeShipRandom(2);
        placeShipRandom(2);
        placeShipRandom(2);
        // // 1 cell
        placeShipRandom(1);
        placeShipRandom(1);
        placeShipRandom(1);
        placeShipRandom(1);
        
        console.log(ships);
    }

    const placeShipRandom = (length) => {
        let cell = getRandomCell();
        let orientation = getRandomOrientation(); // 0 - horizontal, 1 - vertical

        if(isSpaceAvailable(length, cell, orientation)) {
            placeShip(length, cell, orientation);
        }  
        else {
            placeShipRandom(length);
        }
    }

    const isSpaceAvailable = (length, cell, orientation) => {
        // Check the cells
        if(orientation == 0) { // Horizontal
            if((cell[1] + length - 1) > 9) {
                return false;
            }
            for(let i = cell[1] - 1 ; i <= cell[1] + length ; i++) {
                if(i < 0 || i > 9) {
                    continue;
                }
                for(let j = cell[0] - 1 ; j <= cell[0] + 1 ; j++) { 
                    // if outside the borders -> continue
                    if(j < 0 || j > 9) {
                        continue;
                    }
                    // if cell not available return false
                    if(!isCellAvailable([j, i])) {
                        return false
                    }
                } 
            }

        } else { // Vertical
            if((cell[0] + length - 1) > 9) {
                return false;
            }
            for(let i = cell[1] - 1 ; i <= cell[1] + 1 ; i++) {
                if(i < 0 || i > 9) {
                    continue;
                }
                for(let j = cell[0] - 1 ; j <= cell[0] + length ; j++) { 
                    // if outside the borders -> continue
                    if(j < 0 || j > 9) {
                        continue;
                    }
                    // if cell not available return false
                    if(!isCellAvailable([j, i])) {
                        return false;
                    }
                } 
            }
        }
        return true;
    }

    const isCellAvailable = (place) => {
        if(isCellInArray(place, emptyCells)) {
            return true;
        }
        else
            return false;
    }

    const placeShip = (length, cell, orient) => {
        const ship = Ship(length);

        // ------Remove cells from emptycells array -------
        // Horizontal ----> orientation = 0
        if(orient == 0) {
            for(let i = cell[1] ; i < cell[1] + length ; i++) {
                let shipCell = [cell[0], i];
                occupyCell(shipCell[0], shipCell[1]);
                ships.push({ship, shipCell, orient});
            }
        } else { // Vertical ------> orientation = 1
            for(let i = cell[0] ; i < cell[0] + length ; i++) {
                let shipCell = [i, cell[1]];
                occupyCell(shipCell[0], shipCell[1]);
                ships.push({ship, shipCell, orient});
            }
        }
    }

    const occupyCell = (x,y) => {
        emptyCells.splice(emptyCells.findIndex(c => c[0] == x && c[1] == y), 1);
    }

    // receive attacks from opponent and register the location    
    const getAttacked = (cell) => {
        
        // If attacked cell hits a ship
        if(!successHits.some(c => c[0] == cell[0] && c[1] == cell[1]) && !verifiedEmpty.some(c => c[0] == cell[0] && c[1] == cell[1])) {
            const cellHit = ships.find( obj => obj.shipCell[0] == cell[0] && obj.shipCell[1] == cell[1]);

            if(cellHit) {
                cellHit.ship.getHit();
                successHits.push(cell);
                console.log('sunk: ' + cellHit.ship.isSunk());
                
            } else {
                verifiedEmpty.push(cell);
            }
            return true;
        }
        else {
            return false;
        }

        // if hits ship (if ships[] contains cell)
            // call Ship.getHit with the position of cell of the attack
            // checks surrounding cells for verified empty cells
        // if it misses
            //register that cell as verified empty 
    }

    return { ships, verifiedEmpty, successHits, emptyCells, placeShipsRandom, placeShipRandom, isSpaceAvailable, getAttacked }
};

function isCellInArray(cell, array) {
    if(array.some( arrayCell => arrayCell[0] == cell[0] && arrayCell[1] == cell[1] )) {
        return true;
    } else {
        return false;
    }
}

function getRandomCell() {
    return [getRandomNumber(),getRandomNumber()];
}

function getRandomNumber() {
    return Math.floor(Math.random()*10);
}

function getRandomOrientation() {
    return Math.floor(Math.random() * 2);
}

// module.exports = Gameboard;

export { Gameboard };