const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split the input by newlines and parse the text to numbers
const input = inputFile.split("\n").map(v => parseInt(v));

// loop through every combination of 2 values in the input
for(i of input) {
    for(j of input) {
        // if the addition of those values is 2020
        if(i + j == 2020) {
            // log the multiplication
            console.log(i*j);
            // and exit
            process.exit(0);           
        }
    }
}
