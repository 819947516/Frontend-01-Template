import {create, Wrapper, Text} from './createElement'
import { Timeline, Animation} from './animation'
import { EASE } from './animation/cubicBezier'
// import { enableGesture } from './gesture'

export class Carousel {
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
        let tl = new Timeline()
        // window.tl = tl        
        tl.start()
        let position = 0
        let nextPicStopHandler = null
        
        let children = this.data.map((url ,currentPosition) => {
            let lastPositon = (currentPosition - 1 + this.data.length) % this.data.length
            let nextPositon = (currentPosition + 1) % this.data.length

            let offset = 0 // 捡起时的偏移量

            let onStart = () => {
                tl.pause()
                clearTimeout(nextPicStopHandler)
                let currentElement = children[currentPosition]
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1])
                
                offset = currentTransformValue + 500 * currentPosition // 计算当前的偏移量
                
            }
            let onPanmove = event => {
                let currentElement = children[currentPosition]
                let lastElement = children[lastPositon]
                let nextElement = children[nextPositon]

                let {clientX, startX} = event.detail
                let dx = clientX - startX

                let currentTransformValue = -500 * currentPosition + offset + dx
                let lastTransformValue = -500 -500 * lastPositon + offset + dx
                let nextTransformValue = 500 -500 * nextPositon + offset + dx

                

                currentElement.style.transform = `translateX(${currentTransformValue}px)`
                lastElement.style.transform = `translateX(${lastTransformValue}px)`
                nextElement.style.transform = `translateX(${nextTransformValue}px)`
            }

            let onPanend = event => {
                let direction = 0

                let {clientX, startX} = event.detail
                let dx = clientX - startX

                if(dx + offset > 250) {
                    direction = 1
                } else if(dx + offset < -250) {
                    direction = -1
                }
                
                tl.reset()
                tl.restart()
                let currentElement = children[currentPosition]
                let lastElement = children[lastPositon]
                let nextElement = children[nextPositon]

                let currentTransformValue = -500 * currentPosition + offset + dx
                let lastTransformValue = -500 -500 * lastPositon + offset + dx
                let nextTransformValue = 500 -500 * nextPositon + offset + dx

                let currentAnimation = new Animation({
                    object: currentElement.style,
                    property: 'transform',
                    template: v => `translateX(${v}px)`,
                    start: currentTransformValue,
                    end: (-500 * currentPosition + direction*500),
                    duration: 500,
                    delay: 0,
                    timingFunction: EASE
                })
                let lastAnimation = new Animation({
                    object: lastElement.style,
                    property: 'transform',
                    template: v => `translateX(${v}px)`,
                    start: lastTransformValue,
                    end: (-500 -500 * lastPositon + direction*500),
                    duration: 500,
                    delay: 0,
                    timingFunction: EASE
                })
                let nextAnimation = new Animation({
                    object: nextElement.style,
                    property: 'transform',
                    template: v => `translateX(${v}px)`,
                    start: nextTransformValue,
                    end: (500 -500 * nextPositon + direction*500),
                    duration: 500,
                    delay: 0,
                    timingFunction: EASE
                })
                tl.add(currentAnimation)
                tl.add(lastAnimation)
                tl.add(nextAnimation)

                position = (position - direction + this.data.length) % this.data.length
                nextPicStopHandler = setTimeout(nextPic, 3000)
            }

            let ele = <img src={url} enableGesture={true} onStart={onStart} onPanmove={onPanmove} onPanend={onPanend}/>
            ele.style.transform = 'translateX(0px)'
            ele.addEventListener('dragstart', e => e.preventDefault())
            return ele
        })

        let root = <div class="carousel">
            { children }
        </div>
        
        let nextPic = () => {
            let nextPositon = (position + 1) % this.data.length
            let current = children[position]
            let next = children[nextPositon]

            let currentAnimation = new Animation({
                object: current.style,
                property: 'transform',
                template: v => `translateX(${5*v}px)`,
                start: (-100*position),
                end: (-100 -100*position),
                duration: 500,
                delay: 0,
                timingFunction: EASE
            })
            let nextAnimation = new Animation({
                object: next.style,
                property: 'transform',
                template: v => `translateX(${5*v}px)`,
                start: (100 -100*nextPositon),
                end: (-100*nextPositon),
                duration: 500,
                delay: 0,
                timingFunction: EASE
            })

            tl.add(currentAnimation)
            tl.add(nextAnimation)
            // tl.tick()

            position = nextPositon
            // window.xstopHandle = 
            nextPicStopHandler = setTimeout(nextPic, 3000)
        }
        
        nextPicStopHandler = setTimeout(nextPic, 3000)
        return root
    }
    
    mountTo(parent) {
        this.render().mountTo(parent)
    }
}