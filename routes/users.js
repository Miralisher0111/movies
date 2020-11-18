const express=require('express')
const router=express.Router();
const bcrypt=require('bcryptjs');
const UserSchema=require('../model/Users')

router.post('/',(req,res,next)=>{
  const{username,password}=req.body;
bcrypt.hash(password,5,(err,hash)=>{
  if(err)console.log(err);
  const data=new UserSchema({
    username,
    password:hash
  })
  const promise=data.save();
  promise.then((dat)=>res.json(data))
  promise.catch(err=>console.log(err))
})

})

router.get('/',(req,res,next)=>{
  const promise=UserSchema.find({});

  promise.then((data)=>{
    res.json(data)
  })
  .catch(err=>{
    console.log(err);
  })

})

module.exports=router

