const input = require("fs").readFileSync(__dirname + "/input.txt", "utf-8").split("\n").map(row => row.split(""));
console.log([[1,1],[1,3],[1,5],[1,7],[2,1]].reduce((ans, slope) => {
    let x = 0, trees = 0;
    for(let y = 0; y < input.length; y += slope[0], x += slope[1]) 
        if(input[y][x % input[0].length] == "#") trees++;
	return ans * trees;
}, 1))