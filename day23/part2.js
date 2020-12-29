const fs = require("fs");
const inputFile = fs.readFileSync(__dirname + "/input.txt", { encoding: "utf-8" });

// split the input string to characters and map to numbers
let input = inputFile.split("").map(Number);

// fill the array to the length of 1 000 000
while(input.length != 1000000) input.push(input.length + 1);
// turn each element to an object with value
input = input.map(value => ({ value }));
// loop the elements and add a next property to them that points to the next element
// (or the first element if the index is the last in the array)
// this way we have a looped linked list
input.forEach((_, i) => i == input.length - 1 ? input[i].next = input[0] : input[i].next = input[i + 1]);

// map of all the nodes for the values
let map = new Map();
// loop all nodes and set their value in the map to point to the node
input.forEach(v => map.set(v.value, v));
// head (the starting point) is the first element in the array
let head = input[0];

// loop 10 000 000 rounds
for (let i = 0; i < 10000000; i++) {
    // take the values of next, next next and next next next to an array
    let picked = [ head.next.value, head.next.next.value, head.next.next.next.value ];
    // this is the head for picked values 
    let pickedHead = head.next;
    // set the real head to the node after the picked values
    head.next = head.next.next.next.next;

    // target position for picked numbers is the current values minus one
    let ptr = head.value - 1;
    // while the picked values include the pointer, reduce it
    while (picked.includes(ptr)) ptr--;
    // if the pointer went below minimum value, loop it back to the largest
    if(ptr < 1) ptr += input.length;
    // get the node for pointer
    let pos = map.get(ptr);
    // set the next value for picked numbers to be the next of pointer 
    pickedHead.next.next.next = pos.next;
    // and the next of pointer to be the head for picked values
    pos.next = pickedHead;
    // then just travelse to the next value in the linked list
    head = head.next;
}

// get the node for value of one
let one = map.get(1);
// log the multiplication of the next and next next values
console.log(one.next.value * one.next.next.value);
