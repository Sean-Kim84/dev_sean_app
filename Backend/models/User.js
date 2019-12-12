const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid')
      }
    }

  },
  password: {
    type:String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value){
      if(value.toLowerCase().includes('password')){
        throw new Error('Password can not include "password" ')
      }
    } 
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


// Using the login
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email
  })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }
  return user
}

// Generate the token
// UserSchema.methods.generateAuthToken = async () => {
//   const user = this; // UserSchema refer
//   const token = jwt.sign({
//     _id: user._id.toString()
//   }, process.env.JWT_SECRET);

//   user.tokens = user.tokens.concat({
//     token
//   })
//   await user.save();

//   return token;
// };

// Before save, Hash the passowrd
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next();
}); 

// const User = mongoose.model('User', UserSchema);
// module.exports = User;
module.exports = User = mongoose.model('User', UserSchema); // modelName "User"는 ref로 사용된다