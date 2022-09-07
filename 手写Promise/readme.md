# Promise A+

## 规范

### Promise States

三种状态
- pending状态
 - 初始状态，可改变。
 - 一个promise在被resolve或者reject之前，都处于这个状态
 - 通过 resolve（动作） -> fulfilled状态（结果）
 - 通过 reject（动作） -> rejected状态（结果）
- fulfilled状态
 - 最终态，不可改变
 - 一个promise经过resolve后变成这个状态
 - 必须拥有一个value值
- rejected状态
 - 最终态，不可改变
 - 一个promise经过reject后变成这个状态
 - 必须拥有一个reason值