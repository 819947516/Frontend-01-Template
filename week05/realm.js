
let set = new Set()
let objects = [
    'eval',
    'isFinite',
    'isNaN',
    'parseFloat',
    'parseInt',
    'decodeURI',
    'decodeURIComponent',
    'encodeURI',
    'encodeURIComponent',
    'Array',
    'Date',
    'RegExp',
    'Promise',
    'Proxy',
    'Map',
    'WeakMap',
    'Set',
    'WeakSet',
    'Function',
    'Boolean',
    'String',
    'Number',
    'Symbol',
    'Object',
    'Error',
    'EvalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Float32Array',
    'Float64Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Uint8Array',
    'Uint16Array',
    'Uint32Array',
    'Uint8ClampedArray',
    'Atomics',
    'JSON',
    'Math',
    'Reflect'
]
let queue = []
let currentObject
objects.forEach(ele => {
    queue.push({
        path: [ele],
        object: this[ele]
    })
})

while(queue.length) {
    currentObject = queue.shift()
    if(set.has(currentObject.object)){
        continue
    }
    set.add(currentObject.object)

    for(let p of Object.getOwnPropertyNames(currentObject.object)){
        console.log(currentObject.object)
        console.log(p)
        let descriptor= Object.getOwnPropertyDescriptor(currentObject.object, p)
        
        if((descriptor.hasOwnProperty('value') && (typeof descriptor.value === "object")) || (typeof descriptor.value === "function")){
            queue.push({
                path: currentObject.path.concat([p]),
                object: descriptor.value
            })
        }
        if(descriptor.hasOwnProperty('get') && (typeof descriptor.get === 'function')){
            queue.push({
                path: currentObject.path.concat([p]),
                object: descriptor.get
            })
        }
        if(descriptor.hasOwnProperty('set') && (typeof descriptor.set === 'function')){
            queue.push({
                path: currentObject.path.concat([p]),
                object: descriptor.set
            })
        }
    }


}
console.log(set)