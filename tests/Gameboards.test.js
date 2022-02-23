const Gameboard = require('../scripts/Gameboard.js');

// isSpaceAvailable()
test('checking ship placement', () => {
    const userGameboard = Gameboard();

    expect(userGameboard.isSpaceAvailable(3, [9,5], 0)).toBe(true);
});

test('use 1 cell ship', () => {
    const userGameboard = Gameboard();

    expect(userGameboard.isSpaceAvailable(1, [9,9], 0)).toBe(true);
});

test('use vertical ships', () => {
    const userGameboard = Gameboard();

    expect(userGameboard.isSpaceAvailable(4, [9,0], 1)).toBe(false);
})

// placeShipRandom()
test('a', () => {
    const userGameboard = Gameboard();

    expect(userGameboard.placeShipsRandom()).toBe(false);
});