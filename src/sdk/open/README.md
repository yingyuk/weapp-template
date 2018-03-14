### 开放接口

[登录](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html)

* `getUserInfoProxy`

当用户拒绝授权个人信息时, 是否强制获取用户个人信息;

```js
import { getUserInfoProxy } from '@/sdk/open/login';

const title = '您没有授权公开信息给我们，将无法使用我们的服务，现在就去设置吗?';
const { encryptedData, iv, signature, userInfo } = await getUserInfoProxy({ force: true, title }); // 强制获取个人信息
```
