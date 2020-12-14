const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(l => l.split(" = ")).map(ins => {
    if(ins[0] == "mask") return { type: "mask", value: ins[1].split("") };
    let [ type, index ] = ins[0].split("[");
    return { type, index: parseInt(index.substring(0, index.length - 1)), value: parseInt(ins[1]).toString(2).padStart(36, "0") };
});

let mem = [];
let mask = [];

for(let ins of input) {
    switch(ins.type) {
        case "mem": {
            let val = ins.value.split("");
            mask.forEach((bit, i) => {
                if(bit == "X") return;
                val[i] = bit;
            })
            mem[ins.index] = parseInt(val.join(""), 2);
            break;
        }
        case "mask": {
            mask = ins.value;
            break;
        }
    }
}

console.log(mem.filter(_=>_).reduce((a,b)=>a+b));
