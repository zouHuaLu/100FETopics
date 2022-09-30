Function.prototype.myBind = function (context) {
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
  const _this = this;
  const args = [...arguments].slice(1);
  //   返回一个函数
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  };
};

function test() {
  console.log(this.name1);
  console.log(this.age);
}

let obj = {
  name1: "hj",
  age: 26,
};

let a = test.myBind(obj, "xixi");
a();
