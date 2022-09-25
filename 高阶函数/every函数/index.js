const every = (array, fn) => {
  let result = true;
  for (const i of array) {
    if (!fn(i)) {
      result = false;
      break;
    }
  }
  return result;
};

let arr = [1, 2, 3, 4, 5, 6, 7];

let data = every(arr, function (item) {
  return item < 5;
});

console.log(data);
