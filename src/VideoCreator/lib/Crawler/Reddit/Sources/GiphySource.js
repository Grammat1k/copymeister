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
 *
 * Has no extractor for youtube-dl.
 * We'll need to extract and download the files by ourselfs.
 */

export default class GiphySource {
  /**
   * Check if postdata includes information about ME.
   * @param {Object} postData
   */
  static validate(postData) {
    return /.*(media\.giphy\.com).*/.test(postData.url)
  }

  /**
   * Fetches meta information from e.g. youtube-downloader  (duration [if possible], hasSound, resolution,...).
   * @returns {Promise<any>}
   */
  async retriveMetaData() {}

  /**
   * Downloads the video and merges the audio and video tracks.
   */
  async download() {}
}
