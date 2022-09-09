// 实现一个Promise

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status = PENDING;
  constructor(fn) {
    // fn接受resolve和reject两个参数
    // 初始状态为pending
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch (newStatus) {
      case FULFILLED:
        {
          this.FULFILLED_CALLBACK_LIST.forEach((cb) => {
            cb(this.value);
          });
        }
        break;
      case REJECTED:
        this.REJECTED_CALLBACK_LIST.forEach((cb) => {
          cb(this.reason);
        });
        break;
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
    }
  }
  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }
  then(onFulfilled, onRejected) {
    const realOnFulfilled = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => {
          return value;
        };

    const realOnRejected = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };

    // then方法的返回值仍然是一个promise
    // new MPromise((resolve,reject)=>{
    // setTimeout(()=>{resolve(111)},1000)
    // this.resolve(111)
    // }).then()
    const promise2 = new MPromise((resolve, reject) => {
      // onFulfilled 或者 onRejected 执行抛出异常，promise2 需要被 reject
      const fulfilledMicrotask = () => {
        try {
          // onFulfilled 或者 onRejected 执行结果为 x，调用 resolvePromise。
          const x = realOnFulfilled(this.value);
          this.resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };
      const rejextedMicrotask = () => {
        try {
          const x = realOnRejected(this.reason);
          this.resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };
      switch (this.status) {
        case FULFILLED:
          fulfilledMicrotask();
          break;
        case REJECTED:
          rejextedMicrotask();
          break;
        case PENDING:
          this.FULFILLED_CALLBACK_LIST.push(realOnFulfilled);
          this.REJECTED_CALLBACK_LIST.push(realOnRejected);
          break;
        default:
          break;
      }
    });
    return promise2;
  }
  resolvePromise(promise2, x, resolve, reject) {}
  ifFunction(value) {
    return typeof value === "function";
  }
}

const promise = new MPromise((resolve, reject) => {
  console.log(1);
  resolve(2);
});
