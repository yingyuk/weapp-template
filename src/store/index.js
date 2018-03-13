import wepy from 'wepy';

import { NAME } from '@/assets/scripts/utils';

const projectName = NAME; // 项目名称

const prifix = `${projectName}--`;

const is1Day = 24 * 60 * 60 * 1000;

// 用户标识, 用于 API
export const tokenKey = `${prifix}token`;

// 上传图片 token
export const upTokenKey = `${prifix}up_token`;

// 用户个人信息
export const userKey = `${prifix}user`;

// 用户 session_key
export const sessionKey = `${prifix}session_key`;

// 用户 openid
export const openidKey = `${prifix}openid`;

// eslint-disable-next-line
export const set = (key = '', value = '', expirationDay = 0) => {
  // eslint-disable-next-line
  const timestamp = expirationDay && new Date().getTime() + expirationDay * is1Day;
  try {
    wx.setStorageSync(key, { timestamp, value });
  } catch (error) {
    return wepy.showModal({
      title: '提示',
      content: error,
      showCancel: false,
    });
  }
};

export const get = key => {
  try {
    const { value, timestamp } = wx.getStorageSync(key) || {};
    const invalid = timestamp && new Date().getTime() > timestamp;
    if (invalid) {
      // 移除本地数据
      wx.removeStorageSync(key);
      return null;
    }
    return value;
  } catch (error) {
    return wepy.showModal({
      title: '提示',
      content: error,
      showCancel: false,
    });
  }
};

export default {
  set,
  get,
};
