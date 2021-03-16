var express = require('express');
var router = express.Router();
var mongoose= require('mongoose')
var upload=require("./multer")
/* GET home page. */
mongoose.connect("mongodb://localhost:27017/todolist",{useNewUrlParser:true,useUnifiedTopology:true},function(err,result){
  if(err)
  {
    console.log(`Error is: ${err}`)

  }
  else if(result){
    console.log("Connection Successful")
    //console.log(result)
  }
})

const todoschema=new mongoose.Schema({
  title:{
    type:String,
    required: true,
  },
  des:{
    type:String,
    required: true,
  }

})

const Todo= new mongoose.model("Todo",todoschema)

router.post('/insert',upload.any(), function(req, res, next) {
  {
    console.log("//...",req.body)
    try{
      console.log(req.body.title,req.body.des)
      const info= new Todo({
        title:req.body.title,
        des:req.body.des,
      })
      const result=info.save()
      return res.status(200).json({'RESULT':true})
    }
    catch(err){
      console.log(err)
    
      return res.status(500).json({'RESULT':false})
    }
    
  }
});

router.get('/read',async function(req,res,next){
  console.log("Reached here")
  const result=await Todo.find()
  console.log(result)
  return res.status(200).json(result)
})

router.post('/delete',upload.single(),async function(req,res,next){
  
  try{
    console.log("Here is the ID on Sever",req.body)
    var id=req.body.id
    console.log("Ye rahi tumhari ID",id)
    const result=await Todo.deleteOne({"_id":id})
    console.log("Ye raha tumhara result",result)
    return res.status(200).json({'RESULT':true})
  }
  catch(err){
    console.log(err)
  
    return res.status(500).json({'RESULT':false})
  }
  
})



module.exports = router;
