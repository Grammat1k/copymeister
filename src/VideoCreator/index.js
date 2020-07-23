import Crawler from './lib/Crawler/Crawler';
import VideoDownloader from './lib/Downloader/VideoDownloader';
import Merger from './lib/Merger';
import config from '../common/Config';
import Logger from '../common/Support/Logger'

const logger = Logger.scope('Main');

const seriesId = process.argv[2];
const seriesConfig = config.series[seriesId];

if (!seriesConfig) {
  throw new TypeError(`Invalid seriesId [${seriesId}]`);
}

const crawler = new Crawler(config.crawler.reddit);

const sources = seriesConfig.sources || [];

if (!sources.length) {
  throw new TypeError(`No source found!`);
}

Promise.all(sources.map(source =>
  crawler.getVideoPosts(
    source.source,
    source.timespan,
    seriesConfig.duration,
    source.sort,
  )
)).then(posts => VideoDownloader.download([].concat(...posts)))
  .then(Merger.mergeVideos)

// scheduler.js => every day 0:00 am
// nedb purges (write)
// -> config
// --> which videos to be produced
// ---> index.js (child process)
//      -> nedb (reads)
// wait for all child process to finish
