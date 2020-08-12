// var assert = require('assert')
// var mod = require('../src/add')

import { add } from '../src/add'
import assert from 'assert'

// describe('Array', function () {
//     describe('#indexOf()', function () {
//         it('should return -1 when the value is not present', function () {
//             assert.equal([1, 2, 3].indexOf(4), -1)
//         })
//     })
// })
describe('add', function () {
    it('add(3, 4) should be 10', function () {
        assert.equal(add(3, 4), 10)
    })
})