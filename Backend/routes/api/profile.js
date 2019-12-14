const express = require('express')
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

//@route GET api/profile/me
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
});

//@route POST api/profile/
router.post('/', [
  auth, 
  check('status', 'Status is Required')
  .not()
  .isEmpty(),
  check('skills', 'Skill is required')
  .not()
  .isEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
  const { 
    company,
    website, 
    location, 
    bio, 
    status, 
    githubusername, 
    skills, 
    youtube, 
    facebook, 
    twitter, 
    instagram, 
    linkedin } = req.body;
  
    //Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    };
    
    //Build Profile Social Object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if(profile){
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id }, 
          { $set: profileFields }, 
          { new: true }
        );
        return res.json(profile)
      }
      // Create 
      profile = new Profile(profileFields);
      
      await profile.save();
      res.json(profile);
    
    } catch(err){
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

//@route GET api/profile/
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name,', 'avatar'])
    res.json(profiles);
  } catch(err) {
    console.error(err);
    res.status(500).send('Server Error')
  }
});

//@route GET api/profile/user/:user_id
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name,', 'avatar'])
    if(!profile) {
      return res.status(400).json({
        msg: 'Profile not found'
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    if(err.kind == 'ObjectId') {
      return res.status(400).json({
        msg: 'Profile not found'
      });
    }
    res.status(500).send('Server Error')
  }
});

//@route DELETE api/profile
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove user Posts

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    
    res.json({msg: 'User deleted'});
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

//@route DELETE api/profile/experience
router.put('/experience', [
  auth, 
  [
    check('title', 'Title is required').not().isEmpty(), 
    check('company', 'Company is Rquired').not().isEmpty(), 
    check('from', 'From is Required').not().isEmpty()
  ]
], 
  async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }

    const { title, company, location, from, to, current, description } = req.body

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description 
    };
    
    try {
      const profile = await Profile.findOne({user: req.user.id});
      profile.experience.unshift(newExp);
      
      await profile.save();
      res.json(profile);
    } catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }

})

module.exports = router;