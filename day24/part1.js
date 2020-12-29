const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split the input by newlines
const input = inputFile.trim().split("\n");

// function to hash coords to string
let hash = (x, y) => x + "," + y;

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

// log the amount of tiles in the set
console.log(tiles.size);
