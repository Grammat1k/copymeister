const ParsedHlsPlaylist = require('./src/VideoCreator/lib/Downloader/Parsers/Hls/ParsedHlsPlaylist');

const m3u8 = require('m3u8');
const fs = require('fs');
const download = require('download');

(async () => {
  /*const parser = m3u8.createStream();
  await download('https://v.redd.it/wf9m26kcgnb51/HLSPlaylist.m3u8', 'test');
  const file = fs.createReadStream('test/HLSPlaylist.m3u8');
  file.pipe(parser);

  parser.on('item', function (item) {
    //
  });

  parser.on('m3u', function (m3u) {
    fs.writeFileSync('test/HLSPlaylist.json', JSON.stringify(m3u));
  });*/

  const playlist = new ParsedHlsPlaylist;
  await playlist.parse('test/HLSPlaylist.m3u8');
  console.log(playlist.getHighestQualityVideo());
})();
