const fs = require("fs");
const inputFile = fs.readFileSync("./input.txt", "utf-8");

// parse input
const input = inputFile.split("\n").map(v=>parseInt(v));

for(i of input) {
    for(j of input) {
        if(i + j == 2020) {
            console.log(i*j);
            process.exit(0);           
        }
    }
}