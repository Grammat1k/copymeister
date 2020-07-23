import { strtotime } from 'locutus/php/datetime'
import RecentClips from '../Database/RecentClips';
import Logger from '../../../common/Support/Logger'

const logger = Logger.scope('DupeChk/Id');

export default class IdChecker {
    /**
     * Checks if fullname has been used in a recent video.
     *
     * @returns boolean `true` if the video id is unique for the timeframe.
     */
    check(fullname, timeframe) {
        const date = strtotime(timeframe);

        if (!date) {
            throw new TypeError(`The given timeframe [${timeframe}] is invalid and could not be processed.`);
        }

        logger.await(`Checking ID [${fullname}] for matches within ${timeframe}.`);

        const recentClipMatchesCount = RecentClips.count({
            fullname,
            video_publication_date: {
                $gt: date,
            },
        });

        logger.complete(`${recentClipMatchesCount} clip${recentClipMatchesCount !== 1 ? 's' : ''} found for ID [${fullname}]`);

        return !(hasRecentClipMatches > 0);
    }
}
