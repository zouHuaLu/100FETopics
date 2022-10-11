let personName = "hj";
let person = {};
Object.defineProperty(person, "name", {
  get: function () {
    console.log("触发了get");
    return personName;
  },
  set: function (val) {
    console.log("触发了set");
    personName = val;
  },
});

console.log(person.name);
person.age = 25;
person.name = "hualu";
