// function People() {}

// let person = new People();

// console.log(person instanceof People);

function myInstanceof(left, right) {
  let leftProto = Object.getPrototypeOf(left); // Object.getPrototypeOf()方法返回指定对象的原型(__proto__)
  let prototype = right.prototype; // 返回右侧的原型对象
  while (true) {
    if (!leftProto) return false;
    if (leftProto === prototype) {
      return true;
    }
    leftProto = Object.getPrototypeOf(leftProto);
  }
}

// console.log(myInstanceof(person, People));
