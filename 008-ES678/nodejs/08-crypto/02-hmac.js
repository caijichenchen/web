const crypto = require('crypto');
const hmac = crypto.createHmac('sha512','sdccsdvscs6266');

hmac.update('123465');
console.log(hmac.digest('hex'));