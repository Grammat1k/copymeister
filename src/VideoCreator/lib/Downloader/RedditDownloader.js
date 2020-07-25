import Download from '@/common/Support/Download';
import Logger from '@/common/Support/Logger';
import Tmp from '@/common/Support/Tmp';
import Downloader from '@/VideoCreator/lib/Downloader/Downloader';
import AudioVideoMuxer from '@/VideoCreator/lib/Downloader/Muxers/AudioVideoMuxer';
import fs from 'fs';
import HlsPlaylistParser from '@/VideoCreator/lib/Downloader/Parsers/HlsPlaylistParser';
import slash from 'slash';

const logger = Logger.scope('Download/Reddit');

export default class RedditDownloader extends Downloader {
  static async download(post) {
    if (post.reddit_video.is_gif) {
      return RedditDownloader.downloadGif(post);
    }

    return RedditDownloader.downloadVideo(post);
  }

  static async downloadGif(post) {

  }

  // series: IdiotsFightingThings [r/idiotsfightingthings, r/instant_regret, r/instantkarma, r/winstupidprizes]
  // -> video_duration: 10.5 min
  //

  // posts >

  // posts
  // type (reddit[gif(videos with no audio, gifs), video], youtube, giphy, gfycat) -> .mp4
  // post.identifier => t3_123456
  // post.hasAudio => boolean
  // post.duration => number (rounded seconds)




  static async downloadVideo(post) {
    const playlistParser = new HlsPlaylistParser();
    await playlistParser.load(post.reddit_video.hls_url);
    const playlist = await playlistParser.parse();

    // @todo move this to crawler.
    if (!playlist.hasAudio()) return null;

    const [videoBuffer, audioBuffer] = await Promise.all([
      Download.downloadFromUri(playlist.getHighestQualityVideoSourceUri(), `${post.name}/video`, logger),
      Download.downloadFromUri(playlist.getHighestQualityAudioSourceUri(), `${post.name}/audio`, logger),
    ]);

    const videoPath = Tmp.createTemporaryFile('.ts');
    const audioPath = Tmp.createTemporaryFile('.aac');

    fs.writeFileSync(videoPath, videoBuffer);
    fs.writeFileSync(audioPath, audioBuffer);

    const [target] = await (new AudioVideoMuxer().mux(videoPath, audioPath, Tmp.createTemporaryFile('.mp4')));

    return {
      ...post,
      video_path: slash(target)
    };
  }
}
