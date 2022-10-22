function ajax(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";
    xhr.onload = function () {
      // 请求完成
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    xhr.send();
  });
}

ajax("./data.json").then(
  (data) => {
    console.log(data);
  },
  (error) => {
    console.log(error);
  }
);
