const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const groups = inputFile.split("\n\n").map(g=>g.split("\n").map(p=>p.split("")))

console.log(groups.reduce((sum, group)=>{
    return sum + group[0].filter(answer => group.every(p => p.includes(answer))).length
},0));