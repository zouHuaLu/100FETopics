const coloring =
  (fn) =>
  ({ background, color = "white" }) =>
  (...text) =>
    fn(`%c${text.join("")}`, `color:${color};background:${background}`);
const colors = {
  primary: "#007bff",
  success: "#28a745",
  warning: "#ffc107",
  danger: "#dc3545",
  info: "#17a2b8",
};
const dir = (key = "", value = {}) => {
  logs.primary(`++++++++++++start:${key}++++++++++++++`);
  console.dir(value);
  logs.primary(`++++++++++++end:${key}++++++++++++++`);
};
const logs = Object.keys(colors).reduce(
  (prev, curr) => ({
    ...prev,
    [curr]: coloring(console.log)({ background: colors[curr] }),
  }),
  { dir }
);

class MyPromise {
  static STATE_MAPPING = {
    PENDING: "pending",
    RESOLVED: "resolved",
    REJECTED: "rejected",
  };

  constructor(props) {
    this.status = MyPromise.STATE_MAPPING.PENDING;
    this.data = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    this.fn = props;
    this.doTask();
  }

  doTask = () => {
    const { resolve, reject } = this;
    try {
      this.fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  };

  resolve = (data) => {
    if (this.status === MyPromise.STATE_MAPPING.PENDING) {
      this.status = MyPromise.STATE_MAPPING.RESOLVED;
      this.data = data;
      this.resolvedCallbacks.forEach((cb) => cb(data));
    }
  };

  reject = (data) => {
    if (this.status === MyPromise.STATE_MAPPING.PENDING) {
      this.status = MyPromise.STATE_MAPPING.REJECTED;
      this.data = data;
      this.rejectedCallbacks.forEach((cb) => cb(data));
    }
  };

  handleResolve = (resolve, reject, handler) => {
    try {
      const ret = handler(this.data);
      if (ret instanceof MyPromise) {
        ret.then(resolve, reject);
      } else {
        resolve(ret);
      }
    } catch (e) {
      reject(e);
    }
  };

  handleReject = (resolve, reject, handler) => {
    try {
      const ret = handler(this.data);
      if (ret instanceof MyPromise) {
        ret.then(resolve, reject);
      } else {
        reject(ret);
      }
    } catch (e) {
      reject(e);
    }
  };

  then = (onFulfilled, onRejected) => {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (e) => {
            throw e;
          };
    const actions = {
      resolved: () =>
        new MyPromise((resolve, reject) =>
          setTimeout(() => this.handleResolve(resolve, reject, onFulfilled))
        ),
      rejected: () =>
        new MyPromise((resolve, reject) =>
          setTimeout(() => this.handleReject(resolve, reject, onRejected))
        ),
      pending: () =>
        new MyPromise((resolve, reject) => {
          this.resolvedCallbacks.push(() =>
            setTimeout(() => this.handleResolve(resolve, reject, onFulfilled))
          );
          this.rejectedCallbacks.push(() =>
            setTimeout(() => this.handleReject(resolve, reject, onRejected))
          );
        }),
      default: () => {
        throw new Error("sth may happened ~");
      },
    };
    return actions[this.status] ? actions[this.status]() : actions.default();
  };

  catch = (onRejected) => {
    return this.then(null, onRejected);
  };
}

new MyPromise((resolve, reject) => {
  reject("失败");
})
  .then()
  .then()
  .then(
    (data) => {
      logs.success("😝");
      console.log(data);
    },
    (err) => {
      logs.danger("😢", err);
    }
  );
