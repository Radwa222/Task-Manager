require('./db/mongoess')
const User = require('./models/user')
const Task = require('./models/task')
const express = require('express')
const app = express()
const userRoutes = require('../scr/routes/user')
const taskRoutes = require('../scr/routes/task')
const port= process.env.PORT


// middleware function that allows express to handle any coming json data from client and convert it to object
app.use(express.json())

app.use(userRoutes)
app.use(taskRoutes)

app.listen(port,()=>{
    console.log('Application is listening on port '+ port)
})

/* 
there is a difference between hashing and encryption algo. 
with Hashing    ---- you cannot get orignal value back (one way algo)
with encrypting ---- you can get orignal value back

*/
/* methods of bcrypt package returns promises */

// const bcrypt = require('bcrypt')
// const hashingFunction = async ()=>{
//     pass ='radwha47484774'
//     const hashed = await bcrypt.hash(pass,8)
//     console.log(pass)
//     console.log(hashed)

//     const isMatch = await bcrypt.compare('jjjj',hashed)
//     console.log(isMatch)
// }

// hashingFunction()

// const jwt = require('jsonwebtoken')
// const fun = async()=>{
//     const token = await jwt.sign({_id:'radwa47'},'mysec')
//     console.log(token)
//    const data= await jwt.verify(token,'mysec')
//    console.log(data)

// }
// fun()

// const fun = async()=>{
//     const task = await Task.findById('5e341485f320542ee0ee7568')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)


// }
// fun()


// const fun = async()=>{
//     const user = await User.findById('5e34135ff320542ee0ee7565')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// fun()