# 重学css

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

## 盒、正常流

### IFC

可以简单的理解为从左到右的就是IFC。

一行的排布，大致从左到右排，可能遇到文字，还可能遇到有宽高inline-box，他们会有一个对齐关系。

在更新的CSS标准中，display分成两部分，分别是带和不带inline的版本。如flex和inline-flex。

放文字进入行，会产生行盒，行盒不对应任何元素，是一个虚拟元素，first-line就是应用了这个行盒，实际上就是第一个line-box。

在一个行内元素里放很多inline文字，就会产生很多行的看不见的行盒。给这个行内元素设背景色看到的就是这些行盒内包含的inline盒。

### BFC

可以简单的理解为从上到下的就是BFC。
line-box可以和block-box一起从上到下排在纵轴。

记住下面这个表现原则：如果一个元素具有 BFC，内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外部的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。

Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline

Vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线” ”底部“

vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 线吗。

inline-block:可以当两部分看，对外面的它的兄弟节点来说，他是一个inline元素，对它包含的元素来说，他是一个可以包含block的container，建立BFC

https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/#flex-items

block-level 表示可以被放入bfc
block-container 表示可以容纳bfc
block-box = block-level + block-container
block-box 如果 overflow 是 visible， 那么就跟父bfc合并
