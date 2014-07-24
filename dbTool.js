var mongodb = require('./models/db');

//将抓取到的视频信息存储到mongo数据库
function saveAllVideos(videos, callback) {
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('videos', function(err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            collection.save(videos, {safe: true}, function(err) {
                mongodb.close();
                callback(err);
            });
        });
    });
};

exports.saveAllVideos = saveAllVideos;

