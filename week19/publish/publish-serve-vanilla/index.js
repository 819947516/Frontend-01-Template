const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');

// 创建 HTTP 服务器。
const server = http.createServer((req, res) => {
    // console.log(req)

    // 处理了一般文件
    /*
    let matched = req.url.match(/filename=([^&]+)/);
    let filename = matched && matched[1];
    if(!filename) 
        return;
    
    let writestream = fs.createWriteStream(`../server/public/${filename}`);
    */

    // unzip解压处理
    let writestream = unzip.Extract({ path: '../server/public' });

    req.pipe(writestream);

    // pipe流程
    // req.on('data', trunk => {
    //     writestream.write(trunk);
    // });
    // req.on('end', trunk => {
    //     writestream.end(trunk);
    // });

    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('okay');
    });


});

server.listen(9091);