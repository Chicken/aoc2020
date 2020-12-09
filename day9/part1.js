const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v => parseInt(v));

let preamble = input.splice(0, 25);

for(let num of input) {
    let valid = false;
    for(let one of preamble) {
        for(let two of preamble) {
            if(one != two && one + two == num) valid = true;
        }
    }
    if(!valid) {
        console.log(num)
        break;
    }
    preamble.shift();
    preamble.push(num);
}