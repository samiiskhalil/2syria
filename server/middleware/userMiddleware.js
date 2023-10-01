
const User=require('../models/userModel.js')
class userMiddleware{
    constructor(){

    }
    static async findUser(req,res,next){
        try{
            req.scope={}
            let user
            if(req.query.userName)
                user=await User.findOne({userName:req.query.userName})
            if(req.params.userId)    
            user=await User.findById(req.params.userId)
                if(!user)
                return res.status(400).json({error:'user was not found',success:false})
                req.scope.user=user
                return next()
            }
        catch(err){
            console.error(err)
            return res.status(500).json({error:'internal server error',success:false})
        }
    }
    static async createAccount(req, res,next) {
        try {
          const { userName, password ,email} = req.body;
      
          // Check if the userName and password are provided
          if (!userName || !password) {
            return res.status(400).json({ error: 'userName and password are required',success:false });
          }
      
      
          // Create a new user account
          const newUser = new User({ userName, password,email });
      
          // Save the user account to the database
          await newUser.save();
          req.scope.user=newUser
          // Return a success response
          return next()
        } catch (err) {
          // Handle any errors that occur during account creation
          console.error(err);
          return res.status(500).json({ error: 'Failed to create account' });
        }
      }

}
module.exports=userMiddleware