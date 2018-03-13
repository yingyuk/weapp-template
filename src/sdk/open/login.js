import wepy from 'wepy';

/**
 * 获取用户个人信息
 * forceGetUserInfo Boolean 是否需要强制获取用户个人信息
 * @returns { encryptedData, iv, signature, userInfo }
 */
export async function getUserInfoProxy(forceGetUserInfo = false) {
  try {
    const { encryptedData, iv, signature, userInfo } = await wepy.getUserInfo();
    return { encryptedData, iv, signature, userInfo };
  } catch (error) {
    if (!forceGetUserInfo) {
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
    // 用户拒绝授权用户信息
    const title = '您没有授权用户信息给我们，将无法使用我们的服务，现在就去设置吗';
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
