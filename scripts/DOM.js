function createGameboards() {
    const myBoard = document.querySelector('.my-board');
    const opponentBoard = document.querySelector('.opponent-board');

    for( let i=0; i < 10; i++) {
        for( let j=0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = `${i},${j}`;
            cell.id = `user-cell-${i}${j}`;
            myBoard.appendChild(cell);
        }
    }

    for( let i=0; i < 10; i++) {
        for( let j=0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = `${i},${j}`;
            cell.id = `pc-cell-${i}${j}`;
            opponentBoard.appendChild(cell);
        }
    }
}

export { createGameboards };