import Tmp from '@/common/Support/Tmp';
import download from 'download';

export default class HlsPlaylistParser {
  async load(playlistUri) {
    this.playlistUri = playlistUri;
    this.playlistFile = Tmp.createTemporaryFile('.m3u8');

    await download(this.playlistUri, this.playlistFile);
  }

  async parse() {

  }
}
