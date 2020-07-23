import Reddit from 'reddit';
import urlExist from 'url-exist';

export default class Crawler {
  constructor({username, password, app_id: appId, app_secret: appSecret}) {
    this.reddit = new Reddit({
      username,
      password,
      appId,
      appSecret
    });
  }

  getVideoPosts(subreddit, time = 'day', durationLimit = 40, sort = 'top', limit = 100) {
    if (!Array.isArray(subreddit)) subreddit = [subreddit];

    return Promise.all(subreddit.map(subreddit => {
      return this.reddit.get(`/r/${subreddit}/${sort}`, {
        t: time,
        limit,
      }).then(async ({ data }) => {
        const posts = [];

        for (const { data: post } of data.children) {
          if (post.crosspost_parent_list) continue; // no xposts
          if (!post.is_video) continue; // only videos
          if (post.media.reddit_video.is_gif) continue; // only real videos
          if (post.media.reddit_video.duration > durationLimit) continue;
          if (post.over_18) continue;
          if (!await this.videoContainsAudio(post.media.reddit_video.fallback_url)) continue; // only videos with sound
          // @todo duplication check

          posts.push({
            subreddit: post.subreddit,
            name: post.name,
            url: post.url,
            reddit_video: {
              fallback_url: post.media.reddit_video.fallback_url,
              scrubber_media_url: post.media.reddit_video.scrubber_media_url,
              duration: post.media.reddit_video.duration,
            }
          });
        }


        return posts;
      });
    })).then(results => [].concat(...results));
  }

  async videoContainsAudio(video_url) {
    const audio_url = video_url.split('DASH_')[0] + `DASH_audio.mp4`;
    return await urlExist(audio_url);
  }
}
