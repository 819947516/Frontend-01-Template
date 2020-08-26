const http = require('http');
const https = require('https');
const fs = require('fs');
const unzip = require('unzipper');

// 创建 HTTP 服务器。
const server = http.createServer((req, res) => {

    if(req.url.match(/^\/auth/)) {
        return auth(req, res) 
    }
    if(req.url.match(/^\/favicon.ico$/)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('not found');
        return
    }

    // 验权位置
    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/user',
        method: 'GET',
        headers: {
            Authorization: 'token ' + req.headers.token,
            'User-Agent': 'toy-publish-server'
        }
    };
    const httpsReq = https.request(options, (httpsRes) => { 
        let body = ''
        httpsRes.on('data', (d) => {
            body += d.toString()
        })
        httpsRes.on('end', () => {
            let user = JSON.parse(body)
            console.log(user) // 可以做权限检查

            // 权限检查通过后接受数据处理
            // unzip解压处理
            let writestream = unzip.Extract({ path: '../server/public' });
            req.pipe(writestream);
            
        })

    })

    httpsReq.on('error', (e) => {
        console.error(e);
    });
    httpsReq.end();

    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('okay');
    });

});

function auth(req, res) {
    const code = req.url.match(/code=([^&]+)/)[1]
    const state = '123abc'
    const client_id = 'Iv1.d05e1636461d076a'
    const client_secret = '08be1fb7bc336f148a0aecb1c1a4fe817048ea77'
    const redirect_uri = encodeURIComponent('http://localhost:9091/auth')
    const params = `client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}&client_id=${client_id}&state=${state}`
    // let url = `https://github.com/login/oauth/access_token?${params}`

    const options = {
        hostname: 'github.com',
        port: 443,
        path: `/login/oauth/access_token?${params}`,
        method: 'POST'
    };

    const httpsReq = https.request(options, (httpsRes) => {
        // console.log('状态码:', res.statusCode);
        // console.log('请求头:', res.headers);
        
        httpsRes.on('data', (d) => {
            // process.stdout.write(d);
            let result = d.toString().match(/access_token=([^&]+)/)
            if(result) {
                let token = result[1]
                res.writeHead(200, { 
                    'access_token': token,
                    'Content-Type': 'text/html'
                 });
                res.end(`<a href="http://localhost:9092/?token=${token}">publish</a>`);
            } else {
                res.writeHead(200, { 
                    'Content-Type': 'text/plain'
                 });
                res.end('error');
            }
        });
    });
    
    httpsReq.on('error', (e) => {
        console.error(e);
    });
    httpsReq.end();
    
}

server.listen(9091);