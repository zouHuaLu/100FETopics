Function.prototype.myCall = function (context) {
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
  let symbol = symbol();
  context[symbol] = this; // this指的是A,也就是把方法A赋值给B
  let argument = [...arguments].slice(1);
  let result = context[symbol](...argument); //B来执行这个方法，那么this就指向了B
  delete context[symbol];
  return result;
};

// A.myCall(B,'hj')
