const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const login = async (req, res) => {
  const {email, password} = req.body
  
  if(!email || !password){
    return res.status(400).json({message: 'Every field must be provided'})
  }
  const user = await User.findOne({email: email})
  if(!user){
    return res.status(400).json({message: `User with email ${email} is not exist`})
  }
  if(user.password !== password){
    return res.status(400).json({message: 'Password is incorrect'})
  }

  user.password = undefined

  const accessToken = jwt.sign(
    {user},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '1d'}
  )
  return res.status(200).json({user: accessToken})
};

const register = async (req, res) => {
  const {email, name, password, confirmPassword, role} = req.body;
  console.log(role)

  if(!email || !name || !password || !confirmPassword || !role){
    return res.status(400).json({message: 'Every field must be provided'})
  }
  
  const isExist = await User.exists({email: email})
  if(isExist){
    return res.status(400).json({message: `User with email ${email} already exists`})
  }

  if(role.toLowerCase() !== 'worker' && role.toLowerCase() !== 'requester'){
    return res.status(400).json({message: 'Role is invalid'})
  }

  const newUser = await User.create({
    ...req.body,
    role: role.toLowerCase(),
    credibility: 100,
    wallet: 0,
    tasks: []
  })

  const accessToken = jwt.sign(
    {user: {...newUser, password: undefined}},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '1d'}
  )
  return res.status(201).json({ user: accessToken });
};

module.exports = {
  login,
  register,
};
