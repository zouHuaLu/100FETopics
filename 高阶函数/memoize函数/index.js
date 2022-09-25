// 对函数执行结果进行缓存
function memoize(fn) {
  let cache = {};
  return function () {
    let key = JSON.stringify(arguments);
    if (cache[key]) {
      return cache[key];
    } else {
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  };
}

function getArea(r) {
  console.log(r);
  return Math.PI * r * r;
}

const getAreaMemory = memoize(getArea);

getAreaMemory(5);
getAreaMemory(5);
getAreaMemory(5);
getAreaMemory(6);
getAreaMemory(6);
