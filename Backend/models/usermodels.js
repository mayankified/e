// require('dotenv').config();
require('dotenv').config();
const crypto = require('crypto');



const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');



const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required :[true,"please enter your name"],
        minLength:[4,"your name must be of 4 characters"]
    },
    email:{
        type: String,
        required:[true,"Please enter your mail"],
        unique: true,
        validate: [validator.isEmail,"please enter the correct mail"]
    },
    password:{
        type: String,
        required:[true,"Please enter the password"],
        minLength:[8,"The password must be of 8 characters"],
        // select:false//Eska matlab ye he ke jab hum find wale query lagayenge 
    },
    awator:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: "user"
    },

    resetpasswordToken: String,
    resetpasswordExpire: Date,
});


// Bycryptipn
// This is bascially the function that we are running to before saving the function here async function is fiired as we will fire the save event matlab before saving the values in the database the password will be bcrypted
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});


// Note:- this keyword here means ke user ke id ke baat ho rhe heee

// JWT token

process.env.JWT_SECRET = 'gfhjbsjasn';
process.env.JWT_EXPIRE = '5d';

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};


// const crypto = require('crypto');

// ... Other code ...

userSchema.methods.getResetPasswordToken = function() {
    // Use a supported hashing algorithm (e.g., 'sha256', 'sha512')
    const algorithm = 'sha256';
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hash = crypto.createHash(algorithm).update(resetToken).digest('hex');

    // Additional logic for handling the token and hash
    return hash;
};


module.exports=mongoose.model("User",userSchema);


console.log(process.env.JWT_SECRET);