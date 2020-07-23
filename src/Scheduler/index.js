import config from '../common/Config';
import Logger from '../common/Support/Logger';
import { date } from 'locutus/php/datetime';
import {exec} from 'child_process';
import path from 'path';

const logger = Logger.scope('Scheduler');

logger.info(`Checking scheduled videos for today: ${date('l, d. F Y')}.`)

let toBeProcessed = 0;

for (const seriesId in config.series) {
  const { publish } = config.series[seriesId];

  if (
    !(
      publish.frequency === 'daily' ||
      publish.frequency === 'weekly' && publish.weekday.toLowerCase() === date('l').toLowerCase()
    )
  ) {
    continue;
  }

  logger.info(`Found a scheduled video for the series [${seriesId}]. Planned release time: ${publish.time} ${publish.timezone}.`);

  logger.start({prefix: `[${seriesId}]`, message: `Starting VideoCreator.`});

  const cp = exec(`node ${path.resolve(__dirname, 'video_creator.js')} "${seriesId}"`);

  cp.on('close', (number) => {
    if (number === 0) {
      logger.success({prefix: `[${seriesId}]`, message: `Videocreator finished.`});
    } else {
      logger.error({prefix: `[${seriesId}]`, message: `VideoCreator exited with an error :-/.`});
    }
  });

  if (process.env.NODE_ENV === 'development') {
    cp.stdout.on('data', (data) => {
      logger.debug({prefix: `VideoCreator/${seriesId}`, message: `Stdout: \n    ${data.trim()}`});
    });
  }

  cp.stderr.on('data', (data) => {
    logger.scope(`VideoCreator/${seriesId}`).error(data.trim());
  });

  toBeProcessed++;
}

if (!toBeProcessed) {
  logger.complete('No videos today, bye!');
  process.exit(0);
}
