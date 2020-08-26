import {create, Wrapper, Text} from '../createElement'

export class TabPanel {
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
        // console.log(this.children)
        this.childView = this.children.map(child => {
            return <div style='width: 300px; min-height: 300px;'>
                {child}
            </div>
        })
        this.titleViews = this.children.map((child, i) => {
            return <span onClick = {() => this.select(i)}>
                {child.getAttribute('title')}
            </span>
        })

        setTimeout(() => {
            this.select(0)
        }, 16)

        return <div style='width: 500px; min-height: 400px;outline: 1px solid #000;'>
            <h1 class='tab-panel' style='background-color: lightgreen;margin: 0;'>{this.titleViews}</h1>
            <div>
                {this.childView}
            </div>
        </div>
    }
    
    mountTo(parent) {
        this.render().mountTo(parent)
    }

    select(i) {
        for(let view of this.childView) {
            view.style.display = 'none'
        }
        this.childView[i].style.display = ''

        for(let view of this.titleViews) {
            view.classList.remove('selected')
        }
        this.titleViews[i].classList.add('selected')
    }
}