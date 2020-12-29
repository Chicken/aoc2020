const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split the input string to characters and map to numbers
let input = inputFile.split("").map(Number);

// loop 100 rounds
for (let i = 0; i < 100; i++) {
    // pick up the next 3 numbers
    let picked = input.splice(1, 3);
    // target cup is the current value minus one
    let target = input[0] - 1;

    // loop till valid
    while (true) {
        // if going below 1, go back to the max value
        if (target < 1) target += 9;
        // find position of target in the array
        let pos = input.indexOf(target);
        // if found
        if (pos != -1) {
            // put the picked cups at the position of target value
            input.splice(pos + 1, 0, picked);
            // flatten out the nested array
            input = input.flat();
            // break the loop
            break;
        }
        // otherwise reduce the target and try again
        target--;
    }
    // shift the current one and push to the end
    input.push(input.shift());
}

// double the array by concatting itself
// join it to string and split it by ones
// then take the second element thats inbetween ones
console.log(input.concat(input).join("").split("1")[1]);
