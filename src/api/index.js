import { errorParse } from '@/assets/scripts/utils';

export default function request(opt, showLoading = true, showErrMsg = true) {
  if (showLoading) {
    wx.showLoading({ title: '加载中' });
  }
  return new Promise(async (resolve, reject) => {
    try {
      const res = await this.requestApi(opt);
      resolve(res);
    } catch (err) {
      const errMsg = errorParse(err);

      if (showErrMsg) {
        wx.showModal({
          title: '提示',
          content: errMsg,
          showCancel: false,
        });
      }
      reject(new Error(errMsg));
    } finally {
      // finally
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
      // es7
      if (showLoading) {
        wx.hideLoading();
      }
    }
  });
}
