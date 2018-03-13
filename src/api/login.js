import wepy from 'wepy';
import { getStore } from 'wepy-redux';

import store, { tokenKey, upTokenKey, userKey /* , sessionKey, openidKey */ } from '@/store';
import { wxLogin, wxGetUserInfo, SAVE_USERINFO } from '@/redux/wxUser';

const reduxStore = getStore();

const ONE_WEEK = 1;

/**
 * 后端接口登录;
 * 用 code 获取用户 session_key, openid
 */
export const authAPI = async () => {
  const { wxUser = {} } = reduxStore;
  const isFetched = wxUser.session_key && wxUser.openid;
  if (isFetched) {
    return wxUser;
  }
  // 不保存 session_key, openid 到本地
  // const [localSession, localOpenid] = [store.get(sessionKey), store.get(openidKey)];
  // const isSaved = localSession && localOpenid;
  // if (isSaved) {
  //   return reduxStore.dispatch({
  //     type: SAVE_USERINFO,
  //     payload: { session_key: localSession, openid: localOpenid },
  //   });
  // }
  const { code } = await reduxStore.dispatch(wxLogin());
  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxchecksessionobject
  // code 有效期为 五分钟
  const { data: { session_key, openid } } = await wepy.request({
    method: 'POST',
    url: '/api/screen/v1/wechat/auth',
    data: { code },
  });
  reduxStore.dispatch({
    type: SAVE_USERINFO,
    payload: { session_key, openid },
  });
  // // 保存信息 一周
  // store.set(sessionKey, session_key, ONE_WEEK);
  // store.set(openidKey, openid, ONE_WEEK);
  return { session_key, openid };
};

/**
 * 后端登录, 避免重复登录
 * 获取 用户标识, 上传文件 token, 用户信息
 * 信息存储 一周
 * return { token, up_token, user };
 */
export const loginAPI = async () => {
  const { wxUser = {} } = reduxStore;
  const isFetched = wxUser.token && wxUser.up_token;
  if (isFetched) {
    return wxUser;
  }
  const [localToken, localUpToken, localUser] = [
    store.get(tokenKey),
    store.get(upTokenKey),
    store.get(userKey),
  ];
  const isSaved = localToken && localUpToken && localUser;
  if (isSaved) {
    return reduxStore.dispatch({
      type: SAVE_USERINFO,
      payload: { token: localToken, up_token: localUpToken, user: localUser },
    });
  }
  // 登录, 授权个人信息; 同时进行
  const [{ session_key }, { encryptedData: encrypted_data, iv }] = await Promise.all([
    authAPI(),
    reduxStore.dispatch(wxGetUserInfo()),
  ]);
  const { data: { token, up_token, user } } = await wepy.request({
    method: 'POST',
    url: '/api/screen/v1/wechat/login',
    data: { session_key, encrypted_data, iv },
  });
  // 保存信息 一周
  store.set(tokenKey, token, ONE_WEEK);
  store.set(upTokenKey, up_token, ONE_WEEK);
  store.set(userKey, user, ONE_WEEK);
  reduxStore.dispatch({
    type: SAVE_USERINFO,
    payload: { token, up_token, user },
  });
  return { token, up_token, user };
};
