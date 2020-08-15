import { enableGesture } from './gesture'

export function create(Cls, attributes, ...children) {
    let o
    if(typeof Cls === 'string') {
        o = new Wrapper(Cls)
    } else {
        o = new Cls({
            timer: {}
        })
    }
    for(let name in attributes) {
        o.setAttribute(name, attributes[name])
    }

    let visit = (children) => {
        for(let child of children) {
            if(Array.isArray(child)) {
                visit(child)
                continue
            }
            if(typeof child === "string") {
                child = new Text(child)
            }
            o.appendChild(child)
        }
    }
    visit(children)
    return o
}

export class Text { // 处理文字
    constructor(text) {
        this.root = document.createTextNode(text)
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }

    getAttribute(name) {
        return
    }
}

export class Wrapper { // 处理小写

    constructor(type) {
        this.children = []
        this.root = document.createElement(type)
    }
    setAttribute(name, value) { // attribute
        this.root.setAttribute(name, value)

        if(name.match(/^on([\s\S]+)$/)) {
            console.log(RegExp.$1)
            let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase())
            this.addEventListener(eventName, value)
        }
        
        if(name === 'enableGesture') {
            enableGesture(this.root)
        }
    }
    getAttribute(name) {
        return this.root.getAttribute(name)
    }
    appendChild(child) { // children
        this.children.push(child)
    }
    addEventListener() {
        this.root.addEventListener(...arguments)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
        for(let child of this.children) {
            child.mountTo(this.root)
        }
    }

    get style() {
        return this.root.style
    }

    set innerText(v) {
        return this.root.innerText = v
    }

    get classList() {
        return this.root.classList
    }
}