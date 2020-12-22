const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const [ player1, player2 ] = inputFile.split("\n\n").map(p => p.split("\n").slice(1).map(Number))

function game(p1, p2) {
    let seen = new Set();

    while(p1.length && p2.length) {
        let key = p1.join(",") + "-" + p2.join(",");
        if(seen.has(key)) return [0, p1];
        seen.add(key);

        let p1c = p1.shift();
        let p2c = p2.shift();

        if (p1c <= p1.length && p2c <= p2.length) winner = game(p1.slice(0, p1c), p2.slice(0, p2c))[0];
        else winner = p1c < p2c;

        if(!winner) p1 = p1.concat([p1c, p2c]);
        else p2 = p2.concat([p2c, p1c]);
    }

    return p1.length ? [0, p1] : [1, p2];
}

console.log(game(player1, player2)[1].reduce((ac, c, i, a) => ac + c * (a.length - i), 0));
