# 总结

## proxy / reactivity(vue3.0)

### Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程

```js
    // proxy 用法
    let object1 = {
        a: 1,
        b: 2
    }
    let proxy1 = new Proxy(object1, {
        get(obj, prop) {
            console.log(obj, prop)
            return obj[prop]
        },
        defineProperty(object, prop, desc) {
            console.log(arguments)
            return Object.defineProperty(object, prop, desc)
        }
    })
```

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

### vue3.0 提供一个库 reactivity，主要通过reactive和effect来对对象进行控制，对其进行简单实现后需要注意

* handler包含判断表达式, 如 if ?: 时，会出现问题，得手工加依赖关系
* 检测obj中的obj reactive深度依赖绑定
* reactive\effect 可用来进行双向绑定，dom绑定。

## Range API / CSSOM

### 实现dragable基本流程

* 实现一个可以拖动的滑块
    - move和up监听需要在down内进行，需要注销监听
    - 通过transform改变位置，提升效率
* 建立文字range矩阵
* 查找最近range位置
* 滑动过去

## 组件化基础

### 组件特点

* Properties
* Methods
* Inherit
* Attribute
* Config&State
* Event
* Lifecycle
* Children

### 轮播图组件

* state

    - activeIndex

* property

    - loop
    - time
    - imgList
    - color
    - forward

* attribute

    - startIndex
    - loop
    - time
    - imgList
    - autoplay
    - color
    - forward

* children

    - 2
    - append remove add

* event

    - change
    - click
    - hover
    - swipe
    - resize
    - dbclick
   
* method

    - next() prev() goto()
    - play() stop()

* config

- mode: 'useRAF', 'useTimeout'
