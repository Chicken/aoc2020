const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split and map to number
const input = inputFile.split(",").map(Number);

// keep count of the last index number was seen in
let lastSeen = new Map();

// add inputst to it
for(let i = 0; i < input.length - 1; i++) {
    lastSeen.set(input[i], i.toString());
}

// loop till we have said 30000000 numbers
for(let i = input.length; i < 30000000; i++) {
    // take the previous number
    let prev = input[input.length - 1];
    // find the last time it had been said
    let last = lastSeen.get(prev);
    // set the numbers last seen index to current length
    lastSeen.set(prev, input.length - 1);
    // push the difference of indexes or 0 to the numbers
    input.push(last ? input.length - 1 - last : 0);
}

// log the last number
console.log(input[input.length - 1]);
