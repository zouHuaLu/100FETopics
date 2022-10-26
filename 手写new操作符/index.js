// 在调用 new 的过程中会发生以上四件事情：
// （1）首先创建了一个新的空对象
// （2）设置原型，将对象的原型__proto__设置为函数的 prototype 对象。
// （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
// （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

function People(name, age) {
  this.name = name;
  this.age = age;
  return {
    obj: 2,
  };
}

// let person = new People("hj", 23);

function myNew() {
  let constructor = Array.prototype.shift.call(arguments); // 拿到第一个参数，也就是构造函数
  if (typeof constructor !== "function") {
    return;
  }
  let newObj = Object.create(constructor.prototype); // 新对象的__proto__指向构造函数的原型对象上
  let result = constructor.apply(newObj, arguments); // constructor是构造函数，newObj是新对象，
  // 调用构造函数并且将this指向新对象
  let flag =
    result && (typeof result === "object" || typeof result === "function");
  return flag ? result : newObj;
}

let person = myNew(People, "hj", 23);

console.log(person);
