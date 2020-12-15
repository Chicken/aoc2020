const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// turn the input into a 2d array grid
const input = inputFile.split("\n").map(row => row.split(""));

// keep count of our x position and hit trees
let x = 0;
let trees = 0;

// loop every y value and increase the x by 3 every time
for(let y = 0; y < input.length; y++, x += 3) {
    // if current position is a tree, increase count
    if(input[y][x % input[0].length] == "#") trees++;
}

// log the answer
console.log(trees);
