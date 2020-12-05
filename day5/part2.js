const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n")

let ids = [];

for(let str of input) {
    let row = parseInt(str.substring(0,7).replace(/F/g, "0").replace(/B/g, "1"),2);
    let column = parseInt(str.substring(7).replace(/L/g, "0").replace(/R/g, "1"),2); 
    ids.push(row * 8 + column);
}

ids.sort((a,b)=>a-b);

for(let i = ids[0]; i < ids[ids.length-1]; i++) {
    if(ids.indexOf(i) == -1) console.log(i);
}