const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n\n").map(pass => pass.replace(/\n/g, " ").split(" ").map(f=>f.split(":")[0]));

console.log(input.filter(pass => 
    pass.length == 8 || (pass.length == 7 && !pass.includes("cid"))
).length)