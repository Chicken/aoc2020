const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split input by newlines
const input = inputFile.trim().split("\n").map(l => {
    // loop lines
    // use regex to match all the the allergens
    // split allergens by , to get an array
    let alg = l.match(/\(contains (.+)\)/i)[1].split(", ");
    // split by ( and space to get list of ingredients 
    let ing = l.split(" (")[0].split(" ");
    // return object of allergens and ingredients
    return { alg, ing };
});

// object to list all possible ingredients for allergen
let algs = {};

// loop all foods
for(let food of input) {
    // loop all allergens of the food
    for(let alg of food.alg) {
        // if the allergen is already in the object, skip it
        if(Object.keys(alg).includes(alg)) continue;
        // set the allergen in the array to to a an array
        // of ingredients that are included in every food that has the allergen
        // filter the ingredients
        algs[alg] = food.ing.filter(i => {
            // filter all foods that have the allergen
            return input.filter(f => {
                return f.alg.includes(alg);
            // and test that all of those foods include the ingredient
            }).every(f => {
                return f.ing.includes(i);
            })
        })
    }
}

// log the total number of ingredients that arent possible allergens
console.log(input.reduce((total, f) => {
    // return total plus length of filtered ingredient array
    return total + f.ing.filter(i => {
        // test that none of the allergen possibilities include the ingredient
        return !Object.values(algs).some(a => a.includes(i));
    }).length;
}, 0))
