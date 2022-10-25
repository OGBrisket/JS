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


// Bring in HTTP module
const http = require('http')

const server = http.createServer((req, res) => {
    res.write('Welcome to my homepage!')
    res.end()
})

server.listen(521)