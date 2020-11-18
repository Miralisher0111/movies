const mongoose=require('mongoose')
const express=require('express');
const router=express.Router();
const moviesSchema=require('../model/Movies');


//  Method GET with List all movies.

router.get('/api/movies',(req,res,next)=>{
   const data=moviesSchema.find({});
   data.then((data)=>{
       res.json(data)
   })
   .catch((err)=>{
       console.log(err);
   })
   
})
//  Method POST with Create a new movie.
router.post('/api/movies',(req,res)=>{
    const movies=new moviesSchema(req.body);
    const promise=movies.save();
    promise.then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err);
        
    })
})
// Method GET with Get a movie.

router.get('/api/movies/:movie_id',(req,res,next)=>{
    const promise=moviesSchema.findById(req.params.movie_id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err);
        
    })

})

router.put('/api/movies/:movie_id',(req,res)=>{
moviesSchema.findByIdAndUpdate(req.params.movie_id,req.body)
.then((data)=>{
    res.json(data)
})
.catch((err)=>{console.log(err);
})
})

router.delete('/api/movies/:movie_id',(req,res)=>{
    moviesSchema.findByIdAndRemove(req.params.movie_id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        
    })
})
router.get('/api/movies/top/top10',(req,res,next)=>{
    const movies=moviesSchema.find({})
    .limit(10)
    .sort({
        imdb_score:-1
    })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err);
        
    })
})
//  Movies between two dates

router.get('/api/movies/between/:start_year/:end_year',(req,res)=>{
    const{start_year,end_year}=req.params
    const promise=moviesSchema.find({
        year:{
            
        '$gte':start_year,'$lte':end_year
        }
    })
    .sort({year:-1})
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err);
        
    })
})

router.put('/api/movies/',(req,res,next)=>{
  const promise=moviesSchema.updateOne({},req.body)
  .then((data)=>{
      res.json(data)
  })
  .catch((err)=>{
      console.log(err);
  })
})
module.exports=router;