const express = require('express');
const request = require('request');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router();

//@route GET api/profile/me
router.get('/me', auth, async (req, res) => {
  try {
    // {user:req.user.id} 는 Profile model의 user field를 가르킨다
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name, avatar']);
    if(!profile){
      return res.status(400).json({msg: 'There is no Profile for this User'});
    } 
    res.json(profile)
  } catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/profile
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
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles);
  } catch(err) {
    console.error(err);
    res.status(500).send('Server Error')
  }
});

//@route GET api/profile/user/:user_id
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])
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
    // Remove posts
    await Post.deleteMany({ user: req.user.id }); 
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

//@route PUT api/profile/experience
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
});

//@route DELETE api/profile/experience/:exp_id
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get Remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);

  } catch(err){
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route PUT api/profile/education
//@Private
router.put('/education', [
  auth, 
  [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(500).json({ errors: errors.array()});
  }

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);

    await profile.save();
    res.json(profile);
  } catch(err){
    console.error(err.message);
    res.status(500).send('Sever Error');
  }
});


//@route DELETE api/profile/education/:edu_id
//@Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    // Get Remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sever Error');
  };
});

//@route GET api/profile/github/:username
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
      sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
      method: "GET",
      headers: { 'user-agent': 'node.js'  }
    };
    request(options, (error, response, body) => {
      if(error) console.error(error);
      
      if(response.statusCode !== 200) {
        res.status(404).json({ msg: 'No Github Profile' });
      }
      res.json(JSON.parse(body ));
    });
  
  } catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;