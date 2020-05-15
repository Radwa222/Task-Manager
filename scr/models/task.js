const mongooes = require('mongoose')
const validator = require('validator')

const Taskschema = new mongooes.Schema({
    description:{
        type:String,
        require:true,
        trim:true

    },
    completed:{
        type:Boolean,
        default:false

    },
    owner:{
        type:mongooes.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

},{
    timestamps:true
}
)
const Task = mongooes.model('Task',Taskschema)

module.exports= Task