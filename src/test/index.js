import YoutubeDlDownloader from '@/VideoCreator/lib/Downloader/YoutubeDlDownloader';
import path from 'path';
import fs from 'fs';

(async () => {
  console.log((new YoutubeDlDownloader)._getYoutubeDlBinary());

  (new YoutubeDlDownloader())
    .download('https://www.youtube.com/watch?v=m3ZI15VjwEU')
    .pipe(fs.createWriteStream(path.resolve(__dirname, '../test/m3ZI15VjwEU.mp4')));
})();
