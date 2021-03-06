const bcrypt = require("bcryptjs"),
      jwt = require("jsonwebtoken");
      
const User = require("../models/User"),
      keys = require("../../config/keys");

const validateRegisterInput = require("../validation/register"),
      validateLoginInput = require("../validation/login");

const register = async data => {
  try {
    const { errors, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(JSON.stringify(errors));
    }
    const { name, email, password } = data;

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      throw new Error("This user already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );
    user.save();

    const token = jwt.sign({ id: user._id }, keys.secretOrKey);
     
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }

  
};

const login = async data => {
  try {
    // use our other validator we wrote to validate this data
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;
    
   const user = await User.findOne({email});
   if (!user) throw new Error("There is no account associated with this email");

   const validPassword = await bcrypt.compareSync(password, user.password);
   if (!validPassword) throw new Error("Incorrect password");

   const token = jwt.sign({id: user._id}, keys.secretOrKey);

   return { token, loggedIn: true, ...user._doc, password:null }; 
  } catch (err) {
    return err;
  }
};

const logout = async data => {
  try{

    const user = await User.findById( data._id);
    const token = ""

    // user.token = token;
    return {token, loggedIn: false, ...user._doc, password: null };

  }catch (err){
    throw err;
  }
};

const verifyUser = async data => {
  try {
    // we take in the token from our mutation
    const { token } = data;
    // we decode the token using our secret password to get the
    // user's id
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;

    // then we try to use the User with the id we just decoded
    // making sure we await the response
    const user = await User.findById(id).then(user => {
      return {loggedIn: true, name: user.name, _id: user._id}
    });

    return  user ;
  } catch (err) {
    return { loggedIn: false };
  }
};
module.exports = { register, login, logout, verifyUser};