function enableGesture(element) {
    let context = Object.create(null)

    let MOUSE_SYMBOL = Symbol('mouse')
    if(document.ontouchstart !== null) {
        element.addEventListener('mousedown', (event) => {
            context[MOUSE_SYMBOL] = Object.create(null)
            start(event, context[MOUSE_SYMBOL])
        
            let mousemove = event => {
                move(event, context[MOUSE_SYMBOL])
            }
        
            let mouseend = event => {
                end(event, context[MOUSE_SYMBOL])
                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseend)
            }
        
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseend)
        })
    }
    
    
    element.addEventListener('touchstart', event => {
        // 可能多指
        for(let touch of event.changedTouches) {
            context[touch.identifier] = Object.create(null)
            start(touch, context[touch.identifier])
        }
    })
    
    element.addEventListener('touchmove', event => {
        for(let touch of event.changedTouches) {
            move(touch, context[touch.identifier])
        }
    })
    
    element.addEventListener('touchend', event => {
        for(let touch of event.changedTouches) {
            end(touch, context[touch.identifier])
            delete context[touch.identifier]
        }
    })
    
    element.addEventListener('touchcancel', event => {
        for(let touch of event.changedTouches) {
            cancel(touch, context[touch.identifier])
            delete context[touch.identifier]
        }
    })
    
    // 行为抽象
    /* 判断手势
        tap
        pan
            - panstart panmove panend
        flick
        press
            - pressstart pressend
    */
    
    
    let start = (point, context) => {
        element.dispatchEvent(new CustomEvent('start', {
            detail: {
                startX: point.startX,
                startY: point.startY,
                clientX: point.clientX,
                clientY: point.clientY
            }
        }))
        context.startX = point.clientX
        context.startY = point.clientY
    
        context.moves = []
    
        context.isTap = true
        context.isPan = false
        context.isPress = false
    
        context.timeoutHandler = setTimeout(() => {
            if(context.isPan){
                return
            }
    
            context.isTap = false
            context.isPan = false
            context.isPress = true
            // console.log('pressstart')
            element.dispatchEvent(new CustomEvent('pressstart', {}))
        }, 500)
    }
    
    let move = (point, context) => {
        let dx = point.clientX - context.startX
        let dy = point.clientY - context.startY
    
        if(dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            if(context.isPress)
                // console.log('presscancel')
                element.dispatchEvent(new CustomEvent('presscancel', {}))
            context.isTap = false
            context.isPan = true
            context.isPress = false
            // console.log('panstart')
            element.dispatchEvent(new CustomEvent('panstart', {
                detail: {
                    startX: context.startY,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY
                }
            }))
        }
    
        if(context.isPan) {
            context.moves.push({
                dx,
                dy,
                t: Date.now()
            })
            
            context.moves = context.moves.filter(record => Date.now() - record.t < 300)
            // console.log('panmove')
            element.dispatchEvent(new CustomEvent('panmove', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY
                }
            }))
        }
    }
    
    let end = (point, context) => {
        if(context.isPan) {
            let dx = point.clientX - context.startX
            let dy = point.clientY - context.startY
            let record = context.moves[0]
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t)
            let isFlick = speed > 2.5
            if(isFlick) {
                // console.log('flick')
                element.dispatchEvent(new CustomEvent('flick', {
                    detail: {
                        startX: context.startX,
                        startY: context.startY,
                        clientX: point.clientX,
                        clientY: point.clientY,
                        speed: speed
                    }
                }))
            }
            // console.log('panend')
            element.dispatchEvent(new CustomEvent('panend', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed: speed,
                    isFlick: isFlick
                }
            }))
        }
    
        
        if(context.isTap){
            // console.log('tap')
            element.dispatchEvent(new CustomEvent('tap', {}))
        }
        if(context.isPress) {
            // console.log('pressend')
            element.dispatchEvent(new CustomEvent('pressend', {}))
        }
        
        clearTimeout(context.timeoutHandler)
    }
    
    let cancel = (point, context) => {
        // console.log('cancel')
        element.dispatchEvent(new CustomEvent('cancel', {}))
        clearTimeout(context.timeoutHandler)
    }
}

