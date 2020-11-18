const mongoose=require('mongoose');
const Schema=mongoose.Schema

const user=new Schema({

    username:{
        type:String,
        default:'Somebody',
        minlength:3,
        unique:true
    
    },
    password:{
        type:String,
        default:'password',
        unique:true,
        minlength:5
    }

})

module.exports=mongoose.model('user',user);