// console.log(__dirname)
// console.log(__filename);
// console.log(process.env)
import { strict as assert } from 'assert'

const a = {
    a: 'a',
}

const b = {
    a: 'a',
    b: 'b',
}

console.log(assert.deepStrictEqual(a, +0))
