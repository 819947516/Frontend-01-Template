# 异步、寻路、正则

## 异步

* setTimeout
* promise
* async 目前最优
* gennerator

### 循环打印1234

```js
    var a = 1
    setInterval(function(){
        a++
        console.log(a)
    }, 1000)

    async function* g() {
        let i = 0
        while(true) {
            await sleep(1000)
            yield i++
        }
    }

    for await(let v of g()) {
        console.log(v)
    }
```

## 寻路算法步骤

* 写一个可以画路径的盘
* 从start点开始，判断是否为end点
* 不是则判断对应点的四周的点（将四周的点加push入一个队列当中，每次从队列中取出一点判断）
* 找到end点后，存路径点
* 启发函数 直线距离作为最有距离 必定找到最优路径
* 优化数据结构（二叉堆，js常用数组表示，对象消耗内存较大）

寻路算法，有广度优先和深度优先两种，广度可以找到最优路径。

## 正则

* match
* replaec
* exce 重点

### match

```js
"abc".match(/a(b)c/)  // 捕获b  不推荐带 /g
"[a=value]".match(/\[([^=]+)=([^\]]+)\]/)
"[a=value]".match(/\[?:([^=]+)=([^\]]+)\]/)  // ?:（）不捕获
```

### replace

```js
// 可以接一个函数
"abc".replace(/a(b)c/, function(str, $1){
    console.log(str, $1)
    return str + $1
}) // abc b

"abc".replace(/a(b)c/, "$1$1")  // bb
"abc".replace(/a(b)c/, "$$1$$1")  // $1$1

```

### exce

```js
let lastIndex = 0
let token

do {
    token = inputElement.exec(source)
    console.log(token)
} while (inputElement.lastIndex - lastIndex == token.length)


```
