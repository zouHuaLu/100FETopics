// 数组过滤函数
function filter(array, fn) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
}

let arr = [1, 3, 4, 5, 7, 9, 23, 6, 73];

let data = filter(arr, function (item) {
  return item > 5;
});
console.log(data);
