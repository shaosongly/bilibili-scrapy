var cheerio = require('cheerio');
var Video = require('./models/video');

//抓取首页相关信息
function homepageParser(html, videos) {
    $ = cheerio.load(html);
    //抓取强力推荐内容
    $('div.hst_box ul.video li').each(function(i, elem) {
        videos.push(getVideoInfo($(this), 'tuijian'));
    });
    //抓取推广栏内容 
};

//抓取各个分类页面信息
function otherpageParser(html, videos) {
    $ = cheerio.load(html);
    $('div.z div.z-l.f-list').each(function(i,elem) {
        var tag = $(this).find('div.sort i').text();
        $(this).find('ul.video li').each(function(i, elem) {
            videos.push(getVideoInfo($(this), tag));
        });
    });
};

//解析获取每个视频的相关信息
function getVideoInfo(jdom, tag) {
    var title = jdom.find('div.t').text();
    var subtitle = jdom.find('div.v').attr('subtitle');
    var des = jdom.find('div.v').attr('txt');
    var up = jdom.find('div.v').attr('up');
    var tg = jdom.find('div.v').attr('tg');
    var href = jdom.find('a').attr('href');
    var img = jdom.find('img').attr('src');
    var len = jdom.find('div.x b.x2').text();
    var _id = href.substring(9,href.length-1);

    var newVideo = new Video({
        _id: _id,
        title: title,
        subtitle: subtitle,
        des: des,
        img: img,
        href: href,
        up: up,
        tg: tg,
        len: len,
        tag: tag
    });

    return newVideo;
}

exports.homepageParser = homepageParser;
exports.otherpageParser = otherpageParser;
