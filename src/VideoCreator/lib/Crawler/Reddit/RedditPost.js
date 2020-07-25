import ESourceType from './ESourceType';

export default class RedditPost {
  constructor(postData) {
    this._postData = postData;

    if (this.isCrosspost()) {
      return new RedditPost(postData.crosspost_parent_list[0]);
    }

    this.identifier = _postData.name;
    this.sourceUrl = _postData.url;
    this.subreddit = _postData.subreddit;
    this.author = _postData.author;
    this.sourceType = this.getSourceType(_postData);
  }

  isCrosspost() {
    return this._postData.crosspost_parent_list && this._postData.crosspost_parent_list.length > 0;
  }

  isBanned() {
    return !this._postData.banned_by || !this._postData.banned_at_utc;
  }

  getSourceType() {
    const { media } = this._postData;

    if (media.reddit_video) {
      if (media.reddit_video.is_gif) {
        return ESourceType.RedditGif;
      } else {
        return ESourceType.RedditVideo;
      }
    }

    if (media.type) {
      if (media.type === 'youtube.com') {
        return ESourceType.Youtube;
      }

      if (media.type === 'gfycat.com') {
        return ESourceType.Gfycat;
      }

      if (media.type === 'streamable.com') {
        return ESourceType.Streamable;
      }
    }

    return ESourceType.Unknown;
  }
}
