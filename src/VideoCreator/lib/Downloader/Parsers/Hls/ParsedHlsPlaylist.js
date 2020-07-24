import fs from 'fs';
import m3u8 from 'm3u8';

export default class ParsedHlsPlaylist {
  async parse(file) {
    return new Promise(async (resolve, reject) => {
      try {
        const parser = m3u8.createStream();
        const file = fs.createReadStream(file);
        file.pipe(parser);

        parser.on('m3u', function (m3u) {
          resolve(m3u);
        });
      } catch (err) {
        reject(err);
      }
    })
      .then((m3u) => {
        this._m3uData = m3u;
      });
  }

  getHighestQualityVideo() {
    if (!this._m3uData.items.StreamItem) {
      return null;
    }

    const resolution = (items) => items.reduce((a, b) => a * b);

    return items.reduce(
      (previousValue, currentValue) =>
        resolution(previousValue) > resolution(currentValue)
          ? previousValue
          : currentValue,
    );
  }

  getHighestQualityAudio(items) {

  }
}
