const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n").map(v => v.split(""));

// functions to turn an coord object to string and vice versa
function hash(x,y,z,w) {
    return `${x},${y},${z},${w}`;
}
function unHash(cube) {
    let [ x, y, z, w ] = cube.split(",").map(Number);
    return { x, y, z, w };
}

let cubes = new Set();

// add cubes from input to the set
for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input.length; x++) {
        if(input[y][x] == "#") cubes.add(hash(x,y,0,0));
    }
}

for(let t = 0; t < 6; t++) {
    let iter = new Set();
    // loop all cubes
    for(let cube of cubes) {
        // and their neighbors including themselves
        for(let dx of [-1,0,1]) {
            for(let dy of [-1,0,1]) {
                for(let dz of [-1,0,1]) {
                    for(let dw of [-1,0,1]) {
                        // create a cube with the correct coords
                        let neighbor = unHash(cube);
                        neighbor.x += dx;
                        neighbor.y += dy;
                        neighbor.z += dz;
                        neighbor.w += dw;
                        // count neighbors
                        let neighbors = 0;
                        for(let dx2 of [-1,0,1]) {
                            for(let dy2 of [-1,0,1]) {
                                for(let dz2 of [-1,0,1]) {
                                    for(let dw2 of [-1,0,1]) {
                                        // skip itself
                                        if(dx2 == 0 && dy2 == 0 && dz2 == 0 && dw2 == 0) continue;
                                        // if cubes has the hash of neighbor + difference
                                        if(cubes.has(hash(neighbor.x + dx2, neighbor.y + dy2, neighbor.z + dz2, neighbor.w + dw2))) neighbors++;
                                    }
                                }
                            }
                        }
                        // hash of the neighbor of current cube
                        let h = hash(neighbor.x, neighbor.y, neighbor.z, neighbor.w);
                        // if theres 3 neighbors or 2 if its occupied, add it to current iteration
                        if(neighbors == 3 || (cubes.has(h) && neighbors == 2)) {
                            iter.add(h);
                        }
                    }
                }
            }
        }
    }
    // replace cubes with iter
    cubes = iter;
}

// log size
console.log(cubes.size);
