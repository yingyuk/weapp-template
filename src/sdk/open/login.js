import wepy from 'wepy';

/**
 * 获取用户个人信息
 * force Boolean 是否需要强制获取用户个人信息; default: false
 * title String 用户拒绝后的提示; default: '您没有授权公开信息给我们，将无法使用我们的服务，现在就去设置吗?'
 * @returns { encryptedData, iv, signature, userInfo }
 */
export async function getUserInfoProxy({ force = false, title = '您没有授权公开信息给我们，将无法使用我们的服务，现在就去设置吗?' }) {
  try {
    const { encryptedData, iv, signature, userInfo } = await wepy.getUserInfo();
    return { encryptedData, iv, signature, userInfo };
  } catch (error) {
    if (!force) {
      // 不需要强制获取用户个人信息
      return Promise.reject(error);
    }
    // 如果用户拒绝授权, 走 catch 分支;
    const getSettingRes = await wepy.getSetting();
    const needUserInfo = !getSettingRes.authSetting['scope.userInfo'];
    if (!needUserInfo) {
      // 不需要
      return Promise.reject(error);
    }
    // 但用户拒绝授权用户信息, 提示开启授权个人信息
    const { confirm } = await wepy.showModal({
      title: '提示',
      content: title,
    });
    if (!confirm) {
      // 确定
      return Promise.reject(error);
    }
    const openSettingRes = await wepy.openSetting();
    openSettingRes.authSetting = {
      'scope.userInfo': true,
    };
    const { encryptedData, iv, signature, userInfo } = await wepy.getUserInfo();
    return { encryptedData, iv, signature, userInfo };
  }
}

/**
 * 检测 session 是否过期
 * @returns Promise -> Boolean
 */
export const checkSessionValid = () =>
  new Promise(resolve => {
    // checkSession 其实是请求 微信服务器, 有一定的耗时
    wx.checkSession({
      success() {
        // session 有效
        resolve(true);
      },
      fail() {
        // session 过期
        resolve(false);
      },
    });
  });
