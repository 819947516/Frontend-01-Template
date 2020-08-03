let css = require('css')

module.exports = function runtime(source, map) {
    let stylesheet = css.parse(source)
    let name = this.resourcePath.match(/([^\\]+).css$/)[1]
    // console.log(this.resourcePath)
    console.log(name)
    for(let rule of stylesheet.stylesheet.rules) {
        // 可以通过this.path来确定不同前缀 '.craousel ' 
        rule.selectors = rule.selectors.map(selector => {
            return selector.match(new RegExp(`^.${name}`)) ? selector :
            `.${name} ${selector}`
        })
    }

    return `   
    let style = document.createElement('style')
    style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))}
    document.documentElement.appendChild(style)
    `
}