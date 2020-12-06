const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const groups = inputFile.split("\n\n").map(g=>g.split("\n").map(p=>p.split("")))

let sum = 0;

for(let group of groups) {
    let unique = new Set();
    for(let passenger of group) {
        for(let answer of passenger) {
            unique.add(answer);
        }
    }
    sum += unique.size;
}

console.log(sum);