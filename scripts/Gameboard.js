import { Ship } from './Ship.js';
// const Ship = require('./Ship');

const Gameboard = (user) => {
    // contain the location of the ships
    let shipCells = []; // array of Ship objects and their respective positions

    let ships = [];

    let allShipsSunk = false;

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
        
        console.log(shipCells);
        console.log(emptyCells);
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
                console.log('out of bondaries horizontal');
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
                        console.log('' + j + i + ' not available');
                        return false;
                    }
                } 
            }

        } else { // Vertical
            if((cell[0] + length - 1) > 9) {
                console.log('out of bondaries vertical');
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
                        console.log('' + j + i + ' not available');
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
        const ship = Ship(length, cell, orient);

        ships.push(ship);

        // ------Remove cells from emptycells array -------
        // Horizontal ----> orientation = 0
        if(orient == 0) {
            for(let i = cell[1] ; i < cell[1] + length ; i++) {
                let shipCell = [cell[0], i];
                occupyCell(shipCell[0], shipCell[1]);
                shipCells.push({ship, shipCell, orient});
            }
        } else { // Vertical ------> orientation = 1
            for(let i = cell[0] ; i < cell[0] + length ; i++) {
                let shipCell = [i, cell[1]];
                occupyCell(shipCell[0], shipCell[1]);
                shipCells.push({ship, shipCell, orient});
            }
        }
    }

    const occupyCell = (x,y) => {
        emptyCells.splice(emptyCells.findIndex(c => c[0] == x && c[1] == y), 1);
    }

    // receive attacks from opponent and register the location    
    const getAttacked = (cell) => {
        const cellHit = shipCells.find( obj => obj.shipCell[0] == cell[0] && obj.shipCell[1] == cell[1]);

        if(cellHit) {
            cellHit.ship.getHit();
            successHits.push(cell);
            console.log('sunk: ' + cellHit.ship.isSunk());

            // mark surrounding cells as verified empty
            findVerifiedEmpty(cellHit);

            return true;
            
        } else {
            missedShots.push(cell);
            return false;
        }
       
        // if hits ship (if ships[] contains cell)
            // call Ship.getHit with the position of cell of the attack
            // checks surrounding cells for verified empty cells
        // if it misses
            //register that cell as verified empty 
    }

    function checkIfAllShipsSunk() {
        return !ships.some(ship => ship.isSunk() == false);
    }

    function hasCellBeenAttacked(cell) {
        if(verifiedEmpty.some(c => c[0] == cell[0] && c[1] == cell[1]) || successHits.some(c => c[0] == cell[0] && c[1] == cell[1]) || missedShots.some(c => c[0] == cell[0] && c[1] == cell[1])) {
            return true;
        } else {
            return false;
        }
    }

    function findVerifiedEmpty(cell) {
        if(cell.ship.isSunk()) {
            const ship = cell.ship;
            if(ship.orientation == 0) { // Horizontal
                for(let i = ship.location[1] - 1 ; i <= ship.location[1] + ship.length ; i++) {
                    if(i < 0 || i > 9) {
                        continue;
                    }
                    for(let j = ship.location[0] - 1 ; j <= ship.location[0] + 1 ; j++) { 
                        // if outside the borders -> continue
                        if(j < 0 || j > 9) {
                            continue;
                        }
                        // if cell not available return false
                        if(!hasCellBeenAttacked([j, i])) {
                            verifiedEmpty.push([j, i]);
                            console.log('verified empty');
                            console.log(verifiedEmpty);
                        }
                    } 
                }
        
            } else { // Vertical
                for(let i = ship.location[1] - 1 ; i <= ship.location[1] + 1 ; i++) {
                    if(i < 0 || i > 9) {
                        continue;
                    }
                    for(let j = ship.location[0] - 1 ; j <= ship.location[0] + ship.length ; j++) { 
                        // if outside the borders -> continue
                        if(j < 0 || j > 9) {
                            continue;
                        }
                        // if cell not available return false
                        if(!hasCellBeenAttacked([j, i])) {
                            verifiedEmpty.push([j, i]);
                            console.log('verified empty');
                            console.log(verifiedEmpty);
                        }
                    } 
                }
            }
        } else {

            console.log('hello');
            //top left
            const topLeft = [cell.shipCell[0] - 1, cell.shipCell[1] - 1];
            console.log(topLeft);
            if(topLeft[0] >= 0 && topLeft[1] >= 0 ) {
                if(!hasCellBeenAttacked(topLeft)) {
                    verifiedEmpty.push(topLeft);
                    console.log('verified empty');
                    console.log(verifiedEmpty);
                }
            }

            //top right
            const topRight = [cell.shipCell[0] - 1, cell.shipCell[1] + 1];
            if(topRight[0] >= 0 && topRight[1] <= 9 ) {
                if(!hasCellBeenAttacked(topRight)) {
                    verifiedEmpty.push(topRight);
                    console.log('verified empty');
                    console.log(verifiedEmpty);
                }
            }

            //bottom left
            const bottomLeft = [cell.shipCell[0] + 1, cell.shipCell[1] - 1];
            if(bottomLeft[0] <= 9 && bottomLeft[1] >= 0 ) {
                if(!hasCellBeenAttacked(bottomLeft)) {
                    verifiedEmpty.push(bottomLeft);
                    console.log('verified empty');
                    console.log(verifiedEmpty);
                }
            }
            //bottom right
            const bottomRight = [cell.shipCell[0] + 1, cell.shipCell[1] + 1];
            if(bottomRight[0] <= 9 && bottomRight[1] <= 9 ) {
                if(!hasCellBeenAttacked(bottomRight)) {
                    verifiedEmpty.push(bottomRight);
                    console.log('verified empty');
                    console.log(verifiedEmpty);
                }
            }
        }
        
    }

    return { shipCells, verifiedEmpty, successHits, missedShots, emptyCells, checkIfAllShipsSunk, placeShipsRandom, placeShipRandom, isSpaceAvailable, getAttacked, hasCellBeenAttacked}
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