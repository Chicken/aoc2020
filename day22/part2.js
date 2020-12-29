const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split input by empty newline, map it to arrays of numbers and destructure  it to two variables
const [ player1, player2 ] = inputFile.split("\n\n").map(p => p.split("\n").slice(1).map(Number))

// function to simulate game
function game(p1, p2) {
    // set of seen deck combinations
    let seen = new Set();

    // while both still have cards
    while(p1.length && p2.length) {
        // hash the decks to a string
        let key = p1.join(",") + "-" + p2.join(",");
        // if we have seen the key, return that the winner is p1 and player1's cards
        if(seen.has(key)) return [0, p1];
        // add the key to seen
        seen.add(key);

        // take one card from both
        let p1c = p1.shift();
        let p2c = p2.shift();

        // if either players card is smaller than their deck's size
        // then the winner is determined by a new game
        // with decks the size of their current card
        if (p1c <= p1.length && p2c <= p2.length) winner = game(p1.slice(0, p1c), p2.slice(0, p2c))[0];
        // else the winner is is the one with bigger card
        else winner = p1c < p2c;

        // if winner is player1, give both cards to them
        if(!winner) p1 = p1.concat([p1c, p2c]);
        // otherwise give the cards to player2
        else p2 = p2.concat([p2c, p1c]);
    }
    // return the player who still has cards left
    // and that player's cards
    return p1.length ? [0, p1] : [1, p2];
}

// simulate a game and take the winners cards
// then calculate store by reducing the array
// total plus current times the position in deck (length minus index because the deck is reversed)  
console.log(game(player1, player2)[1].reduce((ac, c, i, a) => ac + c * (a.length - i), 0));
