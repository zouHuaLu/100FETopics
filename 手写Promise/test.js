const MyPromise = require("./lagou");

let promise = new MyPromise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("success,哈哈哈");
  //   }, 2000);
  resolve("success,哈哈哈");
});

function other() {
  return new MyPromise((resolve, reject) => {
    resolve("other");
  });
}

let p1 = promise.then((value) => {
  console.log(value);
  return p1;
});
p1.then(
  (value1) => {
    console.log(value1);
  },
  (reason) => {
    console.log(reason);
  }
);
