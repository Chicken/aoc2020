const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// parse input
const input = inputFile.split("\n").map(v=>parseInt(v));

for(i of input) {
    for(j of input) {
        for(k of input) {
            if(i + j + k == 2020) {
                console.log(i*j*k);
                process.exit(0);           
            }
        }
    }
}