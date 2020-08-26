import {create, Wrapper, Text} from '../createElement'

export class LisrView {
    constructor(config) {
        this.children = []
        this.attributes = new Map()
        this.properties = new Map()
        this.state = Object.create(null)
    }

    setAttribute(name, value) { // attribute
        this[name] = value
    }

    getAttribute(name) { // attribute
        return this[name]
    }

    appendChild(child) { // children
        this.children.push(child)
    }

    render() {
        let data = this.getAttribute('data')
        return <div class='list-view'>
           {
               data.map(this.children[0])
           }
        </div>
    }
    
    mountTo(parent) {
        this.render().mountTo(parent)
    }
}