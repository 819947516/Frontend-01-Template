// 时间线
export class Timeline {
    constructor() {
        this.animations = new Set()
        this.finishedAnimaitons = new Set()
        this.addTimeMap = new Map()
        this.requestID = null
        this.state = 'inited'
        this.pauseTime = null
        this.startTime = null

        // 方便保证this指向
        // this.tick = () => {
        //      ...
        //      ...
        //      if(animations.length)
        //         this.requestID = requestAnimationFrame(this.tick)
        // }
    }

    tick() {
        let t = Date.now() - this.startTime 
        // console.log(t)
        // let animations = this.animations.filter(animation => !animation.finished)
        for(let animation of this.animations) {
            let { object, property, template, start, end, delay, duration, timingFunction } = animation
            let addTime = this.addTimeMap.get(animation)

            if(t < delay + addTime)
                continue

            let progression = timingFunction((t - delay - addTime) / duration) // 0 - 1之间

            if(t > duration + delay + addTime) {
                progression = 1
                // animation.finished = true
                this.animations.delete(animation)
                this.finishedAnimaitons.add(animation)
            }

            let value = animation.valueFromProgression(progression)

            object[property] = template(value)
        }

        if(this.animations.size)
            this.requestID = requestAnimationFrame(() => this.tick()) // 保证this指向
        else 
            this.requestID = null
    }

    pause() {
        if(this.state !== 'playing')
            return
        this.state = 'paused'
        this.pauseTime = Date.now()
        if(this.requestID !== null)
            cancelAnimationFrame(this.requestID)
    }

    resume() {
        if(this.state !== 'paused')
            return
        this.state = 'playing'
        this.startTime += Date.now() - this.pauseTime
        this.tick()
    }

    start() {
        if(this.state !== 'inited')
            return
        this.state = 'playing'
        this.startTime = Date.now()
        this.tick()
    }

    restart() {
        if(this.state === 'playing') 
            this.pause()

        for(let animation of this.finishedAnimaitons)
            this.animations.add(animation)
        
        this.finishedAnimaitons = new Set()
        this.requestID = null
        this.state = 'playing'
        this.startTime = Date.now()
        this.pauseTime = null
        this.tick()
    }

    reset() {
        if(this.state === 'playing') 
            this.pause()
        this.animations = new Set()
        this.finishedAnimaitons = new Set()
        this.addTimeMap = new Map()
        this.requestID = null
        this.startTime = Date.now()
        this.pauseTime = null
        this.state = 'inited'
    }

    add(animation, addTime) {
        this.animations.add(animation)
        // animation.finished = false
        if(this.state === 'playing' && this.requestID === null) { 
            this.tick()
        }

        if(this.state === 'playing') {
            this.addTimeMap.set(animation, addTime !== void 0 ? addTime : (Date.now() - this.startTime))
            // animation.addTime = addTime !== void 0 ? addTime : (Date.now() - this.startTime)
        } else {
            this.addTimeMap.set(animation, addTime !== void 0 ? addTime : 0)
            // animation.addTime = addTime !== void 0 ? addTime : 0
        }
    }
}

// 动画
export class Animation {
    constructor({
        object,
        property,
        template,
        start,
        end,
        duration,
        delay, 
        timingFunction
    }) {
        this.object = object
        this.property = property
        this.template = template
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay
        this.timingFunction = timingFunction
        
    }

    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start)
    }
}

export class ColorAnimation {
    constructor({
        object,
        property,
        template = (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`),
        start,
        end,
        duration,
        delay, 
        timingFunction
    }) {
        this.object = object
        this.property = property
        this.template = template
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay
        this.timingFunction = timingFunction
        
    }

    valueFromProgression(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a)
        }
    }
}

/*
    属性动画
    object 
    property
    start
    end
    duration (ms)
    delay (ms)
    timingFunction
 
    let animation =  new Animation(object, property, start, end, duration, delay, timingFunction) 
    let animation2 =  new Animation(object, property, start, end, duration, delay, timingFunction) 

    // animation.start()    animation2.start()
    // animation.pause()
    // animation.resume()
    // animation.stop()

    // 时间线设计
    let timeline = new Timeline()
    timeline.add(animation)
    timeline.add(animation2)

    timeline.start()
    timeline.pause()
    timeline.resume()
    timeline.stop()
    
    // 循环方式三选一
    setTimeout
    setInterval
    requestAnimationFrame
   
*/