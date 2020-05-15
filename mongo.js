// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
//  manages relationships between data,
//   provides schema validation, 
//   used to translate between objects in code and the representation of those objects in MongoDB.
//    Object Mapping between Node and MongoDB managed via Mongoose 


const mongodb=require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.MongoClient
const {MongoClient , ObjectID}= require('mongodb')
const ServerUrl = 'mongodb://127.0.0.1:27017'
const DatabaseName ='Task-manager'
MongoClient.connect(ServerUrl,{ useNewUrlParser: true ,useUnifiedTopology:true},(error,client)=>{
    if (error)
      return console.log('Unable to connect')
    const db= client.db(DatabaseName)
    // db.collection('Users').insertOne({
    //   name:'Radwa',
    //   Age:22
    // },(error,result)=>{
    //   if(error)
    //    return console.log(error)
    //   console.log(result.ops)
    //   console.log(result.insertedCount)

    // })

    // db.collection('Users').insertMany([
    //   {
    //     name:'dodo',
    //     Age: 20
    //   },
    //   {
    //     name:'lola',
    //     age:23
    //   }
    // ],(err,result)=>{
    //   if(err)
    //     return console.log(err)
    //   console.log(result.ops)
    //   console.log(result.insertedCount)


    // })
    // db.collection('Tasks').insertMany([
    //   {
    //     description:'gym time',
    //     completed:'true'
    //   },
    //   {
    //     description:'meeting at 7 pm',
    //     completed:'false'
    //   },
    //   {
    //     description:'working on flutter project',
    //     completed:'false'
    //   }
    // ], (error,result)=>{
    //   if(error)
    //    return console.log(error)
    //   console.log(result.ops)
    //   console.log(result.insertedCount)
    // })
    // db.collection('Users').findOne({name:'dodo'},(error,user)=>{
    //   if(error)
    //    return console.log(error)
    //   console.log(user)
    // })
    // db.collection('Users').findOne({_id:new ObjectID("5deb915d630d58006874a880")},(error,user)=>{
    //   if(error)
    //   return console.log(error)
    //   console.log(user)
    // })
    // db.collection('Tasks').find({completed:'false'}).toArray((err,tasks)=>{
    //   console.log(tasks)
    // })
    // db.collection('Tasks').find({_id:new ObjectID("5deb92f60b708f2b94b15027")}).toArray((err,task)=>{
    //   if(err)
    //   return console.log(err)
    //   console.log(task)
    // })
    // db.collection('Users').updateOne({
    //   _id:ObjectID("5dea4a768743f62a04cdb0a8")
    // },{
    //   $set:{
    //     name:'Morgen freeman'
    //   }
    // }).then((result)=>{
    //   console.log(result)

    // }).catch((error)=>{
    //   console.log(error)
    // })
    // db.collection('Users').updateOne({
    //   _id:new ObjectID("5dea4ab5a57a162dc8c1ff3a")
    // },{
    //   $set:{
    //     name:'Gerard butler'
    //   }
    // }).then((res)=>{
    //   console.log(res.modifiedCount)
    // }).catch((err)=>{
    //   console.log(err)
    // })

    // db.collection('Users').updateOne({
    //   _id:new ObjectID("5deb901308d4490d70427f07")
    // },{
    //   $set:{
    //     name:'Mark Ruffalo'
    //   }
    // }).then((res)=>{
    //   console.log(res.modifiedCount)
    // }).catch((err)=>{
    //   console.log(err)
    // })
    /*
    UPDATE--OPERATORS
    $set:Sets the value of a field in a document.
    $inc:Increments the value or you can decrese it by provide negitive sign
    $rename:Renames a field.
    $unset:	Removes the specified field from a documen
     */
    // db.collection('Tasks').updateMany({
    //   completed:'false'
    // },{
    //   $set:{
    //     completed:'true'
    //   }

    // }).then((res)=>{
    //   console.log(res.modifiedCount)
    // }).catch((err)=>{
    //   console.log(err)
    // })
    // db.collection('Tasks').deleteOne({
      
    //   description:'gym time'
    // }).then((res)=>{
    //   console.log(res.deletedCount)
    // }).catch((err)=>{
    //   console.log(err)
    // })
    db.collection('Users').deleteMany({
      name:'lola'
    }).then((res)=>{
      console.log(res.deletedCount)
    }).catch((error)=>{
      console.log(error)
    })
    
  })