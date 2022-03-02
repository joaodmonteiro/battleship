function createGameboards() {
    const myBoard = document.querySelector('.my-board');
    const opponentBoard = document.querySelector('.opponent-board');

    for( let i=0; i < 10; i++) {
        for( let j=0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `user-cell-${i}${j}`;
            // cell.textContent = `${i},${j}`;
            myBoard.appendChild(cell);
            
        }
    }

    for( let i=0; i < 10; i++) {
        for( let j=0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `pc-cell-${i}${j}`;
            // cell.textContent = `${i},${j}`;
            opponentBoard.appendChild(cell);
        }
    }
}

function updateDOM(gameboard1, gameboard2) {
    gameboard1.emptyCells.forEach(cell => {
        const emptyCell = document.getElementById(`user-cell-${cell[0]}${cell[1]}`);
        emptyCell.style.background = '#436cff';
    });

    gameboard1.shipCells.forEach(ship => {
        const shipCell = document.getElementById(`user-cell-${ship.shipCell[0]}${ship.shipCell[1]}`);
        shipCell.style.background = '#c355d1';
        shipCell.classList.add('ship');
        shipCell.draggable = true;
    });
    
    // gameboard2.emptyCells.forEach(cell => {
    //     const emptyCell = document.getElementById(`pc-cell-${cell[0]}${cell[1]}`);
    //     emptyCell.style.background = '#436cff';
    // });

    gameboard1.missedShots.forEach(cell => {
        const missedShot = document.getElementById(`user-cell-${cell[0]}${cell[1]}`);
        missedShot.textContent = '.';
    });
    
    gameboard2.missedShots.forEach(cell => {
        const missedShot = document.getElementById(`pc-cell-${cell[0]}${cell[1]}`);
        missedShot.style.background = '#436cff';
        missedShot.textContent = '.';
    });

    gameboard1.verifiedEmpty.forEach(cell => {
        const verEmptyCell = document.getElementById(`user-cell-${cell[0]}${cell[1]}`);
        verEmptyCell.textContent = '.';
        verEmptyCell.style.color = 'grey';
    });
    
    gameboard2.verifiedEmpty.forEach(cell => {
        const verEmptyCell = document.getElementById(`pc-cell-${cell[0]}${cell[1]}`);
        verEmptyCell.style.background = '#436cff';
        verEmptyCell.textContent = '.';
        verEmptyCell.style.color = 'grey';
    });

    gameboard1.successHits.forEach(cell => {
        const cellHit = document.getElementById(`user-cell-${cell[0]}${cell[1]}`);
        cellHit.style.backgroundColor = 'red';
    });
    
    gameboard2.successHits.forEach(cell => {
        const cellHit = document.getElementById(`pc-cell-${cell[0]}${cell[1]}`);
        cellHit.style.backgroundColor = 'red';
    });
}

export { createGameboards, updateDOM };