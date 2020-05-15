const express= require('express')
const Task = require('../models/task')
const Auth = require('../middleware/Auth')
const router = new express.Router()


router.post('/tasks',Auth,async(req,res)=>{
    try{
        const task = new Task({
            ...req.body,
            owner:req.user._id
        })
        await  task.save()
        res.status(201).send(task)

    }catch(e){

    
        res.status(400).send(e)

    }
})
router.get('/tasks',Auth,async(req,res)=>{
    const match={}
    const sort={}
    if(req.query.completed){
        match.completed=req.query.completed==='true'
    }
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]= parts[1]==='des'? -1:1
    }
   
  
    try{
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }
    catch(e){
        res.status(404).send()
    }
    
})
router.get('/tasks/:id',Auth,async(req,res)=>{
    try{
        const _id= req.params.id
      const task= await Task.findOne({_id, owner: req.user._id })
      if(!task)
      {
          return res.status(404).send()
      }
      res.send(task)

    }catch(e){
        res.status(500).send(e)

    }
   
})

router.patch('/tasks/:id',Auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowed=['completed','description']
    const isValidOperation = updates.every((update)=> allowed.includes(update))
    if(!isValidOperation){
        res.status(400).send({error:'Not exisited properity'})
    }try{
        const task= await Task.findOne({_id:req.params.id,owner:req.user._id})
        if(!task){
           return res.status(404).send()
        }
        updates.forEach((update)=> task[update]=req.body[update])
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})
router.delete('/task/:id',Auth,async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }res.send(task)

    }catch(e){
res.status(500).send(e)
    }
})

module.exports=router