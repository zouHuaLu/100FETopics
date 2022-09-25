// 封装一个函数，使得这个函数只会执行一次
// 闭包

function once(fn) {
  let done = true;
  return function () {
    if (done) {
      done = false;
      return fn.apply(this, arguments);
    }
  };
}

let pay = once(function (money) {
  console.log(`支付了：${money}`);
});

pay(5);
pay(6);
pay(7);
