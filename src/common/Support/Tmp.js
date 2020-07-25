import tmp from 'tmp';
import fs from 'fs';
import rimraf from 'rimraf';

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
