import download from 'download';

export default class Download {
  /**
   * Downloads a single file from an URI.
   *
   * @param uri
   * @param identifier
   *
   * @returns {Promise<*>}
   * @throws Error
   */
  static async downloadFromUri(uri, identifier, logger) {
    let start_time = null;
    return download(uri)
      .on('request', (request) => {
        logger.start({prefix: `[${identifier}]`, message: `Starting download of [${uri}].`});
        start_time = Date.now();
      })
      .on('downloadProgress', (progress) => {
        return;
        // @todo SPÄTER!
        logger.debug({
          prefix: `[${identifier}]`,
          message: `Download progress ...`,
          suffix: `${progress.percent * 100} % / ${progress.transferred} bytes of ${progress.total || 'unknown'} bytes transferred.`,
        });
      })
      .on('response', () => {
        logger.success({
          prefix: `[${identifier}]`,
          message: `Downloaded file [${uri}] in ${parseFloat((Date.now() - start_time))} milliseconds.`,
        });
      })
      .on('error', (err) => {
        logger.error(`Failed to download file [${uri}]`, err);

        throw err;
      });
  }
}
