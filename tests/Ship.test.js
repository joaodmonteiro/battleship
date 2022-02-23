const Ship = require('./Ship');

test('isSunk', () => {
    expect(Ship(3).isSunk()).toBe(false);
});

test('Ship of length 1 get hit', () => {
    const ship = Ship(1);
    ship.getHit();
    
    expect(ship.isSunk()).toBe(true);
});



