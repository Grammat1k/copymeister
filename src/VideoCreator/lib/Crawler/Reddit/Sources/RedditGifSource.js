/**
 * Metadata documentation:
 *
 * Reddit API results:
 * [ ] Duration
 * [ ] Resolution
 * [ ] FPS
 * [ ] Format
 * [ ] Filesize
 *
 * youtube-dl results:
 * [ ] Duration
 * [ ] Resolution
 * [ ] FPS
 * [ ] Format
 * [ ] Filesize
 */

export default class RedditGifSource {
  /**
   * Check if postdata includes information about ME
   *
   * @param {Object} postData
   */
  static validate(postData) {
    return (
      postData.is_reddit_media_domain &&
      !postData.is_video &&
      !postData.media &&
      /.*\.gifv?$/.test(postData.url)
    );
  }

  /**
   * Fetches meta information from e.g. youtube-downloader  (duration [if possible], hasSound, resolution,...)
   *
   * @returns {Promise<any>}
   */
  async retriveMetaData() { }

  /**
   * Downloads the video and merges the audio and video tracks
   */
  async download() { }
}
