# String系列算法分析

## 正则分析string文本构建AST

### 四则运算算法

* regexp.exec() 配合（）用法
* 用正则表达式词法分析   可尝试换成状态机进行分析
* ll :  左->右 移入 左->右 合并
* lr :  左->右 移入 右->左 合并
* 根据规范定义产生式来编写

```js

    // 四则运算产生式

    <Expression> ::=
        <AdditiveExpression><EOF>

    <AdditiveExpression> ::=
        <MultiplicativeExpression>
        | <AdditiveExpression><+><MultiplicativeExpression>
        | <AdditiveExpression><-><MultiplicativeExpression>

    <MultiplicativeExpression> ::=
        <Number>
        |<MultiplicativeExpression><*><Number>
        |<MultiplicativeExpression></><Number>

```

### 字符串算法

* 字典树
   - 大量字符串的完整模式匹配
* KMP
   - 长字符串中找子串（ O(m+n) ），记录pattren部分重复内容，避免完全从头匹配
* WildCard通配符
   - 长字符串中找子串升级版，主要注意*是否贪婪，头尾匹配多好，中间匹配少好
* 正则
   - 字符串通用模式匹配
* 状态机
   - 通用的字符串分析
* LL LR
   - 字符串多层级结构分析

## 总结

    规范查看吃力，算法好难啊！！！
