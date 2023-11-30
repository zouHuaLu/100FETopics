先看这个：[Promise A+ 规范中文版](https://www.ituring.com.cn/article/66566)

记住规范，能让你更容易写出代码！

# 实现一个简易版的`Promise`

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
    const that = this
    that.state = PENDING
    that.value = null
    that.resolvedCallbacks = []
    that.rejectedCallbacks = []
//     待完善resolve和reject函数
//     待完善执行fn函数
}
```

- 首先创建三个常量用于表示状态，对于经常使用的一些值都应该通过常量来管理，便于开发以及后期维护
- 在函数内部首先创建常量`that`，因为代码可能会异步执行，用于获取正确的`this`对象
- 一开始`Promise`的初始化状态是`pending`
- `value`变量用于保存`resolve`或者`reject`中传入的值
- `resolvedCallbacks`和`rejectedCallbacks`用于保存`then`中的回调，因为当执行完`Promise`
  时状态可能还是等待中，这时候应该把`then`中的回调保存起来用于状态改变时使用

接下来完善resolve和reject函数

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
    const that = this
    that.state = PENDING
    that.value = null
    that.resolvedCallbacks = []
    that.rejectedCallbacks = []
//     待完善resolve和reject函数
//     待完善执行fn函数
    function resolve(value) {
        if (that.state === PENDING) {
            that.state = RESOLVED
            that.value = value
            that.resolvedCallbacks.map(cb => cb(that.value))
        }
    }

    function reject(value) {
        if (that.state === PENDING) {
            that.state = REJECTED
            that.value = value
            that.rejectedCallbacks.map(cb => cb(that.value))
        }
    }
}
```

- 首先要判断当前状态是否为pending，因为只有pending状态可以变为其他状态
- 将当前状态改为对应状态，并且将传入的值赋值给`value`
- 遍历回调数组并执行

完成以上两个函数，接下来该实现如何执行Promise中传入的函数了

```js
try {
    fn(resolve, reject)
} catch (e) {
    reject(e)
}
```

- 执行传入的参数并且将之前两个函数当做参数穿进去
- 执行函数过程中可能遇到错误，需要捕获并且执行`reject`函数

最后实现较为复杂的`then`函数

```js
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : r => {
    throw r
  }
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  if (that.state === REJECTED) {
    onRejected(that.value)
  }
}
```

- 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
-
当参数不是函数类型时，需要创建一个函数赋值给对应的参数，同时也实现了透传：` onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v`

一个透传的例子：

```js
Promise.resolve(4).then().then((value) => console.log(value))
```

当状态不是等待态时，就去执行相对应的函数。如果状态是等待态的话，就往回调函数中`push`函数，比如一下代码就会进入等待态逻辑
```js
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 0)
}).then(value => {
    console.log(value)
})
```
