const User=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const loginRouter=require('express').Router()

loginRouter.post('/',async(request,response)=>{
   const {username,password}=request.body
   
   const user= await User.findOne({username})
   if(!user) return response.status(401).json({error:'No user exists with this username'})
   const passwordCorrect= await bcrypt.compare(password,user.passwordHash)

   if(!passwordCorrect){
     return response.status(401).json({error:'invalid password'})
   }

   const userforToken={
     username:user.username,
     id:user._id
   }

   const token=jwt.sign(userforToken,process.env.SECRET,{expiresIn:7*24*60*60})
   response
   .status(200)
   .send({token:token,username:user.username,name:user.name,userId:user._id})
})

module.exports=loginRouter

