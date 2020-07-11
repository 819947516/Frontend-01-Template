function create(Cls, attributes, ...children) {
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

    for(let child of children) {
        if(typeof child === "string") {
            child = new Text(child)
        }
        o.appendChild(child)
    }
    return o
}
class Text {
    constructor(text) {
        this.root = document.createTextNode(text)
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class Wrapper {

    constructor(type) {
        this.children = []
        this.root = document.createElement(type)
    }

    setAttribute(name, value) { // attribute
        this.root.setAttribute(name, value)
    }

    appendChild(child) { // children
        
        this.children.push(child)
    }

    mountTo(parent) {
        parent.appendChild(this.root)
        for(let child of this.children) {
            child.mountTo(this.root)
        }
    }
}

class MyConponent {
    constructor(config) {
        this.children = []
        this.root = document.createElement('div')
    }

    setAttribute(name, value) { // attribute
        this.root.setAttribute(name, value)
    }

    appendChild(child) { // children
        this.children.push(child)
    }

    render(h) {
        return <article>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }

    mountTo(parent) {
        this.slot = <div></div>
        for(let child of this.children) {
            this.slot.appendChild(child)
        }
        this.render().mountTo(parent)
    }
}

let component = <MyConponent id='a' class='b' style='width: 100px; height: 100px; background-color: green;'> 
    <span>1</span>
    <div>{new Wrapper('span')}</div>
    <div></div>
</MyConponent>


component.mountTo(document.body)


/*
 *  
var component = createElement(
    Parent, 
    {
        id: "a",
        "class": "b"
    }, 
    createElement(Child, null), 
    createElement(Child, null), 
    createElement(Child, null)
);
*/
