### SDK

这里只是对微信小程序某些 API 的特殊封装; 比如强制获取用户个人信息;

wepy 已经对微信小程序所有 API 的 Promise 化了; `this.use('promisify');` 在 `app.wpy` 的 `constructor`
