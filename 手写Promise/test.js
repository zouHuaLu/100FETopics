const MyPromise = require("./lagou");

let promise = new MyPromise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("success,哈哈哈");
  //   }, 2000);
  resolve("success,哈哈哈");
});

promise.then((value) => {
  console.log(1);
  console.log(value);
});

promise.then((value) => {
  console.log(2);
  console.log(value);
});

promise
  .then((value) => {
    console.log(3);
    console.log(value);
    return 300;
  })
  .then((value1) => {
    console.log(value1);
  });
