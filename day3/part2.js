const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// turn the input into a 2d array grid
const input = inputFile.split("\n").map(row => row.split(""));

// log the answer (sum of trees from all the slopes)
console.log([[1,1],[1,3],[1,5],[1,7],[2,1]].reduce((ans, slope) => {
    // keep count of our x position and hit trees
    let x = 0;
    let trees = 0;

    // loop and increase x and y by the slope untill we hit the ground 
    for(let y = 0; y < input.length; y += slope[0], x += slope[1]) {
        // if current position is a tree, increase count
        if(input[y][x % input[0].length] == "#") trees++;
    }

    // return the answer multiplied by the trees hit
	return ans * trees;
}, 1))
