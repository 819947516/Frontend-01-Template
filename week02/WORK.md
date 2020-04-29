# Work

## 写一个正则表达式 匹配所有 Number 直接量

1.标准166页 number语法定义
2.确定所有类型(10(. e + -) 2 8 16 进制)
3.正则

类型：12  12.3  .3  3. 3.e10  12.3e10  12.3E10  0b1011  0o10  0x3f

```javascript

function testNumber(value) {
    let reg = /^[+-]?[0-9]*\.?[0-9]*[eE][+-]?[0-9]*$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/g
    return reg.test(value)
}


```

## 写一个 UTF-8 Encoding 的函数

教程 [通过javascript进行UTF-8编码](https://www.cnblogs.com/doublenet/p/5616451.html)
教程 [字符编码笔记：ASCII，Unicode 和 UTF-8 (阮一峰)](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

```javascript
function UTF8Encoding(str) {
    let strBinary = str.codePointAt(0).toString(2)
    let strLength = strBinary.length
    let strZero = ''
    let bitCount = 0
    let arr = []
    if(strLength < 8){
        bitCount = 1
        //   strZero = '0'.repeat(7-strLength)
        for(let i = strLength; i<7; i++){
            strZero = strZero + '0'
        }
        strBinary = strZero + strBinary
        arr.push(strBinary)

    }else if(strLength < 12) {
        bitCount = 2
        for(let i = strLength; i<11; i++){
            strZero = strZero + '0'
        }
        strBinary = strZero + strBinary
        for(let i = 0; i<bitCount; i++){
            if(i = 0){
                arr[i] = '1'.repeat(bitCount)+'0' + strBinary.substring(0, 8-(bitCount+1))
            }else{
                arr[i] = '10'+ strBinary.substring(8-(bitCount+1), (bitCount*(i+1) - 1))
            }
        }
    }else if(strLength < 17) {
        bitCount = 3
        for(let i = strLength; i<16; i++){
            strZero = strZero + '0'
        }
        strBinary = strZero + strBinary
        for(let i = 0; i<bitCount; i++){
            if(i = 0){
                arr[i] = '1'.repeat(bitCount)+'0' + strBinary.substring(0, 8-(bitCount+1))
            }else{
                arr[i] = '10'+ strBinary.substring(8-(bitCount+1), (bitCount*(i+1) - 1))
            }
        }
    }else if(strLength < 22) {
        bitCount = 4
        for(let i = strLength; i<21; i++){
            strZero = strZero + '0'
        }
        strBinary = strZero + strBinary
        for(let i = 0; i<bitCount; i++){
            if(i = 0){
                arr[i] = '1'.repeat(bitCount)+'0' + strBinary.substring(0, 8-(bitCount+1))
            }else{
                arr[i] = '10'+ strBinary.substring(8-(bitCount+1), (bitCount*(i+1) - 1))
            }
        }
    }else if(strLength < 27) {
        bitCount = 5
        for(let i = strLength; i<26; i++){
            strZero = strZero + '0'
        }
        strBinary = strZero + strBinary
        for(let i = 0; i<bitCount; i++){
            if(i = 0){
                arr[i] = '1'.repeat(bitCount)+'0' + strBinary.substring(0, 8-(bitCount+1))
            }else{
                arr[i] = '10'+ strBinary.substring(8-(bitCount+1), (bitCount*(i+1) - 1))
            }
        }
    }else{
        bitCount = 6
        for(let i = strLength; i<31; i++){
            strZero = strZero + '0'
        }
        strBinary = strZero + strBinary
        for(let i = 0; i<bitCount; i++){
            if(i = 0){
                arr[i] = '1'.repeat(bitCount)+'0' + strBinary.substring(0, 8-(bitCount+1))
            }else{
                arr[i] = '10'+ strBinary.substring(8-(bitCount+1), (bitCount*(i+1) - 1))
            }
        }
    }
    return arr
}
```

## 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

标准170
StringLiteral ::
    " DoubleStringCharactersopt "
    ' SingleStringCharactersopt '

```javascript

function testString(value) {
    let reg1 = /(\"(?:[^"\\\n\r]|\\u[0-9a-fA-F]{4}|[\\\n\\\r\\u{2029}\u{2028}])+\")/
    let reg1 = / /
    // return reg.test(value)
}

```
