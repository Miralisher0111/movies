const mongoose=require('mongoose')
const Schema=mongoose.Schema

const movies=new Schema({
title:{
    type:String,
    
},
category:{
    type:String
},
country:{
    type:String
},
year:{
    type:Number
},
director_id:Schema.Types.ObjectId,
imdb_score:{
    type:Number
},
createAt:{
    type:Date,
    default:Date.now
}
})
module.exports=mongoose.model('movie',movies);