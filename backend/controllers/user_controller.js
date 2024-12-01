const bcrypt = require('bcrypt');
const User = require('../schemas/user_schema');


const hashed = async (data) => {
const saltrounds = 10;
const hashedData = await bcrypt.hash(data, saltrounds)
return hashedData
}

const registerUser = async (req, res) => {
  const { username, password, email } = req.body; 
  const hashedPassword = await hashed(password)

  try {
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    res.status(201).json({user: savedUser});
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: 'Username already used'})
    } else {
    res.status(400).json({ message: err.message })
    }
  }
};


const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try { const user = await User.findOne({email});
  if (!user) {
    return res.status(400).json({message: 'User is not found'})
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({message:'Wrong password'})
  }
  
  res.status(201).json({message: 'Login successful'})
  } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })  }
}


const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(201).json(allUsers)
    }
    catch (err) {
        res.status(500).json({ message: 'Internal Server Error' })    }
}



module.exports = { 
  registerUser, 
  loginUser, 
  getAllUsers 
};