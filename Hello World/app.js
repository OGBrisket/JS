console.log(__dirname)
// console.log(require)
// console.log(module)
// console.log(process)


// brings in the names from myCards
const names = require('./myCards.js')
console.log(names)

console.log('yes')

// Bring in HTTP module
const http = require('http')

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.end('Welcome to my homepage')
    }
    if(req.url === '/about') {
        res.end('Here is my short history')
    }

})



server.listen(521)