import db from '@/common/Database/Connection';
import Logger from '@/common/Support/Logger';
import {strtotime} from 'locutus/php/datetime';

const logger = Logger.scope('Purger/RecentClips');

class PurgeRecentClips {
  /**
   * Purges all orphanised and superfluous clips before a specific timestamp.
   */
  async purge(time) {
    return await db('recent_clips')
      .where('video_publication_date', '<', strtotime(time))
      .delete()
      .then((count) => {
        logger.success(`Deleted ${count} clips since ${time}.`);

        return count;
      });
  }
}
