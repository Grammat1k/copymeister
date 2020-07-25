import Tmp from '@/common/Support/Tmp';
import download from 'download';
import ParsedHlsPlaylist from '@/VideoCreator/lib/Downloader/Parsers/Hls/ParsedHlsPlaylist';
import m3u8 from 'm3u8';
import fs from 'fs';

export default class HlsPlaylistParser {
  async load(playlistUri) {
    this._playlistUri = playlistUri;
    this._playlistFile = Tmp.createTemporaryFile('.m3u8');

    await download(this._playlistUri)
      .then((fileBuffer) => {
        fs.writeFileSync(this._playlistFile, fileBuffer);
      });
  }

  parse() {
    return new Promise(async (resolve, reject) => {
      try {
        const parser = m3u8.createStream();
        const file = fs.createReadStream(this._playlistFile);

        file.pipe(parser);

        parser.on('m3u', (m3u) => {
          fs.unlinkSync(this._playlistFile);
          resolve(new ParsedHlsPlaylist(m3u, this._playlistUri));
        });

      } catch (err) {
        reject(err);
      }
    });
  }
}
