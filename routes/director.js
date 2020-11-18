const express=require('express')
const router=express.Router()
const Director=require('../model/Director')
const mongoose=require('mongoose')

// List all directors

router.get('/api/directors',(req,res)=>{
   const data=Director.find({})
    data.then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err);
    })
})


// Create a new director.

router.post('/api/directors',(req,res)=>{
    const director = new Director(req.body);
   const promise =director.save();
   promise
   .then((data)=>{
       res.json(data);
   })
   .catch((err)=>{
       console.log(err);
   })
 
    // router.get('/api/directors/:director_id',(req,res,next)=>{
    //     const promise=Director.findById(req.params.director_id)
    //     promise.then((data)=>{
    //         res.json(data)
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // })
    
    
})

router.get('/api/directors/lookup',(req,res,next)=>{
const promise=Director.aggregate([
            
    //  ikkita Schemalarni bir biriga bog'lashuchun ishlatiladi
    
    {
        $lookup:{
            from:'movies',
            localField:'_id',
            foreignField:'director_id',
            as:'Kinolar'
        }
    },
    {
        $group:{
            _id:{
                _id:'$_id',
                 name:'$name',
                surname:'$surname',
            bio:'$bio'
            },
        
            Kinolari:{
                $push:'$Kinolar'
            }
            
        }
    },
    {
        $project:{
            _id:'$_id._id',
                 name:'$_id.name',
                surname:'$_id.surname',
                Kinolar:'$_id.Kinolar'
            
        }
    }
])
.then((data)=>{
    res.json(data)
})
.catch((err)=>{
    console.log(err);
})
})
  
router.get('/api/directors/:director_id',(req,res,next)=>{
    const promise=Director.aggregate([
    {
        $lookup:{
            from:'movies',
            localField:'_id',
            foreignField:'director_id',
            as:'Filmlari'
        }

    },
    {
        $match:{
            _id:mongoose.Types.ObjectId(req.params.director_id)
        }
    }
    ])
    promise
    .then((data)=>{res.json(data)})
    .catch((err)=>{console.log(err)})
})
router.put('/api/directors/:director_id',(req,res,next)=>{
    const promise=Director.findByIdAndUpdate(req.params.director_id,req.body);
    promise.then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err);
    })

})
module.exports=router;

