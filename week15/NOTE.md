## Vue SFC

    整体思路：通过处理SFC文本字符串（运用到浏览解析html的parse），获取语法树结构，构造成JSX creat() 函数所需参数格式传入后生成组件

* parserHTML对script标签特殊处理，保留标签内的内容
* 对template标签内容进行构建组件

## Animation

### 如何停止CSS动画

    通过获取移动一定时间后的元素位置还控制停止时位置

    ```js

    function stop() {
        el.style.transition = 'none'
        el.style.transform = getComputedStyle(el).transform  // 已失效？？
    }

    ```

### 属性动画

* object
* property
* start
* end
* duration (ms)
* delay (ms)
* timingFunction

#### 循环方式三选一

* setTimeout
* setInterval
* requestAnimationFrame

#### 调用形式

    ```js
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
    ```
