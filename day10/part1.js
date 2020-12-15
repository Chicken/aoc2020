const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newlines and map into numbers
const input = inputFile.split("\n").map(v => parseInt(v));

// sort
input.sort((a,b) => a - b);
// add the 0 at the start
input.unshift(0);
// add the highest number + 3 at the end
input.push(input[input.length-1]+3);

// keep count of the differences
let ones = 0;
let threes = 0;

// loop every numbers
for(let i in input) {
    // calculate difference of it and the number befor
    let diff = input[i] - input[i-1];
    // increase counters
    if(diff == 1) ones++;
    if(diff == 3) threes++;
}

// log the multiple of the differences
console.log(ones*threes);
