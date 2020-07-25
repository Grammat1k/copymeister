import Downloader from '@/VideoCreator/lib/Downloader/Downloader';
import youtubeDl from 'youtube-dl';

export default class YoutubeDlDownloader extends Downloader {
  download(uri) {
    const video = youtubeDl(uri);

    video.on('info', (info) => console.log('event[info]'))
      .on('complete', (info) => console.log('event[complete]', info))
      .on('end', () => console.log('event[end]'));

    return video;
  }

  _getYoutubeDlBinary() {
    return youtubeDl.getYtdlBinary();
  }
}
