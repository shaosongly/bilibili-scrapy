var phantom = require('phantom');
var parser = require('./parser');
var http = require('http');
var iconv = require('iconv-lite');
var async = require('async');
var urlGenerator = require('./urlGenerator');
var dbTool  = require('./dbTool');

//获取要抓取的网页列表
urlList = urlGenerator.getUrlList();

//抓取的视频信息
videos = [];

//使用phantomjs，获取动态网页内容，速度较慢
function getUrlHtml(url, callback) {
   phantom.create(function(ph) {
       ph.createPage(function(page) {
           page.open(url, function(status) {
               if(status !== 'success') {
                   ph.exit();
                   callback('open ' + url + ' fail');
               } else {
                   page.evaluate(function() { return document.body.innerHTML; }, function(result) {           
                       console.log('正在解析 ' + url);
                       parser.otherpageParser(result, videos);
                       ph.exit();
                       callback();
                   });
               }
           })
       });
   });
};

//依次抓取每一个网页，将视频信息存储到videos中
//然后将videos存入mongodb数据库
async.series([
    function(callback) {
        async.eachSeries(urlList, getUrlHtml, function(err) {
            if(err) {
                console.log(err);
            } else {
                callback(null);
            }
        });
    },
    function (callback) {
        //console.log(videos);
        console.log('总共抓取到' + videos.length + '个视频');
        dbTool.saveAllVideos(videos, function(err) {
            if(err) {
                console.log(err);
            }
            else {
                console.log('成功写入数据库');
            }
            callback(null);
        });
    }
],
function(err, results) {
    console.log('抓取结束');
});

/*
//使用http方式获取静态网页内容，速度快
http.get('http://www.acfun.com/v/list1/index.htm', function(res) {
    var size = 0;
    var chunks =[];
    res.on('data', function(chunk) {
       size += chunk.length;
        chunks.push(chunk);
    });
    res.on('end', function() {
        var data = Buffer.concat(chunks,size);
        var html = iconv.decode(data,'utf-8');
        console.log(html);
    });
});
*/
