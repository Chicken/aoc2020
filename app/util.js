"use strict";
const fs = require("fs");
const bent = require("bent");
const { sessionId, year, templateFile: templateFileArr } = require("./config.json");
const templateFile = templateFileArr.join("\n");
const [,, sub, day, part] = process.argv;

let dayNum = parseInt(day);
if(isNaN(dayNum) || dayNum < 1 || dayNum > 25) {
    console.error("Invalid day or out of range!");
    process.exit(0);
}

const get = bent("GET", 200, "string", `https://adventofcode.com/${year}/day/${day}`, {
    Cookie: `session=${sessionId}`
});

function wordWrap(str) {
    let res = "";
    while (str.length > 100) {                 
        let found = false;
        for (let i = 99; i >= 0; i--) {
            if (/^\s$/.test(str.charAt(i))) {
                res += [str.slice(0, i), "\n"].join("");
                str = str.slice(i + 1);
                found = true;
                break;
            }
        }
        if (!found) {
            res += [str.slice(0, 100), "\n"].join("");
            str = str.slice(100);
        }
    }
    return res + str;
}

(async () => {

switch(sub) {
    case "day":
    case "start":
    case "init": {
        if(fs.existsSync(`day${day}`)) {
            console.error("That day is already initialized!");
            process.exit(0);
        }

        let input, page;
        try {
            page = await get();
            input = await get("/input");
        } catch(e) {
            console.log("That day hasn't started yet.");
            process.exit(0);
        }

        let readme = page
        .split("<article class=\"day-desc\">")[1]
        .split("</article>")[0]
        .replace(/<(.+?)>/g, tag => {
            switch(tag) {
                case "</h2>":
                    return "\n";
                default:
                    return "";
            }
        })
        readme = wordWrap(readme)

        input = input.substring(0, input.length - 1);

        fs.mkdirSync(`day${day}`);
        fs.writeFileSync(`day${day}/part1.js`, templateFile);
        fs.writeFileSync(`day${day}/readme1`, readme);
        fs.writeFileSync(`day${day}/input.txt`, input);
        console.log("Initialized the day and downloaded input. Use cmd part2.");
        process.exit(0);
    }
    case "run": {
        if(part != "1" && part != "2") {
            console.error("Invalid part number.");
            process.exit(0);
        }
        if(!fs.existsSync(`day${day}`)) {
            console.error("That day hasn't been initialized!");
            process.exit(0);
        }
        if(!fs.existsSync(`day${day}/part${part}.js`)) {
            console.error("That part hasn't been initialized!");
            process.exit(0);
        }
        console.log("Running solution...");
        require(process.cwd() + `/day${day}/part${part}.js`)
        process.exit(0)
    }
    case "part2": {
        if(!fs.existsSync(`day${day}`)) {
            console.error("You haven't even started that day!");
            process.exit(0);
        }

        let page;
        try {
            page = await get();
        } catch(e) {
            console.log("That day hasn't started yet.");
            process.exit(0);
        }

        let readme = page
        .split("<article class=\"day-desc\"><h2 id=\"part2\">")[1]
        .split("</article>")[0]
        .replace(/<(.+?)>/g, tag => {
            switch(tag) {
                case "</h2>":
                    return "\n";
                default:
                    return "";
            }
        })
        readme = wordWrap(readme)

        fs.copyFileSync(`day${day}/part1.js`, `day${day}/part2.js`);
        fs.writeFileSync(`day${day}/readme2`, readme);
        console.log("Downloaded part2.");
        process.exit(0);
    }
    case "clean":
    case "clear": {
        if(!fs.existsSync(`day${day}`)) {
            console.error("That day hasn't been initialized!");
            process.exit(0);
        }
        fs.rmdirSync(`day${day}`, { recursive: true });
        console.log("Removed the day folder.");
        process.exit(0);
    }
    default: {
        console.log("Invalid command! Valid ones are clear/clean, init/start and part2.");
        process.exit(0);
    }
}
})();