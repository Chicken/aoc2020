const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v => parseInt(v));

// THIS MUST BE CHANGED TO WHATEVER YOU GET FROM PART 1
let num = 731031916;

for(let i = 0; i < input.length; i++) {
    for(let end = 2+i; end < input.length; end++) {
        let subArr = input.slice(i, end);
        let sum = subArr.reduce((a,b)=>a+b);
        if(sum == num) {
            let min = Math.min(...subArr);
            let max = Math.max(...subArr);
            console.log(min + max);
            process.exit(0);
        }
    }
}