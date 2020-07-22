// 时间线
export class Timeline {
    constructor() {
        this.animations = []
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
        let animations = this.animations.filter(animation => !animation.finished)
        for(let animation of animations) {
            let { object, property, template, start, end, delay, duration, timingFunction, addTime } = animation
            let progression = timingFunction((t - delay - addTime) / duration) // 0 - 1之间

            if(t > duration + delay + addTime) {
                progression = 1
                animation.finished = true
            }

            let value = animation.valueFromProgression(progression)

            object[property] = template(value)
        }

        if(animations.length)
            // 保证this指向
            this.requestID = requestAnimationFrame(() => this.tick())
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
        this.animations = []
        this.requestID = null
        this.state = 'playing'
        this.startTime = Date.now()
        this.pauseTime = null
        this.tick()
    }

    add(animation, addTime) {
        this.animations.push(animation)
        animation.finished = false
        if(this.state === 'playing') {
            console.log(animation)
            animation.addTime = addTime !== void 0 ? addTime : (Date.now() - this.startTime)
        } else {
            animation.addTime = addTime !== void 0 ? addTime : 0
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