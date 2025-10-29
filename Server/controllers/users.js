const usersRouter=require('express').Router()
const User=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

usersRouter.post('/',async(request,response)=>{
    const {username,name,password}=request.body
    const saltrounds=10
    const passwordHash=await bcrypt.hash(password,saltrounds)

     const newUser= new User({
         username,
         name,
         passwordHash
     })
   
   const savedUser = await newUser.save()
   const userforToken={
        username:savedUser.username,
        id:savedUser._id
      }
   
      const token=jwt.sign(userforToken,process.env.SECRET,{expiresIn:7*24*60*60})
      response
      .status(200)
      .send({token:token,username:savedUser.username,name:savedUser.name,userId:savedUser._id})
    
})

usersRouter.get('/',async(request,response)=>{
    const users= await User
    .find({}).populate('note',{content:1,important:1})
    response.json(users)
})

module.exports=usersRouter
