const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const groups = inputFile.split("\n\n").map(g=>g.replace(/\n/g, ""))

console.log(groups.reduce((sum, group) => {
    return sum + (new Set(group)).size;
}, 0));