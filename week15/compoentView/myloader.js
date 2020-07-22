var parser = require('./parser')

module.exports = function runtime(source, map) {
    // console.log(source)
    // console.log(source.match(/<template>(\S*)<\/template>/)[1])
    let tree = parser.parserHTML(source)
    // console.log(tree.children[2].children[0].content)
    // console.log('myloader-------', this.resourcePath)

    let template = null
    let script = null

    for(let node of tree.children) {
        if(node.tagName == 'template') {
            template = node
        }

        if(node.tagName == 'script') {
            script = node.children[0].content
        }
    }
    console.log(template)
  
    let visit = (node) => {
        if(node.type == 'text') {
            return JSON.stringify(node.children)
        }

        let attrs = {}

        for(let attribute of node.attributes) {
            attrs[attribute.name] = attribute.value
        }

        let children = node.children.map(node => visit(node))

        return `create(${node.tagName}, ${JSON.stringify(attrs)}, ${children})`
    }

    return `
import {create, Wrapper, Text} from './createElement'
class Carousel {
    setAttribute(name, value) { // attribute
        this[name] = value
    }
    render() {
        return ${visit(template)}
    }
    mountTo(parent) {
        this.render().mountTo(parent)
    }
}
    `
}