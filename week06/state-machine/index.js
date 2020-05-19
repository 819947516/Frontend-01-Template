// 找a
function match1(string) {
    for (let i of string) {
        if (i === 'a')
            return true
    }
    return false
}

// console.log(match1('i am good'))

// 找ab
function match2(string) {
    let findA = false
    for (let i of string) {
        if (i === 'a')
            findA = true
        else if (findA && c === 'b')
            return true
        else
            findA = false
    }
    return false
}

// 找abcdef

function match3(string) {
    let findA = false
    let findB = false
    let findC = false
    let findD = false
    let findE = false
    for (let i of string) {
        if (i === 'a')
            findA = true
        else if (findA && i === 'b')
            findB = true
        else if (findB && i ==='c')
            findC = true
        else if (findC && i ==='d')
            findD = true
        else if (findD && i ==='e')
            findE = true
        else if (findE && i ==='f')
            return true
        else {
            findA = false
            findB = false
            findC = false
            findD = false
            findE = false
        }
    }
    return false
}

// mealy状态机
function match4(string) {
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
    if (i === 'c') {
        return findC
    } else {
        return start(i)
    }
}
function findC(i) {
    if (i === 'd') {
        return findD
    } else {
        return start(i)
    }
}
function findD(i) {
    if (i === 'e') {
        return findE
    } else {
        return start(i)
    }
}
function findE(i) {
    if (i === 'f') {
        return end
    } else {
        return start(i)
    }
}

// mealy状态机 找abcabx
function match5(string) {
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
    if (i === 'c') {
        return findC
    } else {
        return start(i)
    }
}
function findC(i) {
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
    if (i === 'x') {
        return end
    } else {
        return findB(i)
    }
}
console.log(match5('abcabcabx'))

