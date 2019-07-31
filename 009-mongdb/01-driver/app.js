const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri,{useNewUrlParser:true});
const dbName = 'it';
client.connect(err=>{
	if(err){
		console.log("err");
		throw err
	}
	console.log("db success..");
	//生成db 
	const db = client.db(dbName);
	const collection = db.collection("user");
	/*
	collection.insertMany([{name:"tom",score:100},{name:"leo",score:88}],(err,result)=>{
		if(err){
			console.log(err);
		}else{
			console.log(result);
		}
		client.close();
	})
	
	//2.查询
	collection.find({}).toArray((err,docs)=>{
		if(err){
			console.log("find err",err);
		}else{
			console.log("find docs",docs);
		}
		client.close();
	})
	*/
	//3.更新
	collection.updateOne({name:"tom"},{score:{$set}})
})