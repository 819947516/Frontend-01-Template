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

* range api 适合海量执行，精细操作(通过range.setStartAfter range.setEndAfter)

## CSSOM 不隶属DOM API

* document.styleSheets 通过html语言 或者 Dom API 创建样式表
* cssRules  玩具浏览器css parse分析css规则与之类似

### Rules

* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule("p { color: #fff}", 0)  // inser 字符串
* document.styleSheets[0].removeRule(0)

### Rule

* CSSStyleRule ---> 普通rule
    selectorText String
    style K-V结构
* CSSCharsetRule
* CSSImportRule
* CSSMediaRule
* CSSFontFaceRule
* CSSPageRule
* CSSNamespaceRule
* CSSKeyframesRule
* CSSKeyframeRule
* CSSSupportsRule
* ...

``` js
document.styleSheets[0].cssRules[0].style.color = 'red'  // cssom api 操作属性
```

### getComputedStyle

window.getComputedStyle(elt, pseudoElt)

* elt 想要获取的元素
* pseudoElt 可选，伪元素

### CSSOM View部分

```js
window.open("about:blank", "_blank", "width=100,height=100,left=100,top=100")
childWindow.moveBy(-50, -50); // moveTo
childWindow.resizeBy(50, 50); // resizeTo

window.scrollX // scroll系列
window.scrollY
window.scrollBy
window.scrollTo

element.scrollBy // 元素滚动系列与window存在差异
element.scrollTo
element.scrollTop
element.scrollLeft
element.scrollHeight / element.scrollWidth

// 元素重要信息相关 适用于拖拽等操作
element.getClientRects()[0]  // 直接获取准确位置    inline元素产生多个行盒 所以getClientRects()获取的是数组
element.getBundingClientRect() // 获取一个整体，会根据实际渲染区域来获取，受外部滚动影响


```

## tictactoe

难点：递归判断bestChoice
