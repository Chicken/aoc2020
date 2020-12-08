const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(l => [l.split(" ")[0], parseInt(l.split(" ")[1])]);

let acc = 0;
let exec = [];
let ptr = 0;

while(true) {
    let [ ins, val ] = input[ptr];
    if(exec.includes(ptr)) {
        console.log(acc);
        break;
    }
    exec.push(ptr);
    switch(ins) {
        case "acc": {
            acc += val;
            ptr++;
            break;
        }
        case "jmp": {
            ptr += val;
            break;
        }
        case "nop": {
            ptr++;
            break;
        }
    }
}
