/* eslint-disable */
/**
 * 通过装饰器来保存 redux state 映射关系
 *  由于 wepy 这个框架, 把 `class Page extends wepy.page` Page.prototype 改变了,
 *  所以无法通过 装饰器一次性 映射 redux 的 state;
 *  还需要 connectMixin 的配合; `src/mixins/connect`
 * @param {Function} mapStateToProps
 * @param {Function} mapDispatchToProps
 */
export default function createConnect(mapStateToProps, mapDispatchToProps) {
  return function connect(target) {
    target.prototype.mapStateToProps = mapStateToProps;
    target.prototype.mapDispatchToProps = mapDispatchToProps;
  };
}
