import {create, Wrapper, Text} from '../createElement'

export class Panel {
    constructor(config) {
        this.children = []
        this.attributes = new Map()
        this.properties = new Map()
    }

    setAttribute(name, value) { // attribute
        this[name] = value
    }

    appendChild(child) { // children
        this.children.push(child)
    }

    render() {
        return <div style='width: 300px; min-height: 500px;outline: 1px solid #000;'>
            <h1 style='background-color: lightgreen;'>{this.title}</h1>
            <div>
                {this.children}
            </div>
        </div>
    }
    
    mountTo(parent) {
        this.render().mountTo(parent)
    }
}