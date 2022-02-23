import { Ship } from './Ship.js';

const Gameboard = () => {
    // contain the location of the ships
    let ships = []; // array of Ship objects and their respective positions

    // verified empty cells
    let emptyCells = [];

    for( let i=0; i < 10; i++) {
        for( let j=0; j < 10; j++) {
            const c = [i, j];
            emptyCells.push(c); 
        }
    }

    console.log(emptyCells);

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
        let place = [getRandomNumber(),getRandomNumber()]
        let orientation = getRandomOrientation(); // 0 - horizontal, 1 - vertical
        
    }

    const placeShip = (length, cell, orient) => {
        const ship = Ship(length);
    }


    return { placeShipsRandom }
};

function getRandomNumber() {
    return Math.floor(Math.random()*10);
}

function getRandomOrientation() {
    return Math.floor(Math.random() * 2);
}

export { Gameboard }