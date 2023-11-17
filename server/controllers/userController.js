const jwt = require('jsonwebtoken');
const User=require('../models/userModel.js')
const axios = require('axios');
const Place=require('../models/placeModel.js');
const userMiddleware=require('../middleware/userMiddleware')
const placeMiddleware = require('../middleware/placeMiddleware');
const {OAuth2Client}=require('google-auth-library')
class userController{
    constructor(){

    }
    static async sign_in_with_oauth(req,res){
        try{
            const code=req.query.code
            const redirectUrl='http://127.0.0.1/api/user/oauth'
            const oAuth2client=new OAuth2Client(
               process.env.CLIENT_ID,
               process.env.CLIENT_SECRET,
               redirectUrl
            )
                const res=await oAuth2client.getToken(code)
                await oAuth2client.setCredentials(res.tokens)
                console.log('tokens acquired')
                const user=oAuth2client.credentials
                console.log('credentials',user)
                await userMiddleware.get_user_data(user.access_token)

        }
        catch(error){
            console.log(error)
            return res.json({success:false,message:'internal server error'})
        }
    }
    static async createLoginUrl(req,res){
        try
        {
             const redirectUrl='http://127.0.0.1/api/user/oauth'
             const oAuth2client=new OAuth2Client(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                redirectUrl
             )
             const authorizerUrl=oAuth2client.generateAuthUrl({
                access_type:'offline',
                scope:'https://www.googleapis.com/auth/userinfo.profile openid',
                prompt:'consent'
             }   )
             res.json({url:authorizerUrl})
        }
        catch(error){
            return res,json({sucess:false,message:error.message})
        }
    }
   static async review_place(req,res){
    try{
        const {token}=req
        const {review,placeId}=req.body
        let user=await User.findById(token.userId)
        if(!user)
            return res.json({success:false,message:'no user was found'})
        let place=await Place.findById(placeId)
        if(!place)
            return res.json({success:false,message:'no such place was found'})
        place=await placeMiddleware.add_review(place,review,token.userId)
        user=await userMiddleware.add_rated_place(place.id,user)
        return res.json({success:true,review})
    }
    catch(err){
        console.log(err)
        return res.json({success:false,message:'internal server error'})
    }
   }
   static async end_request(req,res){
    try{
        return res.json({success:true})
    }
    catch(err){
        console.log(err)
        return res.json({success:false,message:'internal server error'})
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