const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newline and map to number
const input = inputFile.split("\n").map(v => parseInt(v));

// take the first 25 numbers from input
let preamble = input.splice(0, 25);

// loop all numbers of input
for(let num of input) {
    // set the valid to false
    let valid = false;
    // loop every combination in the preamble
    for(let one of preamble) {
        for(let two of preamble) {
            // its valid if any of them sum up to the num
            if(one != two && one + two == num) valid = true;
        }
    }
    // log the number and break out
    // if its not valid
    if(!valid) {
        console.log(num)
        break;
    }
    // move the preamble along
    preamble.shift();
    preamble.push(num);
}
