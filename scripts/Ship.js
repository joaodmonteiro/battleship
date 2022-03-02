const Ship = (length, location, orientation) => {
    let sunk = false;
    let hitOn = 0;

    const getHit = () => { 
        // add to the hitOn counter
        hitOn += 1;

        // call isSunk()
        isSunk();
    }

    const isSunk = () => {
        // if hitOn array is the same length as length, sunk = true
        if(hitOn == length)
            sunk = true;
        
        return sunk;
    }

    return {length, location, orientation, isSunk, getHit}
}

export { Ship };

// module.exports = Ship;