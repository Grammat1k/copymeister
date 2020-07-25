import Crawler from './lib/Crawler/Crawler';
import RedditDownloader from './lib/Downloader/RedditDownloader';
import Merger from './lib/Merger';
import config from '../common/Config';
import Logger from '../common/Support/Logger'
import RedditPost from './lib/Crawler/Reddit/RedditPost';

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

// Promise.all(
//   sources.map(source =>
//     crawler.getVideoPosts(
//       source.source,
//       source.timespan,
//       seriesConfig.duration,
//       source.sort,
//     )
//   )
// )
//   .then(/* convert to RedditPost class */)
//   // .then(/* filter posts */)
//   // .then(posts => Promise.all([].concat(...posts).map((p) => RedditDownloader.download(p))))
//   // .then(Merger.mergeVideos);




// crawl(r1, r2, r3, r4)
// pre-pre-filter: non-media posts (text, etc)
// to RedditPost
// pre-filter: is banned, ...
// group by subreddit
// reddit_videos => PRIO 1 (min_video: 70%)
// reddit_gifs
// other => sort videos
// 1) get all reddit video posts with (allegedly) sound (is_video)
// 2)

const crawler = new RedditCrawler(config.crawler.reddit);

rc.getPosts(
  seriesConfig.sources.map((source) => ({
    name: source.source,
    sort: source.sort,
    timespan: source.timespan,
  }))
)
  .then(results => {
    const usedPostIdentifiers = [];

    results
      // pre pre filter
      .map(r => r.filter(post => {
        if (post.media === null) {
          return false;
        }

        if (post.over_18) {
          return false;
        }

        return true;
      }))

      // conver to class
      .map(r => r.map(post => new RedditPost(post)))

      // pre filter
      .map(r => r.filter(post => {
        if (post.isBanned()) {
          return false;
        }

        return true;
      }))

      // ensure that all posts are unique through all subreddits.
      .map(r => r.filter(post => {
        if (usedPostIdentifiers.includes(post.identifier)) {
          return false;
        }

        usedPostIdentifiers.push(post.identifier);

        return true;
      }))

      .map(r => {
        const redditVideos = [];
        const redditGifs = [];
        const otherSources = [];

        for (const post of r) {
          if (post.isVideo) {
            redditVideos.push(r);
          } else if (post.isGif) {
            redditGifs.push(r);
          } else {
            otherSources.push(r);
          }
        }

        return { redditClips, redditGifs, otherSources }
      })
      .forEach(({ redditClips, redditGifs, otherSources }) => {
        const otherSourcesWithSound = [];
        const otherSourcesWithoutSound = [];

        const segmentAudio = [];
        const segmentSilent = [];

        const videoDurationSec = 10.5 * 60;
        // Set the minimal duration of the gifs segment if present.
        const segmentSilentMinDuration = (15 / 100) * videoDurationSec;

        let totalDurationOfVideo = 0;
        let totalDurationOfSegmentAudio = 0;
        let totalDurationOfSegmentSilent = 0;

        const checkIfClipDurationIsValid = (duration) => {
          return duration >= seriesConfig.min_clip_length && duration <= seriesConfig.max_clip_length;
        };

        const duplicationChecks = (post) => {
          for (const checkData of seriesConfig.duplicate_checks) {
            const checker = AvailableCheckers[checkData.checker];

            if (!checker.check(post.identifier, checkData.timespan)) {
              return false;
            }
          }

          return true;
        };

        for (const clipId in redditClips) {
          const clip = redditClips[clipId];

          if (
            !duplicationChecks(clip) ||
            !checkIfClipDurationIsValid(clip.duration)
          ) {
            redditClips.splice(clipId, 1);

            continue;
          }

          // Check if the clip actually has sound. If not, delete it from the clips with sound array and add it to the gifs.
          if (! await clip.hasSoundSafe()) {
            redditGifs.push(clip);
            redditClips.splice(clipId, 1);

            continue;
          }

          // Clip has sound for sure, add it to the segmentAudio and add its duration to the totalAudioSegmentDuration.
          segmentAudio.push(clip);
          totalDurationOfSegmentAudio += clip.duration;
          totalDurationOfVideo += clip.duration;

          // If the duration of the audio segment is greater than the total duration of the video, break the loop. We have enough material.
          if (totalDurationOfVideo > videoDurationSec) {
            return;
          }
        }

        // The duration of the audio segment is smaller than the total duration of the video,
        // begin to iterate through the otherSources (like yt, giphy, imgur, ...)
        for (const sourceId in otherSources) {
          const source = otherSources[sourceId];

          // Fetch required data through the source's API and supply the RedditPost.
          await source.fetchApi();

          if (
            !duplicationChecks(source) ||
            !checkIfClipDurationIsValid(source.duration)
          ) {
            otherSources.splice(sourceId, 1);

            continue;
          }

          // Check if the source media has sound.
          if (! await source.hasSoundSafe()) {
            otherSourcesWithoutSound.push(post);
            otherSources.splice(sourceId, 1);

            continue;
          }

          // The source has audio, add it the the audio segment.
          segmentAudio.push(source);
          totalDurationOfSegmentAudio += source.duration;
          totalDurationOfVideo += source.duration;

          // We've reached the duration limit of the video. Break EVERYTHING!
          if (totalDurationOfVideo > videoDurationSec) {
            return;
          }
        }

        // ---------------------------------------------

        // We still haven't reached the duration limit of the video, fill it with reddit gifs and and other silent sources.
        for (const clipId in redditGifs) {
          const clip = redditGifs[clipId];

          if (
            !duplicationChecks(clip) ||
            !checkIfClipDurationIsValid(clip.duration)
          ) {
            redditGifs.splice(clipId, 1);

            continue;
          }

          segmentSilent.push(clip);
          totalDurationOfSegmentSilent += clip.duration;
          totalDurationOfVideo += clip.duration;

          if (
            totalDurationOfVideo > videoDurationSec &&
            totalDurationOfSegmentSilent > segmentSilentMinDuration
          ) {
            return;
          }
        }

        // Until we have fillled the duration of the video, fill the rest with clips without sound from the remaining sources.
        for (const clipId in otherSourcesWithoutSound) {
          const clip = redditGifs[clipId];

          if (!clip.apiHasBeenFetched()) {
            await clip.fetchApi();
          }

          if (
            !duplicationChecks(clip) ||
            !checkIfClipDurationIsValid(source.duration)
          ) {
            otherSourcesWithoutSound.splice(clipId, 1);

            continue;
          }

          segmentSilent.push(clip);
          totalDurationOfSegmentSilent += clip.duration;
          totalDurationOfVideo += clip.duration;

          if (
            totalDurationOfVideo > videoDurationSec &&
            totalDurationOfSegmentSilent > segmentSilentMinDuration
          ) {
            return;
          }
        }

        // If we still haven't met the minimal duration of the video, fuck that shit and publish the video anyway.
      })
  })

// crawler => 10
// convert to class
// each(i)
// - is banned filter
// - duration++
// if(isEnd() && duration < duration_limit)
//

// crawler r1 => 100
// ---
// sort(posts, p1: reddit-posts (sort: is_gif, is_no_gif), p2: non-reddit-posts)
//
// foreach (posts) -> duration += post.duration
// ---


// crawl(r1,r2,r3)
// to class
// result.sort(posts, p1: reddit-posts (sort: is_gif, is_no_gif), p2: non-reddit-posts)
// while(true) {
  // filter
  // result.getOne(r)

//}

//







// scheduler.js => every day 0:00 am
// nedb purges (write)
// -> config
// --> which videos to be produced
// ---> index.js (child process)
//      -> nedb (reads)
// wait for all child process to finish
