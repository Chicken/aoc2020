const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by , turn into numbers and reverse the array
const input = inputFile.split(",").map(v => parseInt(v)).reverse();

// loop for 2020 times
for(let t = input.length; t < 2020; t++) {
    // take the current number
    let num = input.shift(); 
    // find the next index of the same number
    let index = input.indexOf(num); 
    // if it doesnt exist
    if(index == -1) {
        // add it back
        input.unshift(num);
        // and add 0
        input.unshift(0);
    } else {
        //if not
        // add the number back
        input.unshift(num)
        // and and the index of the number + 1
        input.unshift(index + 1);
    }
}

// log the latest number (answer)
console.log(input[0])
