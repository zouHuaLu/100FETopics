function throwError(): never {
    throw Error()
}


function toArray(val: number | string | boolean) {
    if (typeof val === 'number') {
        return val.toString().split('').map(Number)
    }
    if (typeof val === 'string') {
        return val.split('')
    }
    if (typeof val === 'boolean') {
        return val.toString().split('')
    }
    const n:never = val
}
