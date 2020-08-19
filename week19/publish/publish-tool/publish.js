const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const archiver = require('archiver');

// GET
/*
const options = {
  host: 'localhost',
  port: 9091,
  method: 'GET',
  path: '/?filename=x.html',
  headers: {

  }
};
发出请求。
const req = http.request(options);
req.end();
*/

// POST
/*
const postData = querystring.stringify({
    'content': 'hello world 123'
});

const options = {
    hostname: 'localhost',
    port: 9091,
    path: '/?filename=z.html',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};
const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    // res.setEncoding('utf8');
    // res.on('data', (chunk) => {
    //     console.log(`响应主体: ${chunk}`);
    // });
    // res.on('end', () => {
    //     console.log('响应中已无数据');
    // });
});

req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
});
// 将数据写入请求主体。
req.write(postData);
req.end();
*/

// 处理图片方法
/*
let picfile = './big.jpg';
fs.stat(picfile, function(error, stats) {
    // console.log(stats);
    const options = {
        hostname: 'localhost',
        port: 9091,
        path: '/?filename=big.jpg',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': stats.size
        }
    };

    const req = http.request(options);

    let readStream = fs.createReadStream('./big.jpg');
    readStream.pipe(req);

    readStream.on('end', () => {
        req.end();
    });
});
*/

// 处理压缩包
let package = './package';
const options = {
    hostname: 'localhost',
    port: 9091,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const req = http.request(options);

req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
});

// let readStream = fs.createReadStream(package);

let archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});
archive.directory(package, false);
archive.pipe(req);
archive.finalize();
archive.on('end', () => {
    req.end();
})












