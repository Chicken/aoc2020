const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newlines
const input = inputFile.split("\n")

// array of every id
let ids = [];

// loop every id
for(let str of input) {
    // use parseInt to turn binary into number
    // and push to array
    ids.push(parseInt(str.replace(/./g, c => {
        // replace specific chars with 1's and 0's
        switch(c) {
            case "F":
            case "L":
                return 0;
            case "B":
            case "R":
                return 1;
        }
    }), 2))
}

// loop every id from the smallest one to the highest one
for(let i = Math.min(...ids); i < Math.max(...ids); i++) {
    // check if exists
    // and if it doesnt, log it
    if(ids.indexOf(i) == -1) console.log(i);
}
