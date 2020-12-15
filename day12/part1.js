const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by newlines and map into instruction objects with ins and value as a number
const input = inputFile.split("\n").map(v => ({ins: v[0], val: parseInt(v.substring(1))}) );

// enums for direction
const NORTH = 0,
      EAST  = 1,
      SOUTH = 2,
      WEST  = 3;

// start pointing east
let dir = EAST;
// start at 0,0 
let y = 0;
let x = 0;

// loop all instructions
for(let ins of input) {
    // switch for instruction type
    switch(ins.ins) {
        case "N": {
            // go "north" => increase y coord
            y += ins.val;
            break;
        }
        case "S": {
            // go "south" => decrease y coord
            y -= ins.val;
            break;
        }
        case "E": {
            // go "east" => increase x coord
            x += ins.val;
            break;
        }
        case "W": {
            // go "west" => decrease x coord
            x -= ins.val;
            break;
        }
        case "L": {
            // turn "left" by counting the amount of 90 degree turns
            // and remove that from the direction
            dir -= ins.val / 90;
            // and add back 4 if below 0 to loop around
            if(dir < 0) dir += 4;
            break;
        }
        case "R": {
            // turn "left" by counting the amount of 90 degree turns
            // and add that from the direction
            dir += ins.val / 90;
            // and remove 4 if below over 3 to loop around
            if(dir > 3) dir -= 4;
            break;
        }
        case "F": {
            // go forward to the direction currently pointing at
            // switch for direction
            switch(dir) {
                case NORTH: {
                    // if pointing "north", increase y coord
                    y += ins.val;
                    break;
                }
                case EAST: {
                    // if pointing "east", increase x coord
                    x += ins.val;
                    break;
                }
                case SOUTH: {
                    // if pointing "south", decrease y coord
                    y -= ins.val;
                    break;
                }
                case WEST: {
                    // if pointing "west", decrease x coord
                    x -= ins.val;
                    break;
                }
            }
            break;
        }
    }
}

// add together the absolute values of x and y
console.log(Math.abs(x) + Math.abs(y));
