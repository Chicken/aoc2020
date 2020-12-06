const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const groups = inputFile.split("\n\n").map(g=>g.split("\n").map(p=>p.split("")))

let sum = 0;

for(let group of groups) {
    for(let answer of group[0]) {
        if(group.every(passenger => {
            return passenger.includes(answer)
        })) sum++;
    }
}

console.log(sum);