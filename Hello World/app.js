console.log(__dirname)
// console.log(require)
// console.log(module)
// console.log(process)

// brings in the names from myCards
const names = require('./myCards.js')
console.log(names)

const hello = (name) => {
    console.log(`Hello there ${name}`);
}

// hello(firstCard)

// Every file is a module