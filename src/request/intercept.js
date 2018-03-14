/* eslint no-param-reassign: 0 */
import wepy from 'wepy';

import errorParse from '@/request/errorParse';
import logger from '@/plugins/logger';

import { DOMAIN } from '@/assets/scripts/utils';
import { myLoading } from '@/sdk/react/feedback';

export default self => {
  if (!self) {
    logger.error('intercept 请传入 this');
    return;
  }
  let config = {};
  // 使用拦截器对原生API请求进行拦截。
  self.intercept('request', {
    // 发出请求时的回调函数
    config(option) {
      const isFullPath = option.url.indexOf('http') === 0; // 传入的是完整的地址, 比如七牛的资源
      if (!isFullPath) {
        // 拼接成完整 url
        option.url = DOMAIN + option.url;
      }
      option.method = option.method.toUpperCase();
      option.header = {
        ...option.header,
        'Halo-App': 'screen',
      };
      option.timestamp = +new Date();
      const { loadingTitle = '加载中...', showErrMsg = true } = option;
      config = { loadingTitle, showErrMsg };
      if (loadingTitle) {
        myLoading.show({ title: loadingTitle });
      }
      // 必须返回OBJECT参数对象，否则无法发送请求到服务端
      return option;
    },
    // 请求成功后的回调函数
    async success(response) {
      const { statusCode, data = {} } = response;
      const isSuccess = statusCode === 200 && data.iRet === 1;
      if (isSuccess) {
        // 必须返回响应数据对象，否则后续无法对响应数据进行处理
        return data;
      }
      const message = await errorParse(response);
      const { showErrMsg } = config;
      if (showErrMsg) {
        await wepy.showModal({
          title: '提示',
          content: message,
          showCancel: false,
        });
      }
      // 必须返回响应数据对象，否则后续无法对响应数据进行处理
      return Promise.reject(message);
    },
    // 请求失败后的回调函数, fail 会直接被外层的 catch 捕获
    async fail(response) {
      const { showErrMsg } = config;
      if (showErrMsg) {
        const message = await errorParse(response);
        await wepy.showModal({
          title: '提示',
          content: message,
          showCancel: false,
        });
      }
      // 必须返回响应数据对象，否则后续无法对响应数据进行处理
      return response;
    },
    // 请求完成时的回调函数(请求成功或失败都会被执行)
    complete(/* response */) {
      const { loadingTitle } = config;
      if (loadingTitle) {
        myLoading.hide();
      }
    },
  });
};
