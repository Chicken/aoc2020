const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split the input by newline, map to number and destructure to variables
const [ cpub, dpub ] = inputFile.split("\n").map(Number);

// function to do the transformation
function transform(subject, loop) {
    // start with one
    let key = 1;
    // loop as many times as specified
    for(let i = 0; i < loop; i++) {
        // multiply by the subject number
        key *= subject;
        // take the remainder of 20201227
        key %= 20201227;
    }
    // return the key after the loops
    return key;
}

// function to bruteforce the loopsize of a public key
// when subject number is known
function loopSize(subject, public) {
    // start with 1's
    let value = 1;
    let loop = 1;
    // loop forever
    while(true) {
        // multiply by the subject number
        value *= subject;
        // take the remainder of 20201227
        value %= 20201227;
        // return the current loop size if hit the public key
        if (public == value) return loop;
        // increase loop size
        loop++;
    }
}

// log the transformation of others public key by the others loopsize
// subject number used by the public keys is 7
console.log(transform(dpub, loopSize(7, cpub)));

