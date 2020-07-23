import {exec} from 'child_process';
import tmp from 'tmp';
import fs from 'fs';
import Logger from '../../../common/Support/Logger'

const logger = Logger.scope('Merger');

export default class Merger {
  static mergeVideos(posts) {
    return new Promise((ok, fail) => {
      const merged_video_path = tmp.tmpNameSync({
        postfix: '.mp4'
      });

      const fileListFilename = tmp.tmpNameSync({
        postfix: '.txt'
      });

      fs.writeFileSync(fileListFilename, posts.map(p => `file ${p.video_path}`).join('\n'), 'utf8');

      logger.await('Merging clips...');

      const cp = exec(`${require('ffmpeg-static')} -f concat -safe 0 -i ${fileListFilename} -c copy ${merged_video_path} -y`);

      cp.on('close', (exitCode) => {
        if(exitCode === 0) {
          logger.complete('Finished merging.');
          logger.await('Cleaning up...');

          posts.forEach(({video_path}) => {
            fs.unlinkSync(video_path);
          });

          fs.unlinkSync(fileListFilename);

          logger.complete('Finished cleaning up.')
          ok();
        }
      });
    });
  }
}
