const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by empty line
// and replace newlines by nothing
const groups = inputFile.split("\n\n").map(g=>g.split("\n").map(p=>p.split("")))

// count the sum of sums 
console.log(groups.reduce((sum, group)=>{
    // return the sum + answers which everyone answered yes
    // to count that we filter the answers from person 0
    // that everyone answered yes to by using Array.filter(Array.every(Array.includes()))
    return sum + group[0].filter(answer => group.every(p => p.includes(answer))).length
},0));
