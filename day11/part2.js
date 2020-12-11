const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

let input = inputFile.split("\n").map(r => r.split(""));

function getNeighborAmount(y, x) {
    return [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].reduce((count, offsets) => {
        let [ yoff, xoff ] = offsets;
        while (true) {
            let xc = x + xoff;
            let yc = y + yoff;
            if(xc < 0 || yc < 0 || xc > input[0].length - 1 || yc > input.length - 1) return count;
            if(input[yc][xc] == "#") return ++count;
            if(input[yc][xc] == "L") return count;
            xoff += offsets[1];
            yoff += offsets[0];
        }
    }, 0)
}

function applyRules() {
    let changed = false;
    let board = []
    for(let y = 0; y < input.length; y++) {
        board.push([]);
        for(let x = 0; x < input[0].length; x++) {
            if(input[y][x] == "L") {
                let neighbors = getNeighborAmount(y, x);
                if(neighbors == 0) {
                    changed = true;
                    board[y].push("#");
                } else {
                    board[y].push("L");
                }
            } else if(input[y][x] == "#") {
                let neighbors = getNeighborAmount(y, x);
                if(neighbors >= 5) {
                    changed = true;
                    board[y].push("L");
                } else {
                    board[y].push("#");
                }
            } else {
                board[y].push(".");
            }
        }
    }
    input = board;
    return changed;
}

while(true) {
    if(!applyRules()) break;
}

console.log(input.map(r => r.join("")).join("").match(/#/g).length)
