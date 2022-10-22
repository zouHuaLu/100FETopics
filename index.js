// 浅拷贝1
let obj1 = {
  a: 1,
  b: 2,
  c: {
    d: 5,
  },
};
let obj2 = Object.assign({}, obj1);
obj2.a = 3;
obj2.c.d = 6;

console.log(obj1); // ?
console.log(obj2); // ?
