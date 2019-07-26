const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const dataPath =  path.normalize(__dirname + "/../static/data/item.json");

async function get(){
	const data = await readFile(dataPath);
	const arr = JSON.parse(data);
	return arr
}

module.exports = {
	get
}