import { isProd } from '@/assets/scripts/utils';

const logger = isProd
  ? {
      log: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    }
  : console;

export default logger;
