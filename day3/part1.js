const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// parse input
const input = inputFile.split("\n").map(row => row.split(""));

let down = 1;
let right = 3;

let x = 0;
let y = 0;

let trees = 0;

while(true) {
    if(x >= input[0].length) {
        x -= input[0].length;
    }

    if(y >= input.length) {
        break;
    }

    let tree = (input[y][x] == "#"); 
    
    if(tree) trees++;

    x += right;
    y += down;
}

console.log(trees);