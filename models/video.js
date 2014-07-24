
function Video(video) {
    this._id = video._id;
    this.title = video.title;
    this.subtitle = video.subtitle;
    this.des = video.des;
    this.img = video.img;
    this.href = video.href;
    this.up = video.up;//作者
    this.tg = video.tg;//时间戳
    this.len = video.len;//长度
    this.tag = video.tag;//标签列表
};

module.exports = Video;
