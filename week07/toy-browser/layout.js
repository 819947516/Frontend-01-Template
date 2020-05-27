function getStyle(element) {
    if(!element.style) {
        element.style = {}
    }

    for(let prop in element.computedStyle) {
        var p = element.computedStyle.value
        element.style[prop] = element.computedStyle[prop].value


        if(element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
        
    }
}