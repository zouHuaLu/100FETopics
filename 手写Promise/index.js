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
    return this.status;
  }

  set status(newStatus) {
    this.status = newStatus;
    switch (newStatus) {
      case FULFILLED:
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
      switch (this.status) {
        case FULFILLED:
          realOnFulfilled();
          break;
        case REJECTED:
          realOnRejected();
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
  ifFunction(value) {
    return typeof value === "function";
  }
}

const promise = new MPromise((resolve, reject) => {});
