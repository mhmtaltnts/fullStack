const nodemailer = require('nodemailer')
 
    // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL // true for 465, false for other ports */
      //service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL, // generated ethereal user
        pass: process.env.AUTH_PSW, // generated ethereal password
      },
    });       
    
  
  module.exports = transporter