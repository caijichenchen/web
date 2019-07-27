const crypto = require('crypto');
//md5加密算法不可逆转
const hash = crypto.createHash('md5');
//添加需要密码的明文
hash.update('password');
//输出密文
console.log(hash.digest('hex'));