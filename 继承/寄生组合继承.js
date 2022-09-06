function Parent(value){
	this.value = value
}

Parent.prototype.getValue = function(){
	console.log(this.value);
}

function Child(value){
	Parent.call(this,value)
}

Child.prototype = Object.create(Parent.prototype,{
	constructor:{
		value:Child,
		
	}
})

const child = new Child(2)
console.log(child);
child.getValue()



