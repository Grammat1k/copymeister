import Logger from '../Support/Logger';

const logger = Logger.scope('Config');

logger.await('Loading config...');

let config = {};

try {
  config = eval('require')('../config.json');
  logger.complete(`Config loaded. Found ${config.series.length} serie${config.series.length === 1 ? 's' : ''}.`);
} catch {
  logger.error('Failed to load config!');
  process.exit(1);
}

export default config;
