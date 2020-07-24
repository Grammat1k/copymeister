import tmp from 'tmp';

export default class Tmp {
  static createTemporaryFile(extension, opts = {}) {
    return tmp.tmpNameSync(Object.assign({
      postfix: this.ensureValidExtension(extension),
    }, opts));
  }

  static createTemporaryFolder(opts = {}) {
    return tmp.dirSync(opts);
  }

  static ensureValidExtension(extension) {
    if (!extension.startsWith('.')) {
      return `.${extension}`;
    }

    return extension;
  }
}
