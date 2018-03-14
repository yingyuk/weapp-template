// 用户的微信信息
import wepy from 'wepy';

import { getUserInfoProxy /* , checkSessionValid */ } from '@/sdk/open/login';

export const SAVE_USERINFO = 'wxUser/SAVE_USERINFO';

const is4Min = 4 * 60 * 1000; // 4 min

const initialState = {
  // #### 来自微信的数据
  // 来自微信的数据, 不一定会获取, 当有 user 时, 就不会获取 userInfo;
  // login
  code: '',
  // user
  encryptedData: '',
  iv: '',
  signature: '',
  userInfo: {
    avatarUrl: '',
    nickName: '',
  },

  // #### 来自后端的数据
  // 用户信息
  session_key: '',
  openid: '',
  // token 信息, 缓存到 localstorage 了
  token: '', // 用户标识 token
  up_token: '', // 上传图片 token
  // user 和 userInfo 类似, 但字段名称不一样
  user: {
    avatar: '',
    nickname: '',
  },
};

/**
 * 微信 用户登录;
 * 获取用户 code
 */
export const wxLogin = () => async (dispatch, getState) => {
  const { wxUser: { code } = {} } = getState();
  // eslint-disable-next-line
  let payload = { code };

  // const isValid = await checkSessionValid();
  if (!code) {
    const { code: CODE } = await wepy.login();
    // https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxchecksessionobject
    // code 用户登录凭证（有效期五分钟）
    payload.code = CODE;
  }
  dispatch({
    type: SAVE_USERINFO,
    payload,
  });
  setTimeout(() => {
    // 四分钟后删除 redux 中保存的 code
    dispatch({
      type: SAVE_USERINFO,
      payload: { code: '' },
    });
  }, is4Min);
  return payload;
};

/**
 * 微信 用户信息授权
 * 获取用户个人信息
 * return { encryptedData, iv, signature, userInfo }
 */
export const wxGetUserInfo = () => async (dispatch, getState) => {
  const { wxUser = {} } = getState();
  const isGot = wxUser.encryptedData && wxUser.iv && wxUser.signature;
  if (isGot) {
    // 已经获取过用户信息
    return wxUser;
  }
  const { encryptedData, iv, signature, userInfo } = await getUserInfoProxy({ force: true });
  dispatch({
    type: SAVE_USERINFO,
    payload: { encryptedData, iv, signature, userInfo },
  });
  return { encryptedData, iv, signature, userInfo };
};

export const saveUserInfo = payload => ({ type: SAVE_USERINFO, payload });

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USERINFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
