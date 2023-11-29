# `并行`与`并发`

并发：有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务
并行：假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。

并发指的是场景 / 需求，比如说我们这个业务有高并发的场景，但是并行指的是能力，表明我们目前的功能是可以实现这件事情的。

# 回调函数

缺点：

1. 不能使用`try catch`不过错误
2. 不能直接`return`

# Generator

它可以控制函数的执行

```js
function* foo(x) {
    let y = 2 * (yield (x + 1))
    let z = yield (y / 3)
    return (x + y + z)
}

let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```

# Promise

三种状态：

1. 等待中（pending）
2. 完成了（resolved）
3. 拒绝了（rejected）

`pending`一旦状态改变，就不会再变。

```js
new Promise((resolve, reject) => {
    resolve('success')
    // 无效
    reject('reject')
})
```

`Promise`构造函数内的代码是立即执行的

```js
new Promise((resolve, reject) => {
    console.log('new Promise')
    resolve('success')
})
console.log('finifsh')
// new Promise -> finifsh
```

`Promise`实现了链式调用，也就是说每次调用`then`之后返回的都是一个新的`Promise`，因为`Promise`的状态变化过后是不可变的了。

如果你在`then`的过程中使用了`return`，那么`return`的值会被`resolve()`包装

## all、race、allSettled等API的使用

# async与await

一个函数如果加上 `async` ，那么该函数就会返回一个 `Promise`。

`async` 就是将函数返回值使用 `Promise.resolve()` 包裹了下，和 `then` 中处理返回值一样，并且 `await` 只能配套 `async` 使用。

`async` 和 `await` 可以说是异步终极解决方案了，相比直接使用 `Promise` 来说，优势在于处理 `then` 的调用链，能够更清晰准确的写出代码，毕竟写一大堆 `then` 也很恶心，并且也能优雅地解决回调地狱问题。

当然也存在一些缺点，因为 `await` 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 `await` 会导致性能上的降低。
