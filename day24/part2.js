const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.trim().split("\n");

let hash = (x, y) => x + "," + y;
let unHash = str => {
    let [ x, y ] = str.split(",").map(Number);
    return { x, y };
}

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

for(let t = 0; t < 100; t++) {
    let iter = new Set();
    for(let tile of tiles) {
        for(let dx of [-1,0,1]) {
            for(let dy of [-1,0,1]) {
                if((dx == -1 && dy == -1) || (dx == 1 && dy == 1)) continue;
                let neighbor = unHash(tile);
                neighbor.x += dx;
                neighbor.y += dy;
                let neighbors = 0;
                for(let dx2 of [-1,0,1]) {
                    for(let dy2 of [-1,0,1]) {
                        if((dx2 == -1 && dy2 == -1) || (dx2 == 1 && dy2 == 1) || (dx == 0 && dy == 0)) continue;
                        if(tiles.has(hash(neighbor.x + dx2, neighbor.y + dy2))) neighbors++;
                    }
                }
                let key = hash(neighbor.x, neighbor.y);
                let black = tiles.has(key);
                if((!black && neighbors == 2) || (black && (neighbors > 0 && neighbors <= 3))) {
                    iter.add(key);
                }
            }
        }
    }
    tiles = iter;
}

console.log(tiles.size)
