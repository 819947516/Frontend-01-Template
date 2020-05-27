const net = require('net')
const parser = require('./parser.js')
class Requset {
    // method, url = host + port + path
    // body: k/v
    // headers
    constructor(options) {
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers['Content-Type']) 
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        if(this.headers['Content-Type'] === 'application/json')
            this.bodyText = JSON.stringify(this.body);
        else if(this.headers['Content-Type'] === 'application/x-www-form-urlencoded')
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');

        this.headers['Content-Length'] = this.bodyText.length;

    }

    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}`
    }
 
    send(connection) {
        const parser = new ResponseParser;
        return new Promise((resolve, reject) => {
            if(connection){
                connection.write(this.toString());
            }else{
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString())
                })
            }
            connection.on('data', (data) => {
                // resolve(data.toString());
                parser.receive(data.toString());
                if(parser.isFinished){
                    resolve(parser.response);
                }
                connection.end();
            });
            connection.on('error', (err) => {
                reject(err);
                client.end();
            });
            
        })
    }
}

class Response {

}

class ResponseParser{
    constructor(){
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
    }
    get isFinished(){
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response(){
        this.statusLine.match(/HTTP\/1\.1 (\d+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }
    receive(string){
        for(let i = 0; i < string.length; i++){
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char){
        if(this.current === this.WAITING_STATUS_LINE){ // 接受status line 过程
            if(char === '\r'){
                this.current = this.WAITING_STATUS_LINE_END;
            }else if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME; 
            }else{
                this.statusLine += char;
            }   
        }else if(this.current === this.WAITING_STATUS_LINE_END){  // status line结束过程
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }
        }else if(this.current === this.WAITING_HEADER_NAME){  // 进入headers name过程
            if(char === ":"){ // ： 切换状态
                this.current = this.WAITING_HEADER_SPACE;
            }else if(char === "\r"){ // 进入headers name 第一个字符就是/r时，标识进入body和header之间的换行过程
                this.current = this.WAITING_HEADER_BLOCK_END;
                if(this.headers['Transfer-Encoding'] === "chunked"){
                    this.bodyParser = new TrunkedResponseParser();
                }
            }else{
                this.headerName += char;
            }
        }else if(this.current === this.WAITING_HEADER_SPACE){ // header name过程时 ：后面接空格 标识进入header value
            if(char === " "){
                this.current = this.WAITING_HEADER_VALUE;
            }
        }else if(this.current === this.WAITING_HEADER_VALUE){ // 进入 header value过程
            if(char === "\r"){
                this.current = this.WAITING_HEADER_LINE_END; // 进入 header value 一行结束过程
                this.headers[this.headerName] = this.headerValue; 
                this.headerName = "";
                this.headerValue = "";
            }else{
                this.headerValue += char;
            }
        }else if(this.current === this.WAITING_HEADER_LINE_END){ // header value 一行结束后
            if(char === '\n'){ // header value 一行结束后是否多行判断
                this.current = this.WAITING_HEADER_NAME; 
            }
        }else if(this.current === this.WAITING_HEADER_BLOCK_END){
            if(char === '\n'){
                this.current = this.WAITING_BODY;
            }
        }else if(this.current === this.WAITING_BODY){
            this.bodyParser.receiveChar(char);
        }
    }
}

class TrunkedResponseParser{
    constructor(){
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;

        this.length = 0;
        this.content = []; // 字符串加法运算性能较差，一般用数组
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char){
        // console.log(JSON.stringify(char))
        if(this.current === this.WAITING_LENGTH){ // body 长度那行
            if(char === '\r'){ // 如果长度行后面接空格，标识长度行结束
                if(this.length === 0){ // 同时长度为0，标识整个body结束
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            }else{
                // 计算长度10进制，进一位
                this.length *= 16;
                // this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
                this.length += parseInt(char, 16);

            }   
        }else if(this.current === this.WAITING_LENGTH_LINE_END){ // 长度行结束
            if(char === '\n'){ // 进入长度行下面的内容行
                this.current = this.READING_TRUNK;
            }
        }else if(this.current === this.READING_TRUNK){
            if(this.length !== 0 ){ // 拼接内容
                this.content.push(char);
                this.length --;
            }
            if(this.length === 0){ // 内容行拼接结束，进入下一个长度行
                this.current = this.WAITING_NEW_LINE;
            }
        }else if(this.current === this.WAITING_NEW_LINE){ // 进入新的长度行前会换行
            if(char === '\r'){
                this.current = this.WAITING_NEW_LINE_END;
            }
        }else if(this.current === this.WAITING_NEW_LINE_END){
            if(char === '\n'){
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}


void async function() {
    let requset = new Requset({
        method: 'POST',
        host: '127.0.0.1',
        port: 8088,
        path: '/',
        headers: {
            ['X-Foo2']: 'customed'
        },
        body: {
            name: 'LeeJ'
        }
    });
    let response = await requset.send(); // 发送http请求
    let dom = parser.parserHTML(response.body); // 根据response构建dom

    console.log(dom)

}()

/*
const client = net.createConnection({ 
    host: '127.0.0.1',
    port: 8088 }, () => {
    // 'connect' 监听器
    // client.write('GET / HTTP/1.1\r\n');
    // client.write('Host: 127.0.0.1\r\n');
    // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    // client.write('Content-Length: 3\r\n');
    // client.write('\r\n');
    // client.write('a=1');
    let requset = new Requset({
        method: 'POST',
        host: '127.0.0.1',
        port: 8088,
        path: '/',
        headers: {
            ['X-Foo2']: 'customed'
        },
        body: {
            name: 'LeeJ'
        }
    });
    console.log(requset.toString());
    client.write(requset.toString())
});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('已从服务器断开');
});

client.on('error', (err) => {
    console.log(err);
    client.end();
});

*/