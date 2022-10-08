// let newObj = Object.create({});
// console.log(newObj);

function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
