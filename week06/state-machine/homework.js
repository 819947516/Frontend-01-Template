/* 
*  mealy 状态机 
*  找 abababx
*
*/

function match(string) {
    let state = start
    for(let i of string) {
        state = state(i)
    }
    return state === end
} 

function start(i) {
    if (i === 'a') {
        return findA
    } else {
        return start
    }
}
function end(i) {
    return end
}
function findA(i) {
    if (i === 'b') {
        return findB
    } else {
        return start(i)
    }
}
function findB(i) {
    if (i === 'a') {
        return findA2
    } else {
        return start(i)
    }
}

function findA2(i) {
    if (i === 'b') {
        return findB2
    } else {
        return start(i)
    }
}
function findB2(i) {
    if (i === 'a') {
        return findA3
    } else {
        return start(i)
    }
}

function findA3(i) {
    if (i === 'b') {
        return findB3
    } else {
        return start(i)
    }
}
function findB3(i) {
    if (i === 'x') {
        return end
    } else {
        return findB2(i)
    }
}
console.log(match('i am abababx aaa'))
console.log(match('i am aabababx aaa'))
console.log(match('i am ababababx aaa'))
console.log(match('i am abbabababx aaa'))
console.log(match('i am abbababx aaa'))
console.log(match('i am abcababx aaa'))