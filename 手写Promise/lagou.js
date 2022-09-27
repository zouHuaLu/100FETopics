/**
 * 1. Promise是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
 * 2. Promise中有三种状态，分别为 成功fulfilled，失败rejected，等待pending
 *      pending=>fulfilled
 *      pending=>rejected
 *      一旦状态确定就不可以更改
 * 3. resolve和reject函数是用来更改状态的
 *      resolve:fulfilled
 *      reject:rejected
 *
 * 4. then方法内部做的事情就是判断状态，如果状态成功，调用成功的回调函数，如果状态是失败，调用失败的回调函数。
 *      then方法是被定义在原型对象上的
 *
 * 5. then成功回调有一个参数，表示成功之后的值；失败回调有一个参数，表示失败后的原因。
 */
// let promise = new Promise((resolve, reject) => {});
// promise.then(()=>{},()=>{})

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败的原因
  reason = undefined;
  //   成功回调
  successCallback = [];
  //   失败回调
  failCallback = [];
  // 失败回调
  // this指向MyPromise的实例对象
  // value是成功之后的值
  resolve = (value) => {
    // 如果状态不是等待，阻止执行
    if (this.status != PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    this.value = value;
    // 判断成功回调是否存在，存在就调用
    while (this.successCallback.length > 0) {
      this.successCallback.shift()();
    }
  };
  // reason失败的值
  reject = (reason) => {
    if (this.status != PENDING) return;
    // 将状态改为失败
    this.status = REJECTED;
    this.reason = reason;
    // 判断失败回调是否存在，存在就调用
    while (this.failCallback.length > 0) {
      this.failCallback.shift()();
    }
  };
  then(successCallback, failCallback) {
    successCallback ? successCallback : (value) => value;
    failCallback
      ? failCallback
      : (reason) => {
          throw reason;
        };
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            // 判断x的值是普通值还是promise对象
            // 如果是普通值,直接调用resolve
            // 如果是promise对象,查看promise对象返回的结果
            // 再根据promise对象返回的结果,决定调用resolve还是reject
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            // 判断x的值是普通值还是promise对象
            // 如果是普通值,直接调用resolve
            // 如果是promise对象,查看promise对象返回的结果
            // 再根据promise对象返回的结果,决定调用resolve还是reject
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaning cycle detected for promise #<MyPromise>")
    );
  }
  if (x instanceof MyPromise) {
    // promise对象
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

module.exports = MyPromise;
