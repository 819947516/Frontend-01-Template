const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');

const client_id = 'Iv1.d05e1636461d076a'
const redirect_uri = encodeURIComponent('http://localhost:9091/auth')
const scope = encodeURIComponent('read:user')
const state = '123abctest'
child_process.exec(`start https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`)

// 创建 HTTP 服务器。
const server = http.createServer((req, res) => {
    let token = req.url.match(/token=([^&]+)/)[1]
    let package = './package';
    const options = {
        hostname: 'localhost',
        port: 9091,
        path: '/?filename=package.zip',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token': token
        }
    };

    const httpReq = http.request(options);
    
    httpReq.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
    });
    let archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    archive.directory(package, false);
    archive.pipe(httpReq);
    archive.finalize();
    archive.on('end', () => {
        httpReq.end();
    })
});
server.listen(9092);











