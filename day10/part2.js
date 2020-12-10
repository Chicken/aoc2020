const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v => parseInt(v));

input.sort((a,b) => a - b);
input.unshift(0);
input.push(input[input.length - 1] + 3);

let seen = [];
let count = i => {
    if (i == input.length- 1 ) return 1;
    if(i in seen) return seen[i];
    let ans = 0;
    for(let j = i + 1; j < input.length; j++) {
        if(input[j] - input[i] > 3) break;
        ans += count(j);
    }
    seen[i] = ans;
    return ans;
}

console.log(count(0));