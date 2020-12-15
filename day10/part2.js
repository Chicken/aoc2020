const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newlines and map into numbers
const input = inputFile.split("\n").map(v => parseInt(v));

// sort
input.sort((a,b) => a - b);
// add the 0 at the start
input.unshift(0);
// add the highest number + 3 at the end
input.push(input[input.length - 1] + 3);

// keep track of seen numbers
let seen = [];

// count the ways to get from i to end
let count = i => {
    // if we are at the end, return 1
    if (i == input.length - 1 ) return 1;
    // if we have already calculated it,
    // return cached value
    // without cache this would take for ever
    if(i in seen) return seen[i];
    // init a counter
    let ans = 0;
    // loop all the values
    for(let j = i + 1; j < input.length; j++) {
        // if the difference is bigger than 3, break out
        if(input[j] - input[i] > 3) break;
        // add the count from valid numbers to ans
        ans += count(j);
    }
    // cache the answer
    seen[i] = ans;
    // return the answer
    return ans;
}

// log the amount of ways to get from 0 to end
console.log(count(0));
