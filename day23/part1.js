const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

let input = inputFile.split("").map(n => parseInt(n));

for (let i = 0; i < 100; i++) {
    let picked = input.splice(1, 3);
    let target = input[0] - 1;

    while (true) {
        if (target == 0) target += 9;
        let pos = input.indexOf(target);
        if (pos != -1) {
            input.splice(pos + 1, 0, picked);
            input = input.flat();
            break;
        }
        target--;
    }
    input.push(input.shift());
}

console.log(input.concat(input).join("").split("1")[1]);
