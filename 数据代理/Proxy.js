function onProxy(obj){
	return new Proxy(obj,{
		get(target,property){
			console.log(`正在读取${property}属性值:${target[property]}`);
			return target[property]
		},
		set(target,property,value){
			console.log(`正在设置${property}属性值:${value}`);
			return target[property]=value
		}
	})
}

let person = {
	name:'hj'
}

let p = onProxy(person)

p.name
p.name = 'hualu'
p.name