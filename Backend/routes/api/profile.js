const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

//@route GET api/profile
router.get('/me', auth, async (req, res) => {
  try {
    // {user:req.user.id} 는 Profile model의 user field를 가르킨다
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if(!profile){
      return res.status(400).json({msg: 'There is no Profile for this User'});
    } 
    res.json(profile)
  } catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
})

module.exports = router;