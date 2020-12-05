const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n")

let highest = 0;

for(let str of input) {
    let row = parseInt(str.substring(0,7).replace(/F/g, "0").replace(/B/g, "1"),2);
    let column = parseInt(str.substring(7).replace(/L/g, "0").replace(/R/g, "1"),2);
    let id = row * 8 + column;
    if(id > highest) highest = id;
}

console.log(highest);