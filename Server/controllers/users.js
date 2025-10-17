const usersRouter=require('express').Router()
const User=require('../model/user')
const bcrypt=require('bcrypt')

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
   console.log('User Saved')
   response.status(201).json(savedUser)
    
})

usersRouter.get('/',async(request,response)=>{
    const users= await User
    .find({}).populate('note',{content:1,important:1})
    response.json(users)
})

module.exports=usersRouter