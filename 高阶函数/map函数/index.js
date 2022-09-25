const map = (array, fn) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(fn(array[i]));
  }
  return result;
};

let arr = [1, 3, 5, 7, 9];

let data = map(arr, function (item) {
  return item * 2;
});

console.log(data);
