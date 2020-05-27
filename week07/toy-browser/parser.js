let css = require('css')
let layout =  require('./layout')
let currentToken = null 
let currentAttribute = null 
let currentTextNode = null

let rules = []
function addCssRules(text) {
    var ast = css.parse(text)
    // console.log(JSON.stringify(ast, null, '      '))
    rules.push(...ast.stylesheet.rules)
}

function computerCss(element) {
    var elements = stack.slice().reverse()
    if(!element.computedStyle)
        element.computedStyle = {}
    
    for(let rule of rules){
        var selectorParts = rule.selectors[0].split(' ').reverse()
        if(!match(element, selectorParts[0]))
            continue
        
        let matched = false
        var j = 1
        for(var i = 0; i < element.length; i++) {
            if(match(element[i], selectorParts[j])) {
                j ++
            }
        }
        if(j >= selectorParts.length)
            matched = true
        if(matched) {
            // console.log('匹配')
            // console.log('element', element, 'match rule', rule)
            var sp = specificity(rule.selectors[0])
            var computedStyle = element.computedStyle
            for(var declaration of rule.declaration){
                if(!computedStyle[declaration.property]){
                    computedStyle[declaration.property] = {}
                }

                if(!computedStyle[declaration.property].specificity){
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }else if(compare(computedStyle[declaration.property].specificity, sp) < 0){
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }
            }
            // console.log(element.computedStyle)
        }
    }
}

function match(element, selector) {
    if(!selector || !element.attributes) {
        return false
    }

    if(selector.charAt(0) == '#'){
        var attr = element.attributes.filter(attr => attr.name === 'id')[0]
        if(attr && attr.value === selector.replace('#',''))
            return true
    }else if(selector.charAt(0) == '.'){
        var attr = element.attributes.filter(attr => attr.name === 'class')[0]
        if(attr && attr.value === selector.replace('#',''))
            return true
    }else {
        if(element.tagName === selector)
        return true
    }
    return false
}

function specificity(selector) {
    var p = [0, 0, 0, 0]
    var selectorParts = selector.split(' ')
    for(var part of selectorParts) {
        if(part.charAt[0] == '#') {
            p[1] += 1
        } else if (part.charAt[0] == '.'){
            p[2] += 1
        } else {
            p[3] += 1
        }
    }
    return p
}

function compare(sp1, sp2) {
    if(sp1[0] - sp2[0])
        return sp1[0] - sp2[0]
    if(sp1[1] - sp2[1])
        return sp1[1] - sp2[1]
    if(sp1[2] - sp2[2])
        return sp1[2] - sp2[2]

    return sp1[3] - sp2[3]
}

let stack = [
    {type: 'document', children: []}
]
function emit(token) {
    let top = stack[stack.length - 1]
    if(token.type == 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: []
        }
        element.tagName = token.tagName
        for(let p in token) {
            if(p != 'type' && p!='tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }

        computerCss(element)

        top.children.push(element)
        element.parent = top
        if(!token.isSelfClosing)
            stack.push(element)
        currentTextNode = null
    } else if (token.type == 'endTag') {
        if(top.tagName != token.tagName) {
            throw new Error('no match')
        } else {
            // 遇到style标签，执行css规则
            if(top.tagName == 'style') {
                // console.log(top)
                addCssRules(top.children[0].content)
            }
            // 排版
            layout(top)
            stack.pop()
        }
        currentTextNode = null
    } else if (token.type == 'text') {
        if(currentTextNode == null) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
}

const EOF = Symbol('EOF')  // EOF: End Of File

function data(c) {
    if(c == '<') {  // 遇到<进入 tag 标签的开始状态
        return tagOpen
    } else if (c == EOF) {
        emit({
            type: 'EOF'
        })
        return
    } else {
        emit({
            type: 'text',
            content: c
        })
        return data
    }
}

function tagOpen(c) {
    // 此状态里面遇到 / 标识是结束tag标签
    // 遇到字母则为标签名
    if(c == '/') {
        return endTagOpen
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        emit({
            type: 'text',
            content: c
        })
        return
    }
}

function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)) {  // 遇到制表符（tab） 换行 换页 空格；标识需进入添加属性状态
        return beforeAttributeName
    } else if (c =='/') {   // 自封闭标签
        return selfCloseingStartTag
    } else if (c.match(/^[a-zA-Z]$/)) { // 任然是标签名称状态
        currentToken.tagName += c // .toLowerCase();
        return tagName
    } else if (c == '>') {
        emit(currentToken)
        return data
    } else {
        return tagName
    }
}

function endTagOpen(c) {
    // 结束标签 配置标签名称
    if(c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)  // 进入tagName状态进行处理
    } else if(c == '>') {

    } else if (c == EOF) {

    } else {

    }
}

function beforeAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c == '/' || c == '>' || c == EOF) {
        return afterAttributeName(c)
    } else if (c == '=') {

    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function attributeName(c) {
    if(c.match(/^[\t\n\f ]$/) || c == '>' || c == EOF) {
        return afterAttributeName(c)
    } else if (c == '=') {
        return beforeAttributeValue
    } else if (c == '\u0000') {

    } else if (c == '"' || c == '\'' || c == '<') {

    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function beforeAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/) || c == '>' || c == EOF) {
        return beforeAttributeValue
    } else if (c == '"') {
        return doubleQuotedAttributeValue
    } else if (c == '\'') {
        return singleQuotedAttributeValue
    } else if (c == '>') {
        return data
    } else {
        return unquitedAttributeValue(c)
    }
}

function doubleQuotedAttributeValue(c) {
    if(c == '"') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}
function singleQuotedAttributeValue(c) {
    if(c == '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue // ??
    }
   
}
function unquitedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if (c == '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfCloseingStartTag
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c == '\u0000') {

    } else if (c == '"' || c == '\'' || c == '<' || c == '=' || c == '`') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c 
        return unquitedAttributeValue
    }
}

function afterQuotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c == '/') {
        return selfCloseingStartTag
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c == EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue // ??
    }
}

function afterAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName
    } else if (c == '/') {
        return selfCloseingStartTag
    } else if (c == '=') {
        return beforeAttributeValue
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c == EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value
        currentAttribute = {
            name: '',
            value: ''
        } 
        return attributeName(c)
    }

}

function selfCloseingStartTag(c) {
    if(c == '>') {
        currentToken.isSelfClosing = true
        return data
    } else if (c =='EOF') {

    } else {

    }
}


module.exports.parserHTML = function parserHTML(html) {
    let state = data 
    for(let c of html) {
        state = state(c)
    }
    state = state(EOF)
    return stack[0]
}