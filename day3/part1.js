const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(row => row.split(""));

let x = 0;
let trees = 0;

for(let y = 0; y < input.length; y++, x += 3) {
    if(input[y][x % input[0].length] == "#") trees++;
}

console.log(trees);