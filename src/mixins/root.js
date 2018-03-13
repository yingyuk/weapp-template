import wepy from 'wepy';
import { getStore } from 'wepy-redux';

import logger from '@/plugins/logger';

const reduxStore = getStore();

export default class rootMixin extends wepy.mixin {
  reduxStore = reduxStore; // redux
  logger = logger; // 开发环境打印日志
}
