const transporter = require('../middleware/transporter')

const mail = (req, res) => {
  const {to, subject, message} = req.body
  if (!to || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }
   
  
  let mailOptions = {
      from: process.env.AUTH_EMAIL, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      
  }

    // send mail with defined transport object
    transporter
          .sendMail(mailOptions)
          .then(() => {
            res.json({"status": "SUCCESS", "message": "messages sent successfully"})
          })
          .catch((error) => {
            console.error(error)
             res.json({"status": "FAILED", "message": "an error occured"})
          })
  }
  
  module.exports = {mail}