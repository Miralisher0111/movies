const mongoose=require('mongoose');

module.exports=()=>{
mongoose.connect('mongodb+srv://apiMovies:123qwe123@movies.raylm.mongodb.net/test',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db=mongoose.connection
db.on('error',(err)=>{console.log(err);})
db.on('open',()=>{console.log('Mongodb global connected');})

}