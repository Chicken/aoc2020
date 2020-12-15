const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split the input when theres an empty line
// replace newlines with space
// split by spaces and then split by :'s to
// get an array of all the properties of the passport
const input = inputFile.split("\n\n").map(pass => pass.replace(/\n/g, " ").split(" ").map(f=>f.split(":")[0]));

// filter out valid passwords
console.log(input.filter(pass => 
    // if passport length is 8 or it is 7 and doesnt contain cid its valid
    pass.length == 8 || (pass.length == 7 && !pass.includes("cid"))
).length)
