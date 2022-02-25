

function Player(name, opponentBoard) {
    // contains his gameboard object

    // defines the position of his ships

    // attacks a specific cell of the opponent's gameboard

    const attack = (cell) => {
        opponentBoard.getAttacked(cell);
    }

    return { attack }
}