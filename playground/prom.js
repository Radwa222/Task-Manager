const mongoose =require('../scr/db/mongoess')
const Task = require('../scr/models/task')
// Task.findOneAndDelete('5e2adb702730072320920e03').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:'false'})
// }).then((countt)=>{
//     console.log(countt)
// }).catch((e)=>{
//     console.log(e)
// })

const DeleteTaskAndCount = async (id)=>{
    const task = await Task.findOneAndDelete({id})
    const count= await Task.countDocuments({completed:'false'})
    return task
}
DeleteTaskAndCount('5e2adb702730072320920e03').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})