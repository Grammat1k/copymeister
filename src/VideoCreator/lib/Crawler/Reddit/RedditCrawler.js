import Reddit from 'reddit';

export default class RedditCrawler {
  constructor({ username, password, app_id: appId, app_secret: appSecret }) {
    this.reddit = new Reddit({
      username,
      password,
      appId,
      appSecret
    });
  }

  async getVideoPosts(subreddits, {
    preFilter = () => true,
    limit = Number.MAX_SAFE_INTEGER,
  } = {}) {
    if (!Array.isArray(subreddits)) subreddits = [subreddits];

    const ret = {};

    await Promise.all(
      subreddits.map(subreddit => {
        const {
          timespan = 'week',
          sort = 'top'
        } = subreddit;

        return this._fetch(subreddit.name, {
          timespan,
          sort,
          limit,
        })
          .then(results => {
            ret[subreddit.name] = results.filter(post => {
              if (post.data.is_self) return false; // is_self is true on a text post
              return preFilter(post);
            });
          })
      }
      )
    );

    return ret;
  }

  _fetch(subreddit, {
    timespan = 'day',
    sort = 'top',
    limit = Number.MAX_SAFE_INTEGER,
    after = null,
  } = {}) {
    const params = {
      t: timespan,
      sort,
      limit: (limit > 100) ? 100 : limit,
    };

    if (after !== null) {
      params.after = after;
    }

    return this.reddit.get(`/r/${subreddit}/${sort}`, params)
      .then(async ({ data }) => {
        const posts = data.children;

        if (posts.length === params.limit && limit > params.limit) {
          const morePosts = await this._fetch(subreddit, {
            timespan,
            sort,
            limit: limit - posts.length,
            after: posts[posts.length - 1].data.name,
          });

          return [...posts, ...morePosts]
        }

        return posts;
      });
  }
}
