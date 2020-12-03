const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// parse input
const input = inputFile.split("\n").map(row => row.split(""));

let slopes = [
    {
        down: 1,
        right: 1
    },
    {
        down: 1,
        right: 3
    },
    {
        down: 1,
        right: 5
    },
    {
        down: 1,
        right: 7
    },
    {
        down: 2,
        right: 1
    }
]

let treeAmounts = [];

for(slope of slopes) {
    let { down, right } = slope;
    let x = 0;
    let y = 0;

    let trees = 0;

    while(true) {
        if(x >= input[0].length) {
            x -= input[0].length;
        }

        if(y >= input.length) {
            break;
        }

        let tree = (input[y][x] == "#"); 

        if(tree) trees++;

        x += right;
        y += down;
    }

    treeAmounts.push(trees);
}

console.log(treeAmounts.reduce((a, b) => a * b ))