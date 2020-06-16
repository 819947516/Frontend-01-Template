# DOM API

## Range API 隶属DOM API

```js
// 必要api 创建range
// 1
var range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)
// 2
var range = document.getSelection().getRangeAt(0)

// 一些 range api
range.setStartBefore
range.setEndBefore
range.setStartAfter
range.setEndAfter

range.selectNode
range.selectNodeContents

// range api 用来做什么 适合海量执行和经起操作

var fragment = range.extractContents() // 摘出range里面的内容，创建一个fragment，一种文档片段，当append fragment内的搜有子元素append上去，本身不会

range.insertNode(document.creactTextNode('text')) // 在元素文本之间拆入内容，十分精细

```

## CSSOM

## tictactoe
