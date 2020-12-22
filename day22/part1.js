const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

let [ player1, player2 ] = inputFile.split("\n\n").map(p => p.split("\n").slice(1).map(Number))

while(player1.length && player2.length) {
    let p1c = player1.shift()
    let p2c = player2.shift()

    if(p1c > p2c) {
        player1 = player1.concat([p1c, p2c])
    } else {
        player2 = player2.concat([p2c, p1c]);
    }
}

let winner = player1.length ? player1 : player2; 

console.log(winner.reduce((ac, c, i, a) => ac + c * (a.length - i), 0))
