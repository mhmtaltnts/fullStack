const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../middleware/transporter")

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  const { email, password } = req.body;
  

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        id : foundUser._id,
        email: foundUser.email,
        roles: foundUser.roles,
        
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email},
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.json({ accessToken });
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        email: decoded.email,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};
// @desc Register
// @route POST /auth/register
// @access Public - just to clear cookie if exists
const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  // Confirm data
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { email, password: hashedPwd };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${email} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(req.body)
  // Confirm data
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Check for email
  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized or email not found" });
  }
  console.log(foundUser.email)
  console.log(foundUser._id)

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        roles: foundUser.roles,        
      },
    },
    (process.env.RESET_PASSWORD_SECRET),
    { expiresIn: "1m" }
  );
  const link = `http://localhost:3000/reset_password/:${foundUser._id}/:${accessToken}`
  let mailOptions = {
    from: process.env.AUTH_EMAIL, // sender address
    to: foundUser.email, // list of receivers
    subject: "Password Reset", // Subject line
    html: `<h2>Your Reset Link</h2><br><p>Be careful that it is going to expire in 60minutes</p> <a href="${link} ">here</a>`, // plain text body
    
     } 
  
     transporter
     .sendMail(mailOptions)
     .then(() => {
       res.json({"status": "SUCCESS", "message": "messages sent successfully"})
     })
     .catch((error) => {
       console.error(error)
        res.json({"status": "FAILED", "message": "an error occured"})
     }) 
  
  
};
const resetPassword = async (req, res) => {
const {id, token} =req.params
  const { email, password } = req.body;
  console.log(req.body)
  // Confirm data
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check for email
  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized or email not found" });
  }
  console.log(foundUser.email)
  console.log(foundUser._id)



  const match = jwt.verify(process.env.RESET_PASSWORD_SECRET, token)

  if(!match){
    return res.status(403).json({message: "Forbidden"})
  }

  
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  foundUser.password = hashedPwd
  const updatedUser = await foundUser.save() 

  if (updatedUser) {
    //created
    res.status(201).json({ message: `New password created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
      
} 

module.exports = {
  login,
  refresh,
  logout,
  register,
  forgotPassword,
  resetPassword,
};
