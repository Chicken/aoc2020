const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.trim().split("\n");

let hash = (x, y) => x + "," + y;

let tiles = new Set();

for(let line of input) {
    let ptr = {x: 0, y: 0}
    while(line.length) {
        let match = line.match(/^(se|sw|nw|ne|e|w)/mi);
        line = line.substring(match[1].length)
        switch(match[1]) {
            case "se": {
                ptr.x++;
                ptr.y--;
                break;
            }
            case "sw": {
                ptr.y--;
                break;
            }
            case "nw": {
                ptr.x--;
                ptr.y++;
                break;
            }
            case "ne": {
                ptr.y++;
                break;
            }
            case "e": {
                ptr.x++;
                break;
            }
            case "w": {
                ptr.x--;
                break;
            }
        }
    }
    let key = hash(ptr.x, ptr.y)
    if(tiles.has(key)) tiles.delete(key);
    else tiles.add(key);
}

console.log(tiles.size);
