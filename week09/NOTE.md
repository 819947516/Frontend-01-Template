# 重学CSS、HTML

## css动画与绘制

* Animation

    ++ @keyframes，指定几个关键帧；
    ++ CSS animation 属性是 animation-name，animation-duration, animation-timing-function，animation-delay，animation-iteration-count，animation-direction，
    animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。

* Transition
* [貝茲曲線](https://zh.wikipedia.org/wiki/)

## 渲染与颜色

* 颜色相关......
* data uri + svg

## HTML

### DTD

需要记住的

```xml
<!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
<!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
<!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
<!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->
```

尽量不用nbsp，防止多空格合并可以用pre标签或者CSS的white-space: pre-wrap

HTML5有两种写法，一种是XHTML，严格地遵循XML语法，是XML的子集，另外一种是HTML写法，它并不遵循其它语言的规定，只遵循HTML的规定。

### 语义

文章应用为主，不强求，用好>不用>乱用

### 元素

``` html
Element: <tagname>...</tagname>
Text: text
Comment：<!--comments-->
DocmentType：<!Doctype html>
ProcessingInstruction: <?a 1?> 预处理，没啥用
CDATA: <![CDATA[]]> Text另一种语法
```

## DOM

### API

* parentNode 父节点
* childNodes 子节点
* firstChild 第一个子节点
* lastChild 最后一个子节点
* newxSibling 下一个兄弟节点
* previousSibling 前一个兄弟节点

* appendChild 末尾添加一个
* insertBefore 最前加一个
* removeChild 删除
* replaceChild 替换

* compareDocumentPosition 用于比较两个节点中的关系的函数
* contains 检查一个节点是否包含另一个节点的函数
* isEqualNode 检查两个节点是否完全相同
* isSameNode 检查两个节点是否是同一个节点，实际上在JavaScript中可以用"==="代替
* cloneNode 复制一个节点，如果传入参数true，则会联通子元素做深拷贝

### EventTarget

* 冒泡
* 捕获
* addEventListener(type, listener, useCapture)
    参数type：表示监听事件类型的字符串
    参数listener：当所监听的事件类型触发时，会接收到一个事件通知（实现了 Event 接口的对象）对象。listener 必须是一个实现了 EventListener 接口的对象，或者是一个函数。
    参数useCapture：默认false，true表示捕获事件

## TIPS

* 插入dom节点换删除之前的节点，及appned是移动节点（类似于剪切ctrl+x，不是复制ctrl+c）
* 事件委托
