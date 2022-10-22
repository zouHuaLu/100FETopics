const isObject = (val) => val !== null && typeof val === "object";

const convert = (target) => {
  return isObject(target) ? reactive(target) : target;
};

// 判断某个对象中是否具有指定的属性
// const hasOwnProperty = Object.prototype.hasOwnProperty;
// const hasOwn = (target, key) => target.hasOwnProperty.call(target, key);
const hasOwn = (target, key) => target.hasOwnProperty(key);

export function reactive(target) {
  if (!isObject(target)) return;

  const handler = {
    get(target, key, receiver) {
      // 收集依赖
      console.log("get", key);
      // 如果当前对象的key属性也是对象的话，也需要做响应式
      const result = Reflect.get(target, key, receiver);
      return convert(result);
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      let result = true;
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver);
        // 触发更新
        console.log("set", key, value);
      }
      return result;
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key);
      if (hadKey && result) {
        // 触发更新
        console.log("delete", key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
}
