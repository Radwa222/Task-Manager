const express = require('express')
const User = require('../models/user')
const Auth=require('../middleware/Auth')
const multer = require('multer')
const {SendWelcomMessage,CancelationMail}=require('../emails/account')

const router = new express.Router()
const upload=multer({
    
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
           return cb(new Error('this extension is not supported'))
        }
        cb(undefined,true)

    }
})

router.post('/users',async (req,res)=>{
    const user = new User(req.body)

    try{
          await user.save()
        const token=await user.GenerateAuthToken()

        SendWelcomMessage(user.Email, user.name)

        res.status(201).send({user,token})
    
    }catch(e){
            res.status(400).send(e)
           
        }
        
    })
    router.post('/users/login', async (req,res)=>{
        try{

        const user =await User.FindByCredentials(req.body.email,req.body.pass)
        const token = await user.GenerateAuthToken()
        res.send({user,token})
        }catch(e){
            res.status(400).send(e)

        }   
        

    })
    
    router.get('/users/me',Auth,async(req,res)=>{
       res.send(req.user)
    })
    router.post('/user/logout',Auth,async(req,res)=>{
        try{
            req.user.Tokens=req.user.Tokens.filter((t)=>{
               return t.token!==req.token
            })
            await req.user.save()
            res.send('logged out')


        }catch(e){
            res.status(500).send(e)

        }
    })

    router.post('/user/logoutAll',Auth,async(req,res)=>{
        try{
            req.user.Tokens=[]
            await req.user.save()
            res.status(200).send('logged out from all devices')

        }catch(e){
            res.status(500).send(e)

        }
    })

    
router.patch('/user/me',Auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowed=['name','age','Password']
    const isValidOperation = updates.every((update)=> allowed.includes(update))
    if(!isValidOperation){
        res.status(400).send({error:'Not exisited properity'})
    }try{
        updates.forEach((update)=> req.user[update]=req.body[update])
         await req.user.save()
         res.send(req.user)

    }catch(e){
        res.status(400).send(e)

    }
})
router.delete('/user/me',Auth,async(req,res)=>{
    try{
       await req.user.remove()
      CancelationMail(req.user.Email,req.user.name)
       res.send(req.user)

    }catch(e){
        res.status(500).send(e)

    }
})
router.post('/users/me/pic',Auth, upload.single('upload'),async(req,res)=>{
    req.user.pic=req.file.buffer
    await req.user.save()
    res.send('image uploaded')
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
router.delete('/users/me/pic',Auth,async (req,res)=>{
    
    if(!req.user.pic){
      return  res.send(404).send()
    }
    req.user.pic=undefined
    req.user.save()
    res.send('image removed')
    

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
//fetch pic on web 
router.get('/users/:id/pic',async (req,res)=>{
    try{
    const user= await User.findById(req.params.id)
    if(!user || !user.pic){
        throw new Error()
    }
    res.set('Content-Type','image/jpg')
    res.send(user.pic)}
    catch(e){
        res.status(404).send()
    }
})


module.exports=router
