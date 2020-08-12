const cormpiler = require('@vue/compiler-sfc')

// import compileTemplate from "@vue/compiler-sfc"


let outpur = cormpiler.compileTemplate({
    filename: 'example.vue',
    source: '<div>Hello world!</div>'
})

console.log(outpur)