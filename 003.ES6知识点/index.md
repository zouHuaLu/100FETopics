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
