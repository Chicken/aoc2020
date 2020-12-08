const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(l => [l.split(" ")[0], parseInt(l.split(" ")[1])]);

function emulate(inp) {
    let acc = 0;
    let exec = [];
    let ptr = 0;
    while(true) {
        if(ptr >= inp.length) {
            return  acc;
        }
        let [ ins, val ] = inp[ptr];
        if(exec.includes(ptr)) {
            return null;
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

}

let candidates = input.filter(e => (e[0] == "jmp" || e[0] == "nop"))

for(let cand of candidates) {
    let index = input.indexOf(cand);
    let copy = JSON.parse(JSON.stringify(input))
    copy[index][0] = (cand[0] == "jmp" ? "nop" : "jmp");
    let result = emulate(copy);
    if(result == null) continue;
    console.log(result)
    process.exit();
}