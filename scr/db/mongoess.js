// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
//  manages relationships between data, provides schema validation, 
//   used to translate between objects in code and the representation of those objects in MongoDB.
//    Object Mapping between Node and MongoDB managed via Mongoose 
const mongoose =require('mongoose')


mongoose.connect( process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex:true})








