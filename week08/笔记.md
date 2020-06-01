#

## 选择器语法

* 简单选择器

```css
    *
    div svg|a
    .cls
    #id
    [attr=value]
    :hover
    ::before
```

* 复合选择器

    < 简单选择器 > < 简单选择器 > < 简单选择器 >
    *或者div必须写在前面

* 复杂选择器

    < 复合选择器 > < sp > < 复合选择器 >
    < 复合选择器 > '>' < 复合选择器 >
    < 复合选择器 > '~' < 复合选择器 >
    < 复合选择器 > '+' < 复合选择器 >
    < 复合选择器 > '||' < 复合选择器 >

## 选择器的优先级

[ 行内，id，class，标签  ]

## 伪类

* 链接行为
    :any-link
    :link :visited
    :hover
    :active
    :focus
    :target

* 树结构
    :empty
    :nth-child()
    :nth-last-child()
    :first-child :last-child :only-child

* 逻辑类
    :not伪类
    :where :has

## 伪元素

::before
::after
::first-letter 第一个字母
::first-line 浏览器排版的第一行

1. Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline 

2. Vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线” ”底部“ 

3. vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 线吗。

inline-block:可以当两部分看，对外面的它的兄弟节点来说，他是一个inline元素，对它包含的元素来说，他是一个可以包含block的container，建立BFC

https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/#flex-items

block-level 表示可以被放入bfc
block-container 表示可以容纳bfc
block-box = block-level + block-container
block-box 如果 overflow 是 visible， 那么就跟父bfc合并
