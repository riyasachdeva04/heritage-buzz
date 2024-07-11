const User = require('../models/user.js');

const login = async (req, res) => {
  const admin = require("../config/firebase.js"); 
  
  const { name } = req.body;

  if(!req.headers['authorization']) return res.status(400).json({reason: 'No authorization header'});

  const token = req.headers['authorization']?.split('Bearer ')[1];
  let decodedToken = null;
  try {
    decodedToken = await admin.auth().verifyIdToken(token);
  } catch (error) {
    return res.status(401).json({reason: 'Invalid token'});
  }

  const uid = decodedToken.uid;


  try {
    const user = await User.create({uid: uid, name: name});
  } catch (e) {
    if (e instanceof Sequelize.UniqueConstraintError) {
      return res.status(200).send('Logged in');
    } else {
      return res.status(500).json({reason: 'User creation on database failed'});
    }
  }

  res.status(200).send('Logged in');
}

module.exports = { login };