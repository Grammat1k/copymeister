import db from '@/common/Database/Connection';
import {strtotime} from 'locutus/php/datetime';
import Logger from '@/common/Support/Logger';

const logger = Logger.scope('DupeChk/Id');

export default class IdChecker {
  /**
   * Checks if the identifier has been used in a recent video.
   *
   * @returns boolean `true` if the video id is unique for the timeframe.
   */
  async check(identifier, timeframe) {
    const date = strtotime(timeframe);

    if (!date) {
      throw new TypeError(`The given time frame [${timeframe}] is invalid and could not be processed.`);
    }

    logger.await(`Checking ID [${identifier}] for matches within ${timeframe}.`);

    const {result: recentClipMatchesCount} = await db('recent_clips')
      .count('* as result')
      .where('clip_id', identifier)
      .where('video_publication_date', '>', date)
      .first('result');

    logger.complete(`${recentClipMatchesCount} clip${recentClipMatchesCount !== 1 ? 's' : ''} found for ID [${identifier}]`);

    return !(recentClipMatchesCount > 0);
  }
}
