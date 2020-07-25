import YoutubeDlDownloader from '@/VideoCreator/lib/Downloader/YoutubeDlDownloader';
import path from 'path';
import fs from 'fs';
import Tmp from '@/common/Support/Tmp';
import Reddit from 'reddit';
import config from '../common/Config/index';
import RedditCrawler from '../VideoCreator/lib/Crawler/Reddit/RedditCrawler';
import RedditVideo from '../VideoCreator/lib/Crawler/Reddit/RedditVideo';

(async () => {

  const { username, password, app_id: appId, app_secret: appSecret } = config.crawler.reddit;



  const reddit = new RedditCrawler(config.crawler.reddit);

/*{
  subreddit1: [
    {}, // 1
    {}, // 4
    {}, // 6
    {}, // 8
  ],
  subreddit2: [
    {}, // 2
    {}, // 5
    {}, // 7
  ],
  subreddit3: [
    {}, // 3
  ],
}*/


  const fetchReddit = sr => reddit.getVideoPosts({
    name: sr,
  }, {
    preFilter(post) {
      return true;
      return post.data.is_reddit_media_domain;
    }
  }).then((results) => {
    const result = results[sr];

    const ret = [];

    for(const post of result) {
      const instance = RedditVideo.create(post.data);

      if(instance.source === null) continue;

      ret.push({
        type: instance.source,
        url: instance._postData.url,
      });
    }


    fs.writeFileSync(path.resolve(__dirname, `../test_data/${sr}_instanceTest.json`), JSON.stringify(ret));
  });

  fetchReddit('funny');



  // console.log((new YoutubeDlDownloader)._getYoutubeDlBinary());

  // (new YoutubeDlDownloader())
  //   .download('https://www.youtube.com/watch?v=m3ZI15VjwEU')
  //   .pipe(fs.createWriteStream(path.resolve(__dirname, '../test/m3ZI15VjwEU.mp4')));


})();
