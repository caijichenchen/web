/*
const t1 = setTimeout(()=>{
	console.log("hello");
},100)

// console.log(t1);
clearTimeout(t1);
console.log("after t1..");



// console.log(t1);
clearInterval(t1);
console.log("after t1..");

const t1 = setTimeout(()=>{
	console.log("hello");
},100)
s
*/
process.nextTick(()=>{
	console.log("llll");
})
const t2 = setImmediate(()=>{
	console.log("hihi");
},0)

// console.log(t1);
// clearTimeout(t1);
// clearImmediate(t2);
// console.log("after t1..");

// const t1 = setInterval(()=>{
// 	console.log("ha");
// },0)