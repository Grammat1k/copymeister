

export default class ParsedHlsPlaylist {
  constructor(data, m3u8Uri) {
    this._m3u8Data = data;
    this._m3u8BaseUri = m3u8Uri.replace(/HLSPlaylist\.m3u8.*/, '');
  }

  getHighestQualityVideo() {
    if (!this._m3u8Data.items.StreamItem) {
      return null;
    }

    const resolution = (res) => res[0] * res[1];
    return this._m3u8Data.items.StreamItem.reduce(
      (previousValue, currentValue) =>
        resolution(previousValue) > resolution(currentValue)
          ? previousValue
          : currentValue,
    );
  }

  getHighestQualityVideoSourceUri() {
    return this.getVideoSourceUri(
      this.getHighestQualityVideo()
    );
  }

  hasAudio() {
    return this._m3u8Data.items.MediaItem && this._m3u8Data.items.MediaItem.length;
  }

  getHighestQualityAudio() {
    if (!this.hasAudio()) {
      return null;
    }

    return this._m3u8Data.items.MediaItem[this._m3u8Data.items.MediaItem.length - 1];
  }

  getHighestQualityAudioSourceUri() {
    if (!this.hasAudio()) {
      return null;
    }

    return this.getAudioSourceUri(this.getHighestQualityAudio());
  }

  getVideoSourceUri(item) {
    return this._m3u8BaseUri + item.properties.uri.split('.m3u8')[0] + '.ts';
  }

  getAudioSourceUri(item) {
    return this._m3u8BaseUri + item.attributes.attributes.uri.split('.m3u8')[0] + '.aac';
  }
}


