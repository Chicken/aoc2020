const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v => parseInt(v));

input.sort((a,b) => a - b);
input.unshift(0);
input.push(input[input.length-1]+3);

let ones = 0;
let threes = 0;

for(let i in input) {
    let diff = input[i] - input[i-1];
    if(diff == 1) ones++;
    if(diff == 3) threes++;
}

console.log(ones*threes);