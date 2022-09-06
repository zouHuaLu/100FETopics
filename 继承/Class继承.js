// class Parent{
// 	constructor(value){
// 		this.value = value
// 	}
	
// 	getValue(){
// 		console.log(this.value);
// 	}
// }

function Parent(value){
	this.value = value
}

Parent.prototype.getValue = function(){
	console.log(this.value);
}

class Child extends Parent{
	constructor(value){
		super(value)
	}
}

const child = new Child(3)
console.log(child);
child.getValue()