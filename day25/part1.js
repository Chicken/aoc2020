const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const [ cpub, dpub ] = inputFile.split("\n").map(Number);

function transform(subject, loop) {
    let key = 1;
    for(let i = 0; i < loop; i++) {
        key *= subject;
        key %= 20201227;
    }
    return key;
}

function loopSize(subject, public) {
    let value = 1;
    let loop = 1;
    while(true) {
        value *= subject;
        value %= 20201227;
        if (public == value) return loop;
        loop++;
    }
}

console.log(transform(dpub, loopSize(7, cpub)));

