let stateArray = [];
let cursor = 0;

function useState(initState) {
  const currentCursor = cursor;
  stateArray[currentCursor] = stateArray[currentCursor] || initState;

  function setState(value) {
    stateArray[currentCursor] = value;
  }

  ++cursor;

  return [stateArray[currentCursor], setState];
}
