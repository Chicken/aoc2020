const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const input = inputFile.split("\n\n").map(pass => Object.fromEntries(pass.replace(/\n/g, " ").split(" ").map(f => f.split(":"))));

console.log(input.filter(pass => {
    let keys = Object.keys(pass);

    if(keys.length < 7 || (keys.length < 8 && keys.includes("cid"))) return;

    if(pass.byr < 1920 || pass.byr > 2002) return;
    if(pass.iyr < 2010 || pass.iyr > 2020) return;
    if(pass.eyr < 2020 || pass.eyr > 2030) return;

    if(pass.hgt.endsWith("cm") && (parseInt(pass.hgt) < 150 || parseInt(pass.hgt) > 193)) return;
    else if(pass.hgt.endsWith("in") && (parseInt(pass.hgt) < 59 || parseInt(pass.hgt) > 76)) return;
    else if(parseInt(pass.hgt).toString() == pass.hgt) return;

    if(!(/^#[a-f0-9]{6}$/m.test(pass.hcl))) return;
    if(!(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(pass.ecl))) return;

    if(!(/^\d{9}$/m.test(pass.pid))) return;

    return true;
}).length);