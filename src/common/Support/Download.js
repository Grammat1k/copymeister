import download from 'download';

export default class Download {
  /**
   * Downloads a single file from an URI.
   *
   * @param uri
   * @param identifier#
   *
   * @returns {Promise<*>}
   * @throws Error
   */
  async static downloadFromUri() {
    return download(uri)
      .on('request', (request) => {
        logger.start({prefix: `[${identifier}]`, message: `Starting download of [${uri}].`});
      })
      .on('downloadProgress', (progress) => {
        logger.debug({
          prefix: `[${identifier}]`,
          message: `Download progress ...`,
          suffix: `${progress.percent * 100} % / ${progress.transferred} bytes of ${progress.total ?? 'unknown'} bytes transferred.`,
        });
      })
      .on('response', (response) => {
        logger.success({
          prefix: `[${identifier}]`,
          message: `Downloaded file [${uri}] after ${parseFloat(response.timings.phases.total / 1000).toFixed(2)} milliseconds.`,
        });
      })
      .on('error', (err) => {
        logger.error(`Failed to download file [${uri}]`, err);

        throw err;
      });
  }
}
