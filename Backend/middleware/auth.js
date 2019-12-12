const jwt = require('jsonwebtoken');

// 유효한 토큰인지 검사
module.exports = (req, res, next) => {
  // Get Token from Header
  const token = req.header('Authorization');
  
  //Check if not token
  if(!token){
    return res.status(401).json({msg: 'No token, authrization denied'})
  };

  //Verify Token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded.user;
    next();
  } catch(err){
    res.status(401).json({msg: 'Token is not valid'});
  };
};