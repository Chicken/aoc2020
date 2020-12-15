const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// turn the input into a 2d array grid
let input = inputFile.split("\n").map(r => r.split(""));

// function to get neighbor count of a cell
function getNeighborAmount(y, x) {
    // return the sum of occupied offsets
    // these offsets are for every cell 
    return [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].reduce((count, offsets) => {
        // destructure offsets to their variables
        let [ yoff, xoff ] = offsets;
        // loop till we find a seat we see
        while (true) {
            // add offsets to coords
            let xc = x + xoff;
            let yc = y + yoff;
            // test that the coords are inside the bounds of grid
            // if not return non increased count
            if(xc < 0 || yc < 0 || xc > input[0].length - 1 || yc > input.length - 1) return count;
            // return increased count for occupied seat
            if(input[yc][xc] == "#") return ++count;
            // non modified for free seat
            if(input[yc][xc] == "L") return count;
            // increase offsets by the originals
            xoff += offsets[1];
            yoff += offsets[0];
        }
    }, 0)
}

// function to apply the cellurar automata rules
function applyRules() {
    // variable to test if board has changed
    let changed = false;
    // new board
    let board = [];
    // loop all y
    for(let y = 0; y < input.length; y++) {
        // push rows to the board
        board.push([]);
        // loop every column
        for(let x = 0; x < input[0].length; x++) {
            // if the current board has no one in there
            if(input[y][x] == "L") {
                // get its neighbors
                let neighbors = getNeighborAmount(y, x);
                // if theres none,
                // put someone there
                // and set changed to true
                if(neighbors == 0) {
                    changed = true;
                    board[y].push("#");
                } else {
                    // otherwise dont change
                    board[y].push("L");
                }
            // if theres someone in the current board
            } else if(input[y][x] == "#") {
                // get neighbor amount
                let neighbors = getNeighborAmount(y, x);
                // if theres more than 5,
                // make it free
                // and set changed to true
                if(neighbors >= 5) {
                    changed = true;
                    board[y].push("L");
                } else {
                    // otherwise dont change
                    board[y].push("#");
                }
            // if its a walkway
            } else {
                // dont change
                board[y].push(".");
            }
        }
    }
    // set input to board
    input = board;
    // return if the board changed
    return changed;
}

// repeat until the board doesnt change
while(true) {
    if(!applyRules()) break;
}

// count the amount of people with regex
console.log(input.map(r => r.join("")).join("").match(/#/g).length)
