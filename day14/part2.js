const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(l => l.split(" = ")).map(ins => {
    if(ins[0] == "mask") return { type: "mask", value: ins[1].split("") };
    let [ type, index ] = ins[0].split("[");
    return { type, index: parseInt(index.substring(0, index.length - 1)).toString("2").padStart(36, "0").split(""), value: parseInt(ins[1]) };
});

function generateIndexes(start, bitmask, firstTime) {
    if(firstTime) {
        start = start.map((v, i) => {
            if(bitmask[i] == "0") return v;
            else return bitmask[i];
        })
    }
    let i = start.indexOf("X");
    if(i == -1) return [ start.join("") ];
    let indexes = [];
    start[i] = "0";
    indexes = indexes.concat(generateIndexes([...start], bitmask, false));
    start[i] = "1";
    indexes = indexes.concat(generateIndexes([...start], bitmask, false));
    return indexes;
}

let mem = {};
let mask = [];

for(let ins of input) {
    switch(ins.type) {
        case "mem": {
            let indexes = generateIndexes(ins.index, mask, true);
            for(let index of indexes) {
                mem[index] = ins.value;
            }
            break;
        }
        case "mask": {
            mask = ins.value;
            break;
        }
    }
}

console.log(Object.values(mem).reduce((a,b)=>a+b,0));
