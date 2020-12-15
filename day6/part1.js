const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by empty line
// and replace newlines by nothing
const groups = inputFile.split("\n\n").map(g=>g.replace(/\n/g, ""))

// count the sum of sums of unique answers
console.log(groups.reduce((sum, group) => {
    // return the sum + amount of unique answers in group
    // we get the amount taking the size of a set made from all the answers
    // sets can only have unique elements so it automaticly removes duplicates
    return sum + (new Set(group)).size;
}, 0));
