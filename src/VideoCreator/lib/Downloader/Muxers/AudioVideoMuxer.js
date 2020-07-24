import Logger from '@/common/Support/Logger';
import ffmpeg from '@/VideoCreator/lib/ffmpeg';
import fs from 'fs';
import path from 'path';

const logger = Logger.scope('AV-Muxer');

export default class AudioVideoMuxer {
  /**
   * Merge audio and video sources into a single target file.
   *
   * @param video Path to the video source.
   * @param audio Path to the audio source.
   * @param target Target name.
   * @param deleteSourceFilesAfterMuxing
   *
   * @returns {Promise<unknown>}
   */
  async mux(video, audio, target, deleteSourceFilesAfterMuxing = true) {
    return new Promise((resolve, reject) => {
      ffmpeg(video)
        .on('start', () => {
          logger.start(`Start multiplexer. Target path is [${target}].`);
        })
        .on('process', (progress) => {
          logger.debug({prefix: `[${path.basename(target)}]`, message: `Processing files.`, suffix: `${progress} %`});
        })
        .on('end', (stdout, stderr) => {
          logger.success({prefix: `[${path.basename(target)}]`, message: `Transcoding successful.`});

          if (deleteSourceFilesAfterMuxing) {
            logger.info({prefix: `[${path.basename(target)}]`, message: `Deleting source files.`});

            fs.unlinkSync(video);
            fs.unlinkSync(audio);
          }

          resolve(target, stdout, stderr);
        })
        .on('error', (err, stdout, stderr) => {
          logger.error(`Error while transcoding [${path.basename(target)}].`, err);

          reject(err, stdout, stderr);
        })
        .videoCodec('libx264')
        .fps(30)
        .addInput(audio)
        .audioCodec('aac')
        .audioBitrate('128k')
        .audioChannels(2)
        .save(target);
    });
  }
}
