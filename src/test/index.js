import HlsPlaylistParser from '@/VideoCreator/lib/Downloader/Parsers/HlsPlaylistParser';
import m3u8 from 'm3u8';
import fs from 'fs';
import path from 'path';
import Reddit from 'reddit';
import RedditCrawler from '../VideoCreator/lib/Crawler/Reddit/RedditCrawler';
import config from '../common/Config';

(async () => {
  // /*const parser = m3u8.createStream();
  // await download('https://v.redd.it/wf9m26kcgnb51/HLSPlaylist.m3u8', 'test');
  // const file = fs.createReadStream('test/HLSPlaylist.m3u8');
  // file.pipe(parser);

  // parser.on('item', function (item) {
  //   //
  // });

  // parser.on('m3u', function (m3u) {
  //   fs.writeFileSync('test/HLSPlaylist.json', JSON.stringify(m3u));
  // });*/

  // /*const playlistParser = new HlsPlaylistParser();
  // //await playlistParser.load('https://v.redd.it/iqfgtj2phhc51/HLSPlaylist.m3u8');
  // //await playlistParser.load('https://v.redd.it/4a3ttdznarc51/HLSPlaylist.m3u8');
  // await playlistParser.load('https://v.redd.it/4ut287mozhb51/HLSPlaylist.m3u8');
  // const playlist = await playlistParser.parse();

  // console.log(JSON.stringify(playlist._m3u8Data));*/

  // //console.log(JSON.stringify(playlist.getHighestQualityVideoSourceUri()));
  // //console.log(JSON.stringify(playlist.getHighestQualityAudioSourceUri()));


  const reddit = new Reddit({
    username: config.crawler.reddit.username,
    password: config.crawler.reddit.password,
    appId: config.crawler.reddit.app_id,
    appSecret: config.crawler.reddit.app_secret
  });

  const getPostsFromSubreddit = async (subreddit) => {
    await reddit.get(`/r/${subreddit}/top`, {
      limit: 100,
      t: 'week',
    })
      .then(({data}) => {
        fs.writeFileSync(path.resolve(__dirname,'../test_data',`${subreddit}.json`), JSON.stringify(data.children))
      })
  }

  await getPostsFromSubreddit('instant_regret');

  // const rc = new RedditCrawler(config.crawler.reddit);

  // rc.getPosts([
  //   { name: 'idiotsfightingthings' },
  //   { name: 'instant_regret' },
  //   { name: 'instantkarma' },
  //   { name: 'winstupidprizes' },
  // ]).then(results => {

  //   const unique = (curr, index, arr) => index === arr.indexOf(curr)
  //   console.log(results['idiotsfightingthings'].map(r => r.data.name).filter(unique).length);
  //   console.log(results['idiotsfightingthings'].map(r => r.data.name).length);
  //   console.log(results['instant_regret'].map(r => r.data.name).filter(unique).length);
  //   console.log(results['instant_regret'].map(r => r.data.name).length);
  //   console.log(results['instantkarma'].map(r => r.data.name).filter(unique).length);
  //   console.log(results['instantkarma'].map(r => r.data.name).length);
  //   console.log(results['winstupidprizes'].map(r => r.data.name).filter(unique).length);
  //   console.log(results['winstupidprizes'].map(r => r.data.name).length);
  // })

})();
