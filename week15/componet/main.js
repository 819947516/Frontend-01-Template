import {create, Wrapper, Text} from './createElement'
import { Timeline, Animation} from './animation/animation.js'
import { cubicBezier } from './animation/cubicBezier.js'

class Carousel {
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
        let children = this.data.map(url => {
            let ele = <img src={url} />
            ele.addEventListener('dragstart', e => e.preventDefault())
            return ele
        })

        let root = <div class="carousel">
            { children }
        </div>
        
        let tl = new Timeline()
        tl.start()

        let ease = cubicBezier(.25,.1,.25,1)

        let position = 0
        let nextPic = () => {
            let nextPositon = (position + 1) % this.data.length
            let current = children[position]
            let next = children[nextPositon]

            // current.style.transition = 'ease 0s'
            // next.style.transition = 'ease 0s'

            // 初始位置
            current.style.transform = `translateX(${-100*position}%)` 
            next.style.transform = `translateX(${100 -100*nextPositon}%)`
            let currentAnimation = new Animation({
                object: current.style,
                property: 'transform',
                template: v => `translateX(${v}%)`,
                start: (-100*position),
                end: (-100 -100*position),
                duration: 500,
                delay: 0,
                timingFunction: ease
            })
            let nextAnimation = new Animation({
                object: next.style,
                property: 'transform',
                template: v => `translateX(${v}%)`,
                start: (100 -100*nextPositon),
                end: (-100*nextPositon),
                duration: 500,
                delay: 0,
                timingFunction: ease
            })
            tl.add(currentAnimation)
            tl.add(nextAnimation)
            tl.tick()
            position = nextPositon
            // setTimeout(function(){
                // current.style.transform = `translateX(${-100 -100*position}%)`
                // next.style.transform = `translateX(${-100*nextPositon}%)`
            // }, 16)  // 16 表示1帧
            setTimeout(nextPic, 3000)
        }
        root.addEventListener('mousedown', event => {
            let startX = event.clientX
            
            let lastPositon = (position - 1 + this.data.length) % this.data.length
            let nextPositon = (position + 1) % this.data.length

            // nodes
            let current = children[position]
            let last = children[lastPositon]
            let next = children[nextPositon]

            current.style.transition = 'ease 0s'
            last.style.transition = 'ease 0s'
            next.style.transition = 'ease 0s'

            current.style.transform = `translateX(${-500*position}px)` 
            last.style.transform = `translateX(${-500 -500*lastPositon}px)`
            next.style.transform = `translateX(${500 -500*nextPositon}px)`


            let move = e => {
                current.style.transform = `translateX(${e.clientX - startX -500*position}px)` 
                last.style.transform = `translateX(${e.clientX - startX -500 -500*lastPositon}px)` 
                next.style.transform = `translateX(${e.clientX - startX +500 -500*nextPositon}px)` 
            }
            let up = e => {
                let offset = 0
                if(e.clientX - startX > 250) {
                    offset = 1
                } else if(e.clientX - startX < -250) {
                    offset = -1
                }

                current.style.transition = '' // = '' means use css rule
                last.style.transition = ''
                next.style.transition = ''

                current.style.transform = `translateX(${offset*500 -500*position}px)` 
                last.style.transform = `translateX(${offset*500 -500 -500*lastPositon}px)`
                next.style.transform = `translateX(${offset*500 +500 -500*nextPositon}px)`

                position = (position - offset + this.data.length) % this.data.length

                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }
            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        })
        setTimeout(nextPic, 3000)
        return root
    }
    
    mountTo(parent) {
        this.render().mountTo(parent)
    }
}

let component = <Carousel data = {
    ["https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"]
}></Carousel>

component.mountTo(document.body)