import Download from '@/common/Support/Download';
import Logger from '@/common/Support/Logger';
import Tmp from '@/common/Support/Tmp';
import Downloader from '@/VideoCreator/lib/Downloader/Downloader';
import AudioVideoMuxer from '@/VideoCreator/lib/Downloader/Muxers/AudioVideoMuxer';
import fs from 'fs';

const logger = Logger.scope('Download/Reddit');

class RedditDownloader extends Downloader {
  async download(post) {
    if (post.media.reddit_video.is_gif) {
      return this.downloadGif(post);
    }

    return this.downloadVideo(post);
  }

  async downloadGif(post) {

  }

  async downloadVideo(post) {
    const videoUri = post.reddit_video.fallback_url;
    const audioUri = videoUri.split('DASH_')[0] + `DASH_audio.mp4`;

    const [videoBuffer, audioBuffer] = Promise.all([
      Download.downloadFromUri(videoUri, `${post.name}/video`),
      Download.downloadFromUri(audioUri, `${post.name}/audio`),
    ]);

    const videoPath = this.createTemporaryFile('.mp4');
    const audioPath = this.createTemporaryFile('.mp4');

    fs.writeFileSync(videoPath, videoBuffer);
    fs.writeFileSync(audioPath, audioBuffer);

    const [target] = await (new AudioVideoMuxer().mux(videoPath, audioPath, Tmp.createTemporaryFile('.mp4')));

    return target;
  }


}
