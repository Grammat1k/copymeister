import slash from 'slash';
import ffmpeg from '../ffmpeg';
import tmp from 'tmp';
import download from 'download';
import fs from 'fs';
import Logger from '../../../common/Support/Logger'

const logger = Logger.scope('Downloader/Reddit-V');

export default class VideoDownloader {
  static async download(post) {
    if (Array.isArray(post)) {
      return await Promise.all(post.map(VideoDownloader.download))
    }

    const video_url = post.reddit_video.fallback_url;
    const audio_url = video_url.split('DASH_')[0] + `DASH_audio.mp4`;

    // Video
    logger.await({prefix: `[#${post.name}]`, message: `Downloading video ...`});

    const video_buffer = await download(video_url);

    logger.complete({prefix: `[#${post.name}]`, message: `Successfully downloaded video.`});

    // Audio
    logger.await({prefix: `[#${post.name}]`, message: `Downloading audio tracks ...`});

    const audio_buffer = await download(audio_url);

    logger.complete({prefix: `[#${post.name}]`, message: `Successfully downloaded audio tracks.`});

    const video_path = tmp.tmpNameSync({
      postfix: '.mp4'
    });

    const audio_path = tmp.tmpNameSync({
      postfix: '.mp4'
    });

    fs.writeFileSync(video_path, video_buffer);
    fs.writeFileSync(audio_path, audio_buffer);

    const merged_video_path = tmp.tmpNameSync({
      postfix: '.mp4'
    });

    logger.await({prefix: `[#${post.name}]`, message: `Merging audio and video tracks ...`});

    await VideoDownloader.mergeAudioAndVideo(video_path, audio_path, merged_video_path);

    logger.complete({prefix: `[#${post.name}]`, message: `Merging finished.`});

    logger.await({prefix: `[#${post.name}]`, message: `Cleaning up...`});

    fs.unlinkSync(video_path);
    fs.unlinkSync(audio_path);

    logger.complete({prefix: `[#${post.name}]`, message: `Finished cleaning up...`});

    return {
      ...post,
      video_path: slash(merged_video_path)
    };
  }

  static mergeAudioAndVideo(video_path, audio_path, output_path) {
    return new Promise(ok => {
      ffmpeg(video_path)
        .on('end', () => ok())
        .videoCodec('libx264')
        .size('1920x1080')
        .aspect('16:9')
        .autopad()
        .fps(30)
        .addInput(audio_path)
        .audioCodec('aac')
        .audioBitrate('128k')
        .audioChannels(2)
        .save(output_path)
    });
  }
}
