## never

永远到不了的地方就是never

```ts
function throwError(): never {
    throw Error()
}
```

如果if/else条件都走完了，没有遗漏的，后面的类型就是never （完整性保护）

[never类型的完整性检测用法](https://cloud.tencent.com/developer/article/1605806?areaSource=102001.5&traceId=-48lsKnMTKzscdOn1bP8S)

## any

any相当于没有使用ts。能不用any就不用any

## object引用类型

```ts
function create(val:object){
    
}

create({})
```

## symbol

## bigInt

## 类型断言

声明类型的时候，如果没有标识类型，他是什么类型？

```ts
// 没有赋值的变量默认值是undefined，但是类型是any

// const是常量，意味着定义的值不会修改，所以他是一个字面量类型。const声明常量必须赋值
// let声明变量，可以修改

const a: 1 = 1
const str: 'abc' = 'abc'


//断言

let strOrNum: string | number //如果是联合类型，在使用的时候，只能用公共的方法

const val = ref<null|HTMLElement>()
onMounted(()=>{
    (ref as HTMLElement).appendChild('123')
})
```
