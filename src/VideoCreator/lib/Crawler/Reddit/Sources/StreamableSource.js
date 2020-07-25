/**
 * Metadata documentation:
 *
 * Reddit API results:
 * [ ] Duration
 * [x] Resolution
 * [ ] FPS
 * [ ] Format
 * [ ] Filesize
 *
 * youtube-dl results:
 * [x] Duration
 * [x] Resolution
 * [x] FPS
 * [x] Format
 * [x] Filesize
 */

export default class StreamableSource {
  /**
   * Check if postdata includes information about ME
   *
   * @param {Object} postData
   */
  static validate(postData) {
    return /.*(streamable\.com).*/.test(postData.url)
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
