const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

// split by empty lines
// and create an passport object from mapped entries
const input = inputFile.split("\n\n").map(pass => Object.fromEntries(pass.replace(/\n/g, " ").split(" ").map(f => f.split(":"))));

// filter out valid passwords
console.log(input.filter(pass => {
    // get all the keys
    let keys = Object.keys(pass);

    // do the same check as before 
    if(keys.length < 7 || (keys.length < 8 && keys.includes("cid"))) return;

    // check if years are valid
    if(pass.byr < 1920 || pass.byr > 2002) return;
    if(pass.iyr < 2010 || pass.iyr > 2020) return;
    if(pass.eyr < 2020 || pass.eyr > 2030) return;

    // check if height is valid
    // different check for centimeters and inches
    // by comparing which one the height ends with
    if(pass.hgt.endsWith("cm") && (parseInt(pass.hgt) < 150 || parseInt(pass.hgt) > 193)) return;
    else if(pass.hgt.endsWith("in") && (parseInt(pass.hgt) < 59 || parseInt(pass.hgt) > 76)) return;
    else if(parseInt(pass.hgt).toString() == pass.hgt) return;

    // testing the hair color with this hex regex
    if(!(/^#[a-f0-9]{6}$/m.test(pass.hcl))) return;
    // testing if this array of colors contains the eye color
    if(!(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(pass.ecl))) return;

    // testing if the pid matches regex
    if(!(/^\d{9}$/m.test(pass.pid))) return;

    return true;
}).length);
