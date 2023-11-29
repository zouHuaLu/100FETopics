## var、let、const的区别

### var

```js
console.log(a) // undefined
var a = 1
```

上述代码中，虽然变量还没有被声明，但是我们却可以使用这个变量，这就是所谓的变量提升。提升的仅仅是声明，而不是赋值

上述代码的执行顺序是：

```js
var a
console.log(a) // undefined
a = 1
```

不仅仅是变量会被提升，函数也会被提升

```js
console.log(a) // ƒ a() {}
function a() {
}

var a = 1
```

通过上述代码可以看出，函数的声明也会被提升，并且函数的声明会覆盖变量声明

### let和const

全局作用域下使用`let`和`const`声明变量，变量并不会被挂载到`window`上，这一点就和`var`声明有区别

小结：

- 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部
- var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用
- var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会
- let 和 const 作用基本一致，但是后者声明的变量不能再次赋值

## 原型继承和Class继承

`class`只是语法糖，本质还是函数

```js
class Person {
}

Person instanceof Function // true
```

### 组合继承

组合继承是最常用的继承方式

```js
function Parent(value) {
    this.val = value
}

Parent.prototype.getValue = function () {
    console.log(this.val)
}

function Child(value) {
    Parent.call(this, value)
}

Child.prototype = new Parent()

const child = new Child(1)

child.getValue() //1
child instanceof Parent // true
```

以上代码继承的核心在于子类的构造函数中通过`Parent.call(this, value)`将父类实例的属性赋值给子类，这样子类就拥有了父类实例的属性。
然后通过`Child.prototype = new Parent()`将子类的原型指向父类，这样子类就拥有了父类原型上的方法。

### 寄生组合继承

这种继承方式对组合继承进行了优化，组合继承缺点在于继承父类函数时调用了构造函数，我们只需要优化掉这点就行了。

```js
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```

### Class继承

```js
class Parent {
    constructor(value) {
        this.val = value
    }

    getValue() {
        console.log(this.val)
    }
}

class Child extends Parent {

    constructor(value) {
        super(value);
    }
}

let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```

## Proxy

用于自定义对象中的操作

数据响应式：
```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2

```

之所以 `Vue3.0` 要使用 `Proxy` 替换原本的 API 原因在于 `Proxy` 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 `Proxy` 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了。
