import wepy from 'wepy';

// myLoading.show({ title: '加载中1' });
// myLoading.show({ title: '加载中2' });
// myLoading.hide(); // 不会关闭 loading
// myLoading.hide(); // 关闭 loading

/**
 * 对小程序 Loading 的封装
 *  当多个 loading 并发时, 要等所有 loading 事件完成后, 才会关闭 loading
 *
 */
export const myLoading = {
  count: 0,
  show({ title = '加载中...', mask = true }) {
    wepy.showLoading({ title, mask });
    this.count += 1;
  },
  hide() {
    this.count -= 1;
    if (this.count === 0) {
      wepy.hideLoading();
    }
  },
};
