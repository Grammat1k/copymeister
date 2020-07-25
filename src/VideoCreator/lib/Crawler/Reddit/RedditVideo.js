import RedditVideoSource from "./Sources/RedditVideoSource";
import RedditGifSource from "./Sources/RedditGifSource";
import YoutubeSource from "./Sources/YoutubeSource";
import StreamableSource from "./Sources/StreamableSource";
import GfycatSource from "./Sources/GfycatSource";
import GiphySource from "./Sources/GiphySource";
import RedditVideoGifSource from "./Sources/RedditVideoGifSource";
import ImgurSource from "./Sources/ImgurSource";

export default class RedditVideo {

  static create(postData) {
    return new RedditVideo(postData);
  }

  constructor(postData) {
    this._postData = postData;

    if (this._isCrosspost()) {
      return new RedditVideo(postData.crosspost_parent_list[0]);
    }

    this.identifier = postData.name;
    this.sourceUrl = postData.url;
    this.subreddit = postData.subreddit;
    this.author = postData.author;

    this.isBanned = this._isBanned();
    this.isExternal = this._isExternal();
    this.source = this._determineSource();
    this._metaData = null;
  }

  async fetchApi() {
    if (this._metaData) {
      return this._metaData;
    }

    this._metaData = await this.source.retriveMetaData();
  }

  _isCrosspost() {
    return this._postData.crosspost_parent_list && this._postData.crosspost_parent_list.length > 0;
  }

  _isBanned() {
    return !this._postData.banned_by || !this._postData.banned_at_utc;
  }

  _isExternal() {
    return !this._postData.is_reddit_media_domain;
  }

  _determineSource() {
    if(RedditVideoSource.validate(this._postData)) {
      return new RedditVideoSource(this._postData);
    }

    if(RedditVideoGifSource.validate(this._postData)) {
      return new RedditVideoGifSource(this._postData);
    }

    if(RedditGifSource.validate(this._postData)) {
      return new RedditGifSource(this._postData);
    }

    if(YoutubeSource.validate(this._postData)) {
      return new YoutubeSource(this._postData);
    }

    if(StreamableSource.validate(this._postData)) {
      return new StreamableSource(this._postData);
    }

    if(GfycatSource.validate(this._postData)) {
      return new GfycatSource(this._postData);
    }

    if(GiphySource.validate(this._postData)) {
      return new GiphySource(this._postData);
    }

    if(ImgurSource.validate(this._postData)) {
      return new ImgurSource(this._postData);
    }

    return null;
  }
}
