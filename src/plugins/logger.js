import { NODE_ENV } from '@/assets/scripts/utils';

const isProd = NODE_ENV === 'production';

const logger = isProd
  ? {
      log: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    }
  : console;

export default logger;
