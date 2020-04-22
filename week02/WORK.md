# Work

## 写一个正则表达式 匹配所有 Number 直接量

    *标准166页 number语法定义
    *确定所有类型(10(. e + -) 2 8 16 进制)
    *正则

类型：12  12.3  .3  3. 3.e10  12.3e10  12.3E10  0b1011  0o10  0x3f

    ```javascript

    function testNumber(value) {
        let reg = /^[+-]?[0-9]*\.?[0-9]*[eE][+-]?[0-9]*$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/g
        return reg.test(value)
    }


    ```

## 写一个 UTF-8 Encoding 的函数

教程 [通过javascript进行UTF-8编码](https://www.cnblogs.com/doublenet/p/5616451.html)

    ```javascript
    function UTF8Encoding(str) {
    return str
        .split('')
        .map((s) => `\\u${s.charCodeAt().toString(16)}`)
        .join('')
    }
    ```

## 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

    ```javascript

    function testString(value) {
        let reg = / /
        return reg.test(value)
    }

    ```
