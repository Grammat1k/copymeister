/**
 * Metadata documentation:
 *
 * Reddit API results:
 * [ ] Duration
 * [x] Resolution
 * [ ] FPS
 * [x] Format
 * [ ] Filesize
 *
 * youtube-dl results:
 * [x] Duration
 * [x] Resolution
 * [ ] FPS
 * [ ] Format
 * [ ] Filesize
 */

export default class RedditVideoSource {
  /**
   * Check if postdata includes information about ME
   *
   * @param {Object} postData
   */
  static validate(postData) {
    return (
      postData.is_reddit_media_domain &&
      postData.is_video &&
      postData.media &&
      postData.media.reddit_video &&
      !postData.media.reddit_video.isGif
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
