### 界面

[交互反馈](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html)

* `myLoading`

当多个 loading 并发时, 要等所有 loading 事件完成后, 才会关闭 loading;

```js
import { myLoading } from '@/sdk/react/feedback';

myLoading.show({ title: '加载中1', mask: false });
myLoading.show({ title: '加载中2', mask: true });
myLoading.hide(); // 不会关闭 loading
myLoading.hide(); // 关闭 loading
```
