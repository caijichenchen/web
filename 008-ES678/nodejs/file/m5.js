//定义模块
const str = 'hello';

const fn = ()=>{
	console.log('fn...');
}

const obj = {
	name:'tom',
	age:18
}

// console.log(exports);
// console.log(module.exports);
// console.log(module.exports == exports);

/*
module.exports.str = str;
module.exports.fn = fn;
module.exports.obj = obj;
*/
// console.log(exports);
/*
exports = {
	str,
	fn,
	obj
}
*/
console.log('in m5 ...');
module.exports = {
	str,
	fn,
	obj
}