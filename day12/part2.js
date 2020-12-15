const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newlines and map into instruction objects with ins and value as a number
const input = inputFile.split("\n").map(v => ({ins: v[0], val: parseInt(v.substring(1))}) );

// keep track of ships absolute coords
let ship = { y: 0, x: 0 };
// and waypoints relative coords
let waypoint = { y: 1, x: 10 };

// loop all instructions
for(let ins of input) {
    switch(ins.ins) {
        case "N": {
            // go "north" => increase waypoint y coord
            waypoint.y += ins.val;
            break;
        }
        case "S": {
            // go "south" => decrease waypoint y coord
            waypoint.y -= ins.val;
            break;
        }
        case "E": {
            // go "east" => increase waypoint x coord
            waypoint.x += ins.val;
            break;
        }
        case "W": {
            // go "west" => decrease waypoint x coord
            waypoint.x -= ins.val;
            break;
        }
        case "L": {
            // theres only 3 possible values so
            // switch is more efficient than a full fledged
            // function for 2d point rotation
            switch(ins.val) {
                case 90: {
                    // extract x, y
                    let { x, y } = waypoint;
                    // swap them and negate y
                    waypoint.x = -y;
                    waypoint.y = x
                    break;
                }
                case 180: {
                    // negate both values
                    waypoint.x *= -1;
                    waypoint.y *= -1;
                    break;
                }
                case 270: {
                    // extract x, y
                    let { x, y } = waypoint;
                    // swap them and negate x
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
                    // extract x, y
                    let { x, y } = waypoint;
                    // swap them and negate x
                    waypoint.x = y;
                    waypoint.y = -x
                    break;
                }
                case 180: {
                    // negate both values
                    waypoint.x *= -1;
                    waypoint.y *= -1;
                    break;
                }
                case 270: {
                    // extract x, y
                    let { x, y } = waypoint;
                    // swap them and negate y
                    waypoint.x = -y;
                    waypoint.y = x
                    break;
                }
            }
            break;
        }
        case "F": {
            // move the ship towards the waypoint
            // -> add the coords of the waypoint multiplied 
            // by the value to the ships coords
            ship.y += ins.val * waypoint.y;
            ship.x += ins.val * waypoint.x;
            break;
        }
    }
}
// add together the absolute values of ship x and ship y
console.log(Math.abs(ship.x) + Math.abs(ship.y));
