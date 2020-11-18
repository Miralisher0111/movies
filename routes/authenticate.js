
const express=require('express');
const USerSechma=require('../model/Users')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const router=express.Router();


router.get('/',(req,res,next)=>{
    res.send('Hello i\'m authenticate page')
})

router.post('/',(req,res,next)=>{
    const {username,password}=req.body;
    const promise=USerSechma.findOne({username});
    promise.then((user)=>{
        if(!user){
            res.json(
                {
                    status:"bunday foydalanuvchi yo'q",
                    message:"Iltimos ro'yxatdan o'ting"
                }
            )
        }
        else{
             
           const promise=bcrypt.compare(password,user.password);
           promise.then((result)=>{
               if(!result){
                   res.json({
                       status:"parol xato",
                       message:"iltimos qaytadan urunib ko'ring"
                   })
               }
                else{
                    const payload={username};
                    const token=jwt.sign(payload,req.app.get("api_secret_key"),
                    {
                     expiresIn:720  
                    })
                    res.json({
                        status:true,
                        token
                    })
                }

           });
           promise.catch((err)=>{console.log("xatolik bor");})
           
            

        }
    })
    promise.catch((err)=>{throw err})
   
    
})


module.exports=router;                      