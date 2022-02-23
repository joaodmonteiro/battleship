import { Ship } from './Ship.js';
// const Ship = require('./Ship');

const Gameboard = () => {
    // contain the location of the ships
    let ships = []; // array of Ship objects and their respective positions

    // verified empty cells
    let emptyCells = [];

    for( let i=0; i < 10; i++) {
        for( let j=0; j < 10; j++) {
            const c = [+i, +j];
            emptyCells.push(c); 
        }
    }

    // receive attacks from opponent and register the location    
    const getAttacked = (cell) => {
        // if hits ship (if ships[] contains cell)
            // call Ship.getHit with the position of cell of the attack
            // checks surrounding cells for verified empty cells
        // if it misses
            //register that cell as verified empty 
    }

    // Place Ships
        // 1 - 4cells
        // 2 - 3cells
        // 3 - 2cells
        // 4 - 1cell
    
    // Generate random place for ship
        // cell(X = random number(0-9),Y = random number(0-9), random orientation(vertical or horizontal))
        // check if cell is available
            //if orientation is horizontal
                // Check remaining cells - on X axis until X + ship.length
                    // if doesnt fit
                        // generate random place again
                    // if it fits
                        // Create Ship(length) and push to ships[] along with cell and orientation --> ships.push({Ship(length), cell, orientation})
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
        
    }

    const placeShipRandom = (length) => {
        let cell = getRandomCell();
        let orientation = getRandomOrientation(); // 0 - horizontal, 1 - vertical

        console.log(cell + ' ' + orientation);

        if(isSpaceAvailable(length, cell, orientation)) {
            placeShip(length, cell, orientation);
        }  
        else {
            placeShipRandom(length);
        }
    }

    const placeShip = (length, cell, orient) => {
        const ship = Ship(length);
        ships.push({ship, cell, orient});

        // ------Remove cells from emptycells array -------
        // Horizontal ----> orientation = 0
        if(orient == 0) {
            for(let i = cell[1] ; i < cell[1] + length ; i++) {
                occupyCell(cell[0], i);
            }
        } else { // Vertical ------> orientation = 1
            for(let i = cell[0] ; i < cell[0] + length ; i++) {
                occupyCell(i, cell[1]);
            }
        }
    }

    const occupyCell = (x,y) => {
        emptyCells.splice(emptyCells.findIndex(c => c[0] == x && c[1] == y), 1);
    }

    const isCellAvailable = (place) => {
        if(emptyCells.some( cell => cell[0] == place[0] && cell[1] == place[1] )) {
            return true;
        }
        else
            return false;
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

                    console.log('' + j + ',' + i);
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

                    console.log('' + j + ',' + i);
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

    return { isSpaceAvailable, placeShipRandom, placeShipsRandom, emptyCells}
};

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