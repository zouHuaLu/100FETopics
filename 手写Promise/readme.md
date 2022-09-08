# Promise A+

## 规范

### Promise States

三种状态

- pending 状态
  - 初始状态，可改变。
  - 一个 promise 在被 resolve 或者 reject 之前，都处于这个状态
  - 通过 resolve（动作） -> fulfilled 状态（结果）
  - 通过 reject（动作） -> rejected 状态（结果）
- fulfilled 状态
  - 最终态，不可改变
  - 一个 promise 经过 resolve 后变成这个状态
  - 必须拥有一个 value 值
- rejected 状态
  - 最终态，不可改变
  - 一个 promise 经过 reject 后变成这个状态
  - 必须拥有一个 reason 值

pending -> resolve -> fulfilled
pending -> reject -> rejected

### then

promise 应该提供一个 then 方法，用来访问最终的结果，无论是 value 还是 reason

```js
promise.then(onFulfilled, onRejected);
```

1. 参数要求
   1. onFulfilled 必须是函数类型，如果不是函数，应该被忽略。
   1. onRejected 必须是函数类型，如果不是函数，应该被忽略。
2. onFulfilled 特性
   1. 在 promise 变成 fulfilled 时，应该调用 onFulfilled，参数是 value。
   2. 在 promise 变成 fulfilled 之前，不应该被调用。
   3. 只能被调用一次。
3. onRejected 特性
   1 在 promise 变成 rejected 时，应该调用 onRejected，参数是 reason。
   2 在 promise 变成 rejected 之前，不应该被调用。
   3 只能被调用一次。
4. onFulfilled 和 onRejected 是微任务
   queueMicrotask 实现微任务的调用
5. then 方法可以被调用多次
   1. promise 变成 fulfilled 后，所有的 onFulfilled 的回调都应该按照 then 的顺序执行。
      在实现 promise 的时候，需要一个数组来存储 onFulfilled 的 callback 回调。
   2. promise 变成 rejected 后，所有的 onRejected 的回调都应该按照 then 的顺序执行。
      在实现 promise 的时候，需要一个数组来存储 onRejected 的 callback 回调。
6. then 的返回值是一个 promise
   返回的 promise 是新的还是旧的呢？

   ```js
   const promise2 = promise1.then(onFulfilled, onRejected);
   // 新的，promise1的状态改变了，就不可以再改变了，所以promise2变成了pending状态
   ```

   1. onFulfilled 或者 onRejected 执行结果为 x，调用 resolvePromise。
   2. onFulfilled 或者 onRejected 执行抛出异常，promise2 需要被 reject
   3. 如果 onFulfilled 不是一个函数，promise2 以 promise1 的 value 触发 fulfilled。
   4. 如果 onRejected 不是一个函数，promise2 以 promise1 的 reason 触发 rejected。

7. resolvePromise

   ```js
   resolvePromise(promise2, x, resolve, reject);
   ```

   1. 如果 promise2 和 x 相等，那么 reject TypeError 报错
   2. 如果 x 是一个 promise
      1. 如果 x 是 pending，promise 的状态必须也是 pending，知道 x 变成 fulfilled / rejected
      2. 如果 x 是 fulfilled，fulfill promise with the same value
      3. 如果 x 是 rejected，reject promise with the same reason
   3. 如果 x 是一个 Object 或者是一个 function

      let then = x.then

      1. 如果 x.then 这一步出错了，try catch(e),reject(e)

      2. 如果 then 是一个函数，then.call(x,resolvePromiseFn,rejectPromiseFn)

   resolvePromiseFn 的入参是 y，执行 resolvePromise(promise2,y,resolve,reject)

   如果调用 then 的时候抛出了异常，reject reason.
