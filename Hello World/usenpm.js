// npm i package; for local
// npm install -g package; for global

// package.json - manifest file
// create first with npm init

const _ = require('lodash')

const items = [1, [2, [3, [4]]]]
const newItems = _.flattenDeep(items)
console.log(newItems)

// running npm install with the package.json file in the repo, it'll automatically install those, preventing you from needing to include package in repo
