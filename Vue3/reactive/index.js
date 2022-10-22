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
      track(target, key);
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
        trigger(target, key);
      }
      return result;
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key);
      if (hadKey && result) {
        // 触发更新
        trigger(target, key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
}

/**
 * 收集依赖
 * @param {*} target  响应式对象
 * @param {*} key 响应式对象中的属性
 *
 * targetMap：WeakMap实例，key是target对象，value是depsMap
 * depsMap： map实例，key是target对象中的属性，value是dep
 * dep：Set实例，存储的是effect中的回调函数
 */

let activeEffect = null;
export function effect(callback) {
  activeEffect = callback;
  // 收集依赖
  callback();
  activeEffect = null;
}

let targetMap = new WeakMap();

export function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect);
}

/**
 * 触发依赖
 */

export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) return;
  let dep = depsMap.get(key);
  if (!dep) return;
  dep.forEach((callback) => {
    callback();
  });
}
