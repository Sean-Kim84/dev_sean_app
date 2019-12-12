const express = require('express');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

//@route GET api/auth
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user);
  } catch(err){

  }
});

//@route Post api/auth
router.post('/signup', async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    const user = new User({
      name,
      email,
      password,
      avatar
    });
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };
    
    try {
      jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 36000
      }, (err, token) => {
        if (err) throw err;
        res.json({
          token
        })
      });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error')
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByCredentials(email, password);
  
  const payload = {
    user: {
      id: user.id
    }
  };

  try {
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 36000
    }, (err, token) => {
      if (err) throw err;
      res.json({
        token
      })
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error')
  }
})

module.exports = router;