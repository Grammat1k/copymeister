export default class Downloader {
  constructor() {
    if (new.target === Downloader) {
      throw new TypeError(`Cannot construct ${new.target.constructor.name} instances directly!`);
    }
  }

  static async download() {
    throw new TypeError('Cannot call abstract method directly!');
  }
}
