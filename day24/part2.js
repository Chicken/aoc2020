const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split the input by newlines
const input = inputFile.trim().split("\n");

// function to hash coords to string
let hash = (x, y) => x + "," + y;
// function to reverse the hashing and return the coords
let unHash = str => {
    let [ x, y ] = str.split(",").map(Number);
    return { x, y };
}

// set to contain the tiles that are black
let tiles = new Set();

// loop each line of input
for(let line of input) {
    // variable for x, y coords
    let ptr = { x: 0, y: 0 };
    // while the line still has instructions
    while(line.length) {
        // use regex to match the next instruction
        let match = line.match(/^(se|sw|nw|ne|e|w)/mi);
        // remove it from the line
        line = line.substring(match[1].length)
        // switch cases for each instructions
        switch(match[1]) {
            case "se": {
                // south east => x increase and y decrease
                ptr.x++;
                ptr.y--;
                break;
            }
            case "nw": {
                // north west  => x decrease and y increase
                ptr.x--;
                ptr.y++;
                break;
            }
            case "ne": {
                // north east => y increase
                ptr.y++;
                break;
            }
            case "sw": {
                // south west => y decrease
                ptr.y--;
                break;
            }
            case "e": {
                // east => x increase
                ptr.x++;
                break;
            }
            case "w": {
                // west => x decrease
                ptr.x--;
                break;
            }
        }
    }
    // hash the coords
    let key = hash(ptr.x, ptr.y);
    // if tiles already has this tile, delete it (turn back to white)
    if(tiles.has(key)) tiles.delete(key);
    // if not, then flip add it (flip to black)
    else tiles.add(key);
}

// loop 100 iterations
for(let t = 0; t < 100; t++) {
    // new set for the iteration
    let iter = new Set();
    // loop all tiles
    for(let tile of tiles) {
        // loop all its neighbors 
        for(let dx of [-1,0,1]) {
            for(let dy of [-1,0,1]) {
                // skip the two corners (hexagons dont have neighbors there)
                if((dx == -1 && dy == -1) || (dx == 1 && dy == 1)) continue;
                // unhash the coords of current tile
                let neighbor = unHash(tile);
                // add the offsets to it
                neighbor.x += dx;
                neighbor.y += dy;
                // keep track of neighbor amount
                let neighbors = 0;
                // loop all offsets yet again
                for(let dx2 of [-1,0,1]) {
                    for(let dy2 of [-1,0,1]) {
                        // and skip the two corners and itself
                        if((dx2 == -1 && dy2 == -1) || (dx2 == 1 && dy2 == 1) || (dx == 0 && dy == 0)) continue;
                        // hash the coords and check if it exists in current tiles
                        // and increase neighbor amount if yes
                        if(tiles.has(hash(neighbor.x + dx2, neighbor.y + dy2))) neighbors++;
                    }
                }
                // hash the coords yet again
                let key = hash(neighbor.x, neighbor.y);
                // check if this is a black tile
                let black = tiles.has(key);
                // if its not black but it has 2 neighbors
                // or if its black and hash between 1-3 neighbors
                // add it to the current iteration
                if((!black && neighbors == 2) || (black && (neighbors > 0 && neighbors <= 3))) iter.add(key);
            }
        }
    }
    // replace tiles with the current iteration
    tiles = iter;
}

// log the amount of tiles in the set
console.log(tiles.size)
