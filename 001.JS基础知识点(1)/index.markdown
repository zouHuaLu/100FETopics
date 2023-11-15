## 类型

JS数据类型：

1. 原始类型
2. 对象类型

## 原始类型

原始类型存储的是值，一般存储在栈上

- boolean
- null
- undefined
- number(浮点类型)
- string
- symbol
- bigint

> tips: `typeof null`会输出`object`，这是一种历史遗留bug，它就是原始类型

## 对象类型

对象类型存储的是地址（指针），数据存储在堆上

看一个示例：

```js
function test(person) {
    person.age = 26
    person = {
        name: 'zouhualu',
        age: 30
    }

    return person
}

const p1 = {
    name: 'hj',
    age: 25
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```

`p1`的值是`{age:26,name:'hj'}`，`p2`的值是`{age:30,name:'zouhualu'}`

## 类型判断

### typeof

`typeof`对于原始类型来说，除了`null`其余的都可以显示正确的类型，如果想要判断`null`的话可以使用`variable === null`

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof 1n // bigint
```

`typeof`对于对象类型来说，除了函数其余都会显示`object`，所以说`typeof`并不能准确判断变量到底是什么类型

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

### instanceof

`instacnceof`通过原型链的方式来判断是否为`构建函数的实例`，常用于判断具体的对象类型

```js
const Person = function () {
}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```

另外我们还可以直接通过构建函数来判断类型

```js
[].constructor === Array  // true
```

### Object.prototype.toString.call

`Object.prototype.toString.call`是判断对象类型的最佳方案，能判断的类型最完整

```js
Object.prototype.toString.call(null) // [Object Null]

Object.prototype.toString.call(1) // [Object Number]

Object.prototype.toString.call('') // [Object String]

Object.prototype.toString.call(1n) // [Object BigInt]

Object.prototype.toString.call([]) // [Object Array]

Object.prototype.toString.call({}) // [Object Object]

Object.prototype.toString.call(function () {
}) // [Object Funtion]
```

### is### 专属API

```js
Array.isArray([])  // true

isNaN(',')  // true
```

## 常见面试题

1. 说说`instanceof`的原理
2. 请手写`instanceof`
3. JS类型判断有几种方式

## 类型转换

js类型转换只有三种情况:

- 转换为布尔值
- 转换为数字
- 转换为字符串

![img.png](img.png)

### 转Boolean

