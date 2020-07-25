import Downloader from '@/VideoCreator/lib/Downloader/Downloader';
import youtubeDl from 'youtube-dl';
import { exec } from 'child_process';

export default class YoutubeDlDownloader extends Downloader {
  _metaData = null;
  _outputFormat = '.mp4';
  _outputTemplate = `download.%(ext)s`;

  static async download(uri, opts = {
    metaData: [],
    outputFormat: '.mp4',

  }) {
    const tempDownloadFolder = Tmp.createTemporaryFolder();

    const ytDlArgs = [
      `--format 'bestvideo+bestaudio/best'`,
      `--merge-output-format 'mp4'`,
      `--no-mtime`,
      `--ffmpeg-location '${ffmpegPath}'`,
    ];

    // Write raw meta data to a temp file and use --load-info-json to prevent multiple requests to the same resource.
    if (this._metaData) {
      const tmpInfoJsonFile = Tmp.createTemporaryFile('.json');

      fs.writeFileSync(tmpInfoJsonFile, JSON.stringify(this._metaData));

      ytDlArgs.push(`--load-info-json ${tmpInfoJsonFile}`);
    }

    // Download into tmp folder.
    const ytDlBinary = YoutubeDlDownloader.getYoutubeDlBinary();
    const dl = _youtubeDlPromiseWrapper(uri, fs.createWriteStream(), ytDlArgs);

    [tmpInfoJsonFile].map(t => t.removeCallback());
  }

  static _youtubeDlPromiseWrapper(uri, targetStream, args = [], opts = {}) {
    return new Promise((resolve, reject) => {
      const v = youtubeDl(uri, args, opts);

      v.pipe(targetStream);

      let metaData = null;
      v.on('info', (info) => {
        metaData = info;
      })
      v.on('end', () => resolve(metaData));
    });
  }

  static getYoutubeDlBinary() {
    return youtubeDl.getYtdlBinary();
  }
}
