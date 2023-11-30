# 手写call、apply、bind函数

## 手写call

```js
Function.prototype.myCall = function (context) {
    context = context || window
    const symbol = Symbol()
    context[symbol] = this  // this指的是需要执行的方法
    const args = [...arguments].slice(1) // 获取第二个参数
    const result = context[symbol](...args)  // 执行得到结果
    delete context[symbol]
    return result
}
```

## 手写apply

```js
Function.prototype.myApply = function (context) {
    context = context || window
    const symbol = Symbol()
    context[symbol] = this
    let results
    if ([arguments][1]) {
        results = context[symbol](...arguments[1])
    } else {
        results = context[symbol]()
    }
    delete context[symbol]
    return results
}
```

## bind

bind需要返回一个函数，并且需要判断一些边界问题

```js
Function.prototype.myBind = function (context) {
    context = context || window
    const that = this  // 这里的this指的是调用myBind的方法
    const args = [...arguments].slice(1)  // 获取第二个开始往后的参数
    return function F() {
        if (this instanceof F) {
            return new that(...args, ...arguments)
        }
        return that.apply(context, args.concat(...arguments))
    }
}
```

- bind 返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过 new 的方式，我们先来说直接调用的方式
- 对于直接调用来说，这里选择了 `apply` 的方式实现，但是对于参数需要注意以下情况：因为 `bind`
  可以实现类似这样的代码 `f.bind(obj, 1)(2)`
  ，所以我们需要将两边的参数拼接起来，于是就有了这样的实现 `args.concat(...arguments)`
- 最后来说通过 `new` 的方式，在之前的章节中我们学习过如何判断 `this`，对于 `new` 的情况来说，不会被任何方式改变`this`
  ，所以对于这种情况我们需要忽略传入的 `this`

# new

调用new的过程中会发生以上四件事情
1. 新生成了一个对象
2. 链接到原型
3. 绑定this
4. 返回新对象

```js
function create() {
  let obj = {}
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
```
