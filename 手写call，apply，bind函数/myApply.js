function myApply(context) {
  if (typeof context !== "undefined" || context === null) {
    context = window;
  }
  let symbol = symbol();
  context[symbol] = this;
  let argument = [...arguments].slice(1);
  let result = context[symbol]([...argument]);
  delete context[symbol];
  return result;
}
