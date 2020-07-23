import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import {path as ffpropePath} from 'ffprobe-static';

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffpropePath);

export default ffmpeg;
