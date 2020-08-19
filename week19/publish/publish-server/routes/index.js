var express = require('express');
var router = express.Router();

const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req);
    // fs.writeFileSync('../server/public/1.html', 'string2')
    // fs.writeFileSync('../server/public/2.html', 'hello world')
    fs.writeFileSync(`../server/public/${req.query.filename}`, 'hello world x');
    // res.render('index', { title: 'Express' });
});
/* POST home page. */
router.post('/', function(req, res, next) {
    console.log(req);
    
    fs.writeFileSync(`../server/public/${req.query.filename}`, req.body.content);
    
    res.send('');
    res.end();
});
module.exports = router;
