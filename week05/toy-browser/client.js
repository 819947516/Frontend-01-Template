const net = require('net')

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
                resolve(data.toString());
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
    let response = await requset.send();
    console.log(response)
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