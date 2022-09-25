const some = (array, fn) => {
  let result = false;
  for (const i of array) {
    if (fn(i)) {
      result = true;
      break;
    }
  }
  return result;
};

let arr = [1, 2, 3, 4, 5, 6];

const data = some(arr, function (item) {
  return item > 6;
});

console.log(data);
