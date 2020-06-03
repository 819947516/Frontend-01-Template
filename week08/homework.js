// 玩具浏览器
// function match(element, selector) {
//     if(!selector || !element.attributes) {
//         return false
//     }

//     if(selector.charAt(0) == '#'){
//         var attr = element.attributes.filter(attr => attr.name === 'id')[0]
//         if(attr && attr.value === selector.replace('#',''))
//             return true
//     }else if(selector.charAt(0) == '.'){
//         var attr = element.attributes.filter(attr => attr.name === 'class')[0]
//         if(attr && attr.value === selector.replace('#',''))
//             return true
//     }else {
//         if(element.tagName === selector)
//         return true
//     }
//     return false
// }

function match(selector, element) {
    if(!selector || !element.attributes) {
        return false
    }

    let selectorParts = selector.split(' ').reverse()
    let matched = false

    if(!matchSel(selectorParts[0], element)) {
        return matched
    }
    var j = 1

    // 感觉有点奇怪 :)!
    let ele = element.parentNode
    while(ele !== document){
        if(matchSel(selectorParts[j], ele)) {
            j ++
        }
        ele = ele.parentNode
    }

    if(j >= selectorParts.length)
        matched = true
    return matched
}
function matchSel(selector, element) {
    if(!selector || !element.attributes) {
        return false
    }
    // [ div, .xxx, #xx ]
    // 多类型一个一个匹配
    let selectorArr= selector.split(/(?=[\#\.])/g)
    for(let select of selectorArr){
        if(select.charAt(0) == "#"){ // id
            // let attr = element.attributes.filter(attr => attr.name === "id")[0]
            let attr
            for(let at of element.attributes) {
                if(at.name === "id") attr = at
                break
            }
            if(attr && attr.value !== select.replace("#", ''))
                return false
        }else if(select.charAt(0) == "."){ // class
            // let attr = element.attributes.filter(attr => attr.name === "class")[0]
            let attr
            for(let at of element.attributes) {
                if(at.name === "class") attr = at
                break
            }
            let classFalt= false
            if(attr && attr.value){
                let attrs = attr.value.split(' ')
                for(let singleAttr of attrs){
                    if(singleAttr === select.replace(".", '')){
                        classFalt = true
                        break
                    }
                }
            }
            if(!classFalt)
                return false
        }else{ // tag
            if(element.tagName !== select)
                return false
        }
    }

    return true
}
 
match("div #id.class", document.getElementById("test"))