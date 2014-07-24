var baseUrl = 'http://www.bilibili.com';
var category = ['douga', 'music', 'game', 'technology', 'ent', 'movie', 'bangumi'];

function getBaseUrl() {
    return baseUrl;
};

function getCategory() {
    return category;
};

function getUrlList() {
    urlList = [];
    for(var c in category) {
        urlList.push(baseUrl + '/video/' +category[c] +'.html');
    }
    return urlList;
};

exports.getBaseUrl = getBaseUrl;
exports.getCategory = getCategory;
exports.getUrlList = getUrlList;

   
