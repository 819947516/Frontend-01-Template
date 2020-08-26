// console.log('Hello, world!');
// phantom.exit();
// http://localhost:8080/
// https://www.baidu.com/
var page = require('webpage').create();
page.open('http://localhost:8081/', function(status) {
    console.log('Status: ' + status);
    /*
    if(status === 'success') {
        page.render('./localhost.png');
     }
    */


    /*
    if(status === 'success'){
        var body = page.evaluate(function() {
            // console.log(document.body)
            var toString = function(pad, ele) {
                var children = ele.children;
                var childrenSrting = '';
                for(var i=0; i<children.length; i++) {
                    childrenSrting += toString('    ' + pad , children[i]) + '\n';
                }
                return pad + ele.tagName + (childrenSrting ? '\n' + childrenSrting : childrenSrting);
            }
            return toString('', document.body);
            // return document.body.tagName;
        });
        console.log(body);
    }
    */


    
    if(status === 'success'){
        var body = page.evaluate(function() {
            var toString = function(pad, ele) {
                var children = ele.childNodes;
                var childrenSrting = '';
                for(var i=0; i<children.length; i++) {
                    childrenSrting += toString('    ' + pad , children[i]) + '\n'
                }
                // var name = ele.tagName || ele.textContent;  // 把文字也一起打印
                var name;
                if(ele.nodeType === Node.TEXT_NODE) {
                    name = '#text ' + JSON.stringify(ele.textContent);
                }
                if(ele.nodeType === Node.ELEMENT_NODE) {
                    name = ele.tagName;
                }
                return pad + name + (childrenSrting ? '\n' + childrenSrting : childrenSrting);
            }
            return toString('', document.body);
        });
        console.log(body);
    }
    
    phantom.exit();
});