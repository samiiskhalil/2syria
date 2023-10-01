const jwt = require('jsonwebtoken');
class userController{
    constructor(){

    }
    static async validateToken(req,res){
        try{
            await jwt.verify(req.headers['token'],process.env.JWT_SECRET)
            res.json({success:true})
        }
        catch(error){
            console.log(error)
            res.status(500).json({success:false,error:'failed to validate token'})
        }
    }
    static async sendAccount(req,res){
try{
const {token,user}=req.scope
console.log(user)
return res.json({token,user:{userName:user.userName,email:user.email,password:user.password},success:true})
}
catch(err){
return res.json({error:'could not send the account',success:false})
}
    }
}
module.exports=userController