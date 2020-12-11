const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

let input = inputFile.split("\n").map(r => r.split(""));

function getNeighborAmount(y, x) {
    return [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].reduce((count, offsets) => {
        try {
            if(input[y+offsets[0]][x+offsets[1]] == "#") count++;
        } catch(e) {}
        return count;
    }, 0)
}

function applyRules() {
    let board = []
    for(let y = 0; y < input.length; y++) {
        board.push([]);
        for(let x = 0; x < input[0].length; x++) {
            if(input[y][x] == "L") {
                let neighbors = getNeighborAmount(y, x);
                if(neighbors == 0) {
                    board[y].push("#");
                } else {
                    board[y].push("L");
                }
            } else if(input[y][x] == "#") {
                let neighbors = getNeighborAmount(y, x);
                if(neighbors >= 4) {
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
}

let lastState = input.map(r => r.join("")).join("");

while(true) {
    applyRules();
    let key = input.map(r => r.join("")).join("");
    if(lastState == key) break;
    lastState = key;
}

console.log(input.reduce((count, row) => {
    return count + row.reduce((amount, seat) => {
        if(seat == "#") amount++;
        return amount;
    },0)
},0))
