const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v => ({ins: v[0], val: parseInt(v.substring(1))}) );

const NORTH = 0,
      EAST  = 1,
      SOUTH = 2,
      WEST  = 3;

let dir = EAST;
let y = 0;
let x = 0;

for(let ins of input) {
    switch(ins.ins) {
        case "N": {
            y += ins.val;
            break;
        }
        case "S": {
            y -= ins.val;
            break;
        }
        case "E": {
            x += ins.val;
            break;
        }
        case "W": {
            x -= ins.val;
            break;
        }
        case "L": {
            dir -= ins.val / 90;
            if(dir < 0) dir += 4;
            break;
        }
        case "R": {
            dir += ins.val / 90;
            if(dir > 3) dir -= 4;
            break;
        }
        case "F": {
            switch(dir) {
                case NORTH: {
                    y += ins.val;
                    break;
                }
                case EAST: {
                    x += ins.val;
                    break;
                }
                case SOUTH: {
                    y -= ins.val;
                    break;
                }
                case WEST: {
                    x -= ins.val;
                    break;
                }
            }
            break;
        }
    }
}

console.log(Math.abs(x) + Math.abs(y));
