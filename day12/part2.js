const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v => ({ins: v[0], val: parseInt(v.substring(1))}) );

let ship = { y: 0, x: 0 };
let waypoint = { y: 1, x: 10 };

for(let ins of input) {
    switch(ins.ins) {
        case "N": {
            waypoint.y += ins.val;
            break;
        }
        case "S": {
            waypoint.y -= ins.val;
            break;
        }
        case "E": {
            waypoint.x += ins.val;
            break;
        }
        case "W": {
            waypoint.x -= ins.val;
            break;
        }
        case "L": {
            switch(ins.val) {
                case 90: {
                    let { x, y } = waypoint;
                    waypoint.x = -y;
                    waypoint.y = x
                    break;
                }
                case 180: {
                    waypoint.x *= -1;
                    waypoint.y *= -1;
                    break;
                }
                case 270: {
                    let { x, y } = waypoint;
                    waypoint.x = y;
                    waypoint.y = -x
                    break;
                }
            }
            break;
        }
        case "R": {
            switch(ins.val) {
                case 90: {
                    let { x, y } = waypoint;
                    waypoint.x = y;
                    waypoint.y = -x
                    break;
                }
                case 180: {
                    waypoint.x *= -1;
                    waypoint.y *= -1;
                    break;
                }
                case 270: {
                    let { x, y } = waypoint;
                    waypoint.x = -y;
                    waypoint.y = x
                    break;
                }
            }
            break;
        }
        case "F": {
            ship.y += ins.val * waypoint.y;
            ship.x += ins.val * waypoint.x;
            break;
        }
    }
}

console.log(Math.abs(ship.x) + Math.abs(ship.y));
