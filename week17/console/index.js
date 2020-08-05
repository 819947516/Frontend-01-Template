var tty = require('tty')
var ttys = require('ttys')
var rl = require('readline')

var stdin = ttys.stdin
var stdout = ttys.stdout

// // stdout.write('hello world\n')
// // stdout.write('\033[1A')
// // stdout.write('winter\n')
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// async function ask(content) {
//     return new Promise((resolve, reject) => {
//         rl.question(content, (answer) => {
//             // TODO：将答案记录在数据库中。
//             // console.log(`感谢您的宝贵意见：${answer}`)
//             resolve(answer)
//             // rl.close()
//         })
//     })
// }

// void async function() {
//     console.log(await ask('your name?'))
// }()


// var stdin = process.stdin

stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')

function getChar() {
    return new Promise(resolve => {
        stdin.on('data', function(key) {
            resolve(key)
        })
    })
}

function up(n = 1) {
    stdout.write('\033['+n+'A')
}

function down(n = 1) {
    stdout.write('\033['+n+'B')
}

function right(n = 1) {
    stdout.write('\033['+n+'C')
}

function left(n = 1) {
    stdout.write('\033['+n+'D')
}

void async function() {
    stdout.write('what do you want to use?\n')
    await select(['vue', 'react', 'angular'])


    
}()

async function select(choicesArr) {
    let selected = 0

    for(let i = 0; i < choicesArr.length; i++) {
        let choice = choicesArr[i]
        if(selected === i) {
            stdout.write('[x] ' + choice + '\n')
        } else {
            stdout.write('[ ] ' + choice + '\n')
        }
    }
    // 移动光标到初始位置
    up(choicesArr.length)
    right()

    while(true) {
        let char = await getChar()
        if(char === '\u0003') {
            process.exit()
            break
        }
        // console.log(char.split('').map(c => c.charCodeAt(0)))

        if(char === 'w') {
            
        }
    }


}