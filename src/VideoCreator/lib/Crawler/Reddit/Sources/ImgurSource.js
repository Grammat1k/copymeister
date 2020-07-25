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
 * [ ] Duration
 * [x] Resolution
 * [ ] FPS
 * [x] Format
 * [ ] Filesize
 */

export default class ImgurSource {
    /**
     * Check if postdata includes information about ME.
     *
     * @param {Object} postData
     */
  static validate(postData) {
      // @todo imgur albums

      return /.*i\.imgur\.com\/\w+\.(gifv?|mp4)(\?.*)?$/.test(postData.url)
    }

    /**
     * Fetches meta information from e.g. youtube-downloader  (duration [if possible], hasSound, resolution,...).
     *
     * @returns {Promise<any>}
     */
    async retriveMetaData() { }

    /**
     * Downloads the video and merges the audio and video tracks.
     */
    async download() { }
}
