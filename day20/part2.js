const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.trim().split("\n\n").map(t => {
    let rows = t.split("\n");
    let id = parseInt(rows.shift().match(/(\d)+/)[0]);
    tile = rows.map(row => row.split(""));
    return {
        id,
        tile
    };
});

function rotateMatrix(matrix) {
    let transposed = matrix.map(r => r.slice(0)).slice(0);
    for(let row in matrix) {
        for(let column in matrix) {
            transposed[column][row] = matrix[row][column];
        }
    }
    return transposed.map(r => r.reverse());
}

function generateAllMutations({ id, tile }) {
    let mutations = [];
    mutations.push(tile);
    tile = rotateMatrix(tile);
    mutations.push(tile);
    tile = rotateMatrix(tile);
    mutations.push(tile);
    tile = rotateMatrix(tile);
    mutations.push(tile);
    tile = tile.map(r => r.slice(0).reverse()).slice(0);
    mutations.push(tile);
    tile = rotateMatrix(tile);
    mutations.push(tile);
    tile = rotateMatrix(tile);
    mutations.push(tile);
    tile = rotateMatrix(tile);
    mutations.push(tile);
    return mutations.map(tile => {
        return {
            id,
            tile,
            top: tile[0].join(""),
            bottom: tile[tile.length - 1].join(""),
            left: tile.map(r => r[0]).join(""),
            right: tile.map(r => r[r.length - 1]).join("")
        }
    });
}

let allVariants = [];

for(let tile of input) {
    allVariants = allVariants.concat(generateAllMutations(tile));
}

let opposite = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
}

function findMatch(tile, edge) {
    for(let other of allVariants) {
        if(other.id == tile.id) continue;
        if(tile[edge] == other[opposite[edge]]) return other;
    }
    return false;
}

function findTopLeft() {
    return allVariants.find(tile => {
        let top = findMatch(tile, "top");
        let bottom = findMatch(tile, "bottom");
        let left = findMatch(tile, "left");
        let right =findMatch(tile, "right") ;
        return right && bottom && !top && !left;
    })
}

let topLeft = findTopLeft();

allVariants = allVariants.filter(tile => tile.id != topLeft.id);

let dim = Math.sqrt(input.length)
let img = [...Array(dim)].map(r => [...Array(dim)]);
img[0][0] = topLeft;

let row = 0;
while(true) {
    let column = 0;
    while(true) {
        let next = findMatch(img[row][column], "right");
        if(!next) break;
        allVariants = allVariants.filter(tile => tile.id != next.id);
        column++;
        img[row][column] = next;
    }
    let next = findMatch(img[row][0], "bottom");
    if(!next) break;
    allVariants = allVariants.filter(tile => tile.id != next.id);
    row++;
    img[row][0] = next;
}

for(let row in img) {
    for(let column in img[row]) {
        let { tile } = img[row][column];
        tile.pop();
        tile.shift();
        img[row][column] = tile.map(r => r.slice(1, -1));
    }
}

let fullImg = "";

for (let row1 in img) {
    for(let row2 in img[row1][0]) {
        for(let column in img[row1]) {
            fullImg += img[row1][column][row2].join("");
        }
        fullImg += "\n";
    }
}

fullImg = fullImg.trim();
fullImg = fullImg.split("\n").map(r => r.split(""));

let possibilities = generateAllMutations({ id: -1, tile: fullImg }).map(i => i.tile);

let highest = 0;

let monster = [
    /..................#./,
    /#....##....##....###/,
    /.#..#..#..#..#..#.../
]

for(let poss of possibilities) {
    let count = 0;
    for(let row = 0; row < poss.length - 2; row++) {
        for(let column = 0; column < poss[row].length - 19; column++) {
            let row1 = poss[row].slice(column, column + 20).join("");
            let row2 = poss[row + 1].slice(column, column + 20).join("");
            let row3 = poss[row + 2].slice(column, column + 20).join("");
            if(row1.match(monster[0]) && row2.match(monster[1]) && row3.match(monster[2])) count++;
        }
    }
    highest = count > highest ? count : highest;
}

console.log(fullImg.map(r => r.join("")).join("").match(/#/g).length - highest * 15);
