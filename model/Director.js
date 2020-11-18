const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const director=new Schema({
    name:{
        type:String,
        default:'OnePerson'
    }
    ,
    surname:{
        type:String,
        default:'Unknown'
    },
    bio:{
        type:String,
        default:'Lorem ipsum dolor sit amet consectetur'    }
})
module.exports=mongoose.model('director',director)

