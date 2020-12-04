const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n\n").map(pass => Object.fromEntries(pass.replace(/\n/g, " ").split(" ").map(f => f.split(":"))));

let valid = 0;

for(let pass of input) {
    let keys = Object.keys(pass);

    if(keys.length < 7 || (keys.length < 8 && keys.includes("cid"))) continue;

    if(pass.byr < 1920 || pass.byr > 2002) continue;
    if(pass.iyr < 2010 || pass.iyr > 2020) continue;
    if(pass.eyr < 2020 || pass.eyr > 2030) continue;

    if(pass.hgt.endsWith("cm") && (parseInt(pass.hgt) < 150 || parseInt(pass.hgt) > 193)) continue;
    else if(pass.hgt.endsWith("in") && (parseInt(pass.hgt) < 59 || parseInt(pass.hgt) > 76)) continue;
    else if(parseInt(pass.hgt).toString() == pass.hgt) continue;

    if(!(/^#[a-f0-9]{6}$/m.test(pass.hcl))) continue;
    if(!(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(pass.ecl))) continue;

    if(!(/^\d{9}$/m.test(pass.pid))) continue;

    valid++;
}

console.log(valid);