const buf1 = Buffer.from('z');
console.log(buf1);
//一个英文字母对应两个16进制数
const buf2 = Buffer.from('好');
console.log(buf2);
const buf3 = Buffer.alloc(10);
console.log(buf3);
buf3[0]=11;
console.log(buf3);
buf3[1]=0xab;
console.log(buf3);
buf3[9]=0xfa;
console.log(buf3);
buf3[10]=12;
console.log(buf3);
const buf4 = Buffer.alloc(3);
buf4[0] = 0xda;
buf4[1] = 0xaf;
buf4[1] = 0xfa;
console.log(buf4.toString());