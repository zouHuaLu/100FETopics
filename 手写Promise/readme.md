# Promise A+

## 规范

### Promise States

三种状态
+ pending状态
	+ 初始状态，可改变。
	+ 一个promise在被resolve或者reject之前，都处于这个状态
	+ 通过 resolve（动作） -> fulfilled状态（结果）
	+ 通过 reject（动作） -> rejected状态（结果）
+ fulfilled状态
	+ 最终态，不可改变
	+ 一个promise经过resolve后变成这个状态
	+ 必须拥有一个value值
+ rejected状态
	+ 最终态，不可改变
	+ 一个promise经过reject后变成这个状态
	+ 必须拥有一个reason值

pending -> resolve -> fulfilled
pending -> reject -> rejected

### then

promise 应该提供一个 then 方法，用来访问最终的结果，无论是value还是reason

```js
promise.then(onFulfilled,onRejected)
```

1. 参数要求
	1. onFulfilled 必须是函数类型，如果不是函数，应该被忽略。
	1. onRejected 必须是函数类型，如果不是函数，应该被忽略。
2. onFulfilled 特性
	1. 在promise变成 fulfilled 时，应该调用 onFulfilled，参数是 value。
	2. 在promise变成 fulfilled之前，不应该被调用。
	3. 只能被调用一次。
3. onRejected 特性
	1 在promise变成 rejected 时，应该调用 onRejected，参数是 reason。
	2 在promise变成 rejected之前，不应该被调用。
	3 只能被调用一次。
4. onFulfilled和onRejected是微任务
	queueMicrotask 实现微任务的调用
5. then方法可以被调用多次
	1. promise 变成 fulfilled 后，所有的onFulfilled的回调都应该按照then的顺序执行。
	在实现promise的时候，需要一个数组来存储 onFulfilled 的callback回调。
	2. promise 变成 rejected 后，所有的onRejected的回调都应该按照then的顺序执行。
	在实现promise的时候，需要一个数组来存储 onRejected 的callback回调。
6. then的返回值是一个promise
	返回的promise是新的还是旧的呢？
```js
 const promise2 = promise1.then(onFulfilled,onRejected)
 // 新的，promise1的状态改变了，就不可以再改变了，所以promise2变成了pending状态
```
	1. onFulfilled 或者 onRejected 执行结果为x，调用resolvePromise。
	2. onFulfilled 或者 onRejected 执行抛出异常，promise2需要被reject
	3. 如果onFulfilled 不是一个函数，promise2以promise1的value触发fulfilled。
	4. 如果onRejected 不是一个函数，promise2以promise1的reason触发rejected。
7. resolvePromise
```js 
 resolvePromise(promise2,x,resolve,reject)
```
	1 如果promise2和x相等，那么reject TypeError 报错
	2 如果 x 是一个promise
		1. 如果x是pending，promise的状态必须也是pending，知道x变成fulfilled / rejected
		2. 
 