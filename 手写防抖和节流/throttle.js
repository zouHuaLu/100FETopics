// 节流函数
// 函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，
// 如果在同一个单位时间内某事件被触发多次，只有一次能生效。
// 节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

function throttle(fn, delay) {
  let flag = false;
  return function () {
    let that = this;
    let args = [...arguments];
    if (flag) return;
    flag = true;
    setTimeout(() => {
      fn.apply(that, args);
      flag = false;
    }, delay);
  };
}
