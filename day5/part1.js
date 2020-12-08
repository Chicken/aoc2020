const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n")

let highest = 0;

for(let str of input) {
    let id = parseInt(str.replace(/./g, c => {
        switch(c) {
            case "F":
            case "L": return 0;
            case "B":
            case "R": return 1;
        }
    }),2)
    if(id > highest) highest = id;
}

console.log(highest);