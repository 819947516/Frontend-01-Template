import { parserHTML } from '../src/parser'
let assert = require('assert')

it('parse a single element', () => {
    let doc = parserHTML('<div></div>')
    let div = doc.children[0]
    // console.log(div)
    assert.equal(div.tagName, 'div')
    assert.equal(div.children.length, 0)
    assert.equal(div.type, 'element')
    assert.equal(div.attributes.length, 2)
})

it('parse a single element with text content', () => {
    let doc = parserHTML('<div>hello</div>')
    let div = doc.children[0]
    let text = div.children[0]
    assert.equal(text.type, 'text')
    assert.equal(text.content, 'hello')
})

it('tag mismatch', () => {
    try {
        let doc = parserHTML('<div>hello</di2v>')
    } catch(e) {
        assert.equal(e.message, `Tag start end doesn't match!`)
    }
})

it('text with <', () => {
    let doc = parserHTML('<div> a < b </div>')
    let div = doc.children[0]
    let text = div.children[0]
    assert.equal(text.type, 'text')
    assert.equal(text.content, ' a < b ')
})

it('with property', () => {
    let doc = parserHTML('<div t id = a class="cls" data=\'abc\' ></div>')
    let div = doc.children[0]
    let count = 0
    for(let attr of div.attributes) {
        if(attr.name === 't') {
            assert.equal(attr.value, '')
            count++
        }
        if(attr.name === 'id') {
            assert.equal(attr.value, 'a')
            count++
        }

        if(attr.name === 'class') {
            assert.equal(attr.value, 'cls')
            count++
        }

        if(attr.name === 'data') {
            assert.equal(attr.value, 'abc')
            count++
        }
    }
    assert.ok(count === 4)
})

it('parse a selfClosingStartTag element', () => {
    let doc = parserHTML('<DIV/>')
    let div = doc.children[0]
    for(let attr of div.attributes) {
        if(attr.name === 'isSelfClosing') {
            assert.equal(attr.value, true)
            return
        }
    }
    assert.ok(false)
})

it('parse a script element', () => {
    let doc = parserHTML('<script> abc<asdad></asdad></s1cripta></sc1ripta></scr1ipta></scri1pta></scrip1ta></script1a> </script >')
    let script = doc.children[0]
    assert.equal(script.type, 'element')
    assert.equal(script.tagName, 'script')
    assert.equal(script.children.length, 1)
    assert.equal(script.attributes.length, 2)
    let text = script.children[0]
    assert.equal(text.type, 'text')
    assert.equal(text.content, ' abc<asdad></asdad></s1cripta></sc1ripta></scr1ipta></scri1pta></scrip1ta></script1a> ')
})

it('with property \'\" + >', () => {
    let doc = parserHTML('<div id=a class="cls" data=\'abc\'></div>')
    let div = doc.children[0]
    let count = 0
    for(let attr of div.attributes) {
        if(attr.name === 'id') {
            assert.equal(attr.value, 'a')
            count++
        }

        if(attr.name === 'class') {
            assert.equal(attr.value, 'cls')
            count++
        }

        if(attr.name === 'data') {
            assert.equal(attr.value, 'abc')
            count++
        }
    }
    assert.ok(count === 3)
})

it('isSelfClosing with property', () => {
    let doc = parserHTML('<div id=a class="cls" data=\'abc\' />')
    let div = doc.children[0]
    let count = 0
    for(let attr of div.attributes) {
        if(attr.name === 'id') {
            assert.equal(attr.value, 'a')
            count++
        }

        if(attr.name === 'class') {
            assert.equal(attr.value, 'cls')
            count++
        }

        if(attr.name === 'data') {
            assert.equal(attr.value, 'abc')
            count++
        }
    }
    assert.ok(count === 3)
})

it('isSelfClosing with property no \'\"', () => {
    let doc = parserHTML('<div id=a/>')
    let div = doc.children[0]
    for(let attr of div.attributes) {
        if(attr.name === 'id') {
            assert.equal(attr.value, 'a')
            return
        }

    }
    assert.ok(false)
})

it('with property no \'\"', () => {
    let doc = parserHTML('<div      id=a></div>')
    let div = doc.children[0]
    for(let attr of div.attributes) {
        if(attr.name === 'id') {
            assert.equal(attr.value, 'a')
            return
        }

    }
    assert.ok(false)
})