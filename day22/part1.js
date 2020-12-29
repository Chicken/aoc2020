const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split input by empty newline, map it to arrays of numbers and destructure  it to two variables
let [ player1, player2 ] = inputFile.split("\n\n").map(p => p.split("\n").slice(1).map(Number))

// while both players still have cards left
while(player1.length && player2.length) {
    // take one card from both
    let p1c = player1.shift()
    let p2c = player2.shift()

    // if player ones card is large
    if(p1c > p2c) {
        // give player1 both of the cards 
        player1 = player1.concat([p1c, p2c])
    } else {
        // else give player2 the two cards
        player2 = player2.concat([p2c, p1c]);
    }
}

// determine winnder by checking length of player1's cards
// (length of 0 => lose => false => player2 and vice versa)
let winner = player1.length ? player1 : player2; 

// calculate store by reducing the array
// total plus current times the position in deck (length minus index because the deck is reversed)  
console.log(winner.reduce((ac, c, i, a) => ac + c * (a.length - i), 0))
