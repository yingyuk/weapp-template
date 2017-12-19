import wepy from 'wepy';

import store from '@/store';

export default class connectMixin extends wepy.mixin {
  myConnect(mapState) {
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const data = mapState(state);
      // 当没有映射关系的 state 改变的时候, 这里也做了 setData, 需要优化
      this.setData(data);
    });
  }
  onLoad() {
    this.store = store;
    if (this.mapStateToProps instanceof Object) {
      // 订阅 redux 数据变化
      this.myConnect(this.mapStateToProps);
    }
  }
  onUnload() {
    if (this.unsubscribe) {
      // 取消订阅 redux 数据变化
      this.unsubscribe();
    }
  }
}
