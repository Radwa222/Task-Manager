// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
//  manages relationships between data, provides schema validation, 
//   used to translate between objects in code and the representation of those objects in MongoDB.
//    Object Mapping between Node and MongoDB managed via Mongoose 
const mongoose =require('mongoose')
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const Task=require('../models/task')

/*
Schemas:
 1- define the structure of your document and casting of properties
 2- define document instance methods(accssed by instances >>{deal with one not the whole}),
 3- define static Model methods(accessed by model>>  {deal with whole not one} )
 4- compound indexes
 5- document lifecycle hooks called middleware.
*/
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            
    
        },
        age:{
            type:Number,
            default:0,
            validate(value){
    
                if(value<0){
                    throw new Error('Age must be a Positive Number !')
                }
            }
    
        },
        pic:{
            type:Buffer

        }
       , Email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            validate(value){
                if (!validator.isEmail(value)){
                throw new Error(' Not a Valid Email')}
            }
        },
        Password:{
            type:String,
            required:true,
            trim:true,
            minlength:6,
            validate(value){
                if(validator.contains(value.toLowerCase(),'password')){
                    throw new Error('wrong password as should not contain password string')
                }
            }
    
        },
        Tokens:[{
            token:{
                type:String,
                required:true
            }
        }]
    },{
        timestamps:true
    }
)

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

//delete objectsfrom response body (password,tokens,pic)
userSchema.methods.toJSON= function(){
    const user = this   
    const userObject = user.toObject()
    delete userObject.Password
    delete userObject.Tokens
    delete userObject.pic
    return userObject
}
userSchema.methods.GenerateAuthToken = async function(){
    const user=this
    const token = await jwt.sign({_id:user._id.toString()},process.env.JWT_SEC)
    user.Tokens= user.Tokens.concat({token})
    await user.save()
    return token

}
userSchema.statics.FindByCredentials= async (Email,Password)=>{
    
   const user= await User.findOne({Email})
    if(!user){
        throw new Error({error:'unable to login'})
    }
    const isMatch = await bcrypt.compare(Password,user.Password)
    if(!isMatch){
        throw new Error({error:'unable to login'})
    }
    return user
}


 userSchema.pre('save',async function(next){
     const user = this
     const pass = user.Password
    if(user.isModified(' Password')){
        user.Password= await bcrypt.hash(user.Password,8)

    }  
     next()
 })

 userSchema.pre('remove',async function(next){
     const user = this
     await Task.deleteMany({owner:user._id})
     next()
 })


 

// creating seperate schema and seperate model and use middleware by passing schema into model
const User=mongoose.model('User',userSchema);
module.exports=User