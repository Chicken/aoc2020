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

// while there still exist multiple possibilities for an allergen
while(Object.values(algs).some(p => typeof p != "string")) {
    // find the allergen with only one possibility
    let [ key, [ value ] ] = Object.entries(algs).find(f => typeof f[1] != "string" && f[1].length == 1);
    // set it to just it
    algs[key] = value;
    // remote it from other allergen possibilities
    Object.keys(algs).forEach(k => {
        // by looping and splicing at the index of it
        if(typeof algs[k] != "string" && algs[k].includes(value)) algs[k].splice(algs[k].indexOf(value), 1)
    })
}

// take the entries from the array, sort alphabeticly by key (allergen name), map to ingredients and join by ,
console.log(Object.entries(algs).sort((a,b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0).map(a => a[1]).join(","));
