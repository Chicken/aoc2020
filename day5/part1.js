const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newlines
const input = inputFile.split("\n")

// keep count of highest id
let highest = 0;

// loop every id
for(let str of input) {
    // use parseInt to turn binary into number
    let id = parseInt(str.replace(/./g, c => {
        // replace specific chars with 1's and 0's
        switch(c) {
            case "F":
            case "L": return 0;
            case "B":
            case "R": return 1;
        }
    }),2)
    // check if the id is higher than highest
    // and set if true
    if(id > highest) highest = id;
}

// log the answer
console.log(highest);
