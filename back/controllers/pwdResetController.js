//const PasswordReset = require("../models/PasswordReset");
const User = require("../models/User");
const transporter = require("../middleware/transporter")
const path = require("path");

const passwordRestG = async(req, res, next)=> {    
    
  
}

const passwordRestP = async (err, req, res, next) => {
    //res.render('forgot-password')
    console.log(req?.body)
    const {email} = req?.body
    console.log(email)
    if(err){
        console.log(err)
    }
   // res.send(email, password)
    next(err)

}

module.exports = {
    passwordRestG,
    passwordRestP
}




/* const {email, redirectUrl} = req.body
  User.find({email})
       .then((data) => {
           if(data.length){
            //user exist

            //check if user is verified
            if(!data[0].verified){
                res.json({
                    status: "FAILED",
                    message : "An error occured while checking for existing user "
                })

            }else {
                sendResetEmail({...data[0]}, redirectUrl, res)
            }

           }else{
            //proceed with email to reset email
            res.json(
                {
                    status: "FAILED", 
                    message: "No account with the supplied email exists"
                })
           }

       })
       .catch(() => {

       })
}


const sendResetEmail = ({_id, email}, redirectUrl, res) => {
    const resetString = uuid + _id

    //First clear all existing reset records

    PasswordReset
        .deleteMany({userId: _id})
        .then(
            result => {
                //reset records deleted successfully
                //now we send the email
                //mail options
                const mailOptions = {
                    from: process.env.AUTH_EMAIL,
                    to: email,
                    subject: "Password Reset",
                    html: '<p>We heard that you lost the password.</p> <p>This link <b>expires in 60 minutes</b></p> <p> Press <a href=`${redirectUrl+"/"+_id+"/"+resetString }`>here</a> top proceed.</p> ' 
                }
                //hash the resetString
                const saltRounds = 10
                bcrypt
                    .hash(resetString, saltRounds)
                    .then(hashedResetString => 
                        {
                            const newPasswordReset = new PasswordReset({
                                userId: _id,
                                resetString: hashedResetString,
                                createdAt: Date.now(),
                                expiresAt: Date.now() + 360000
                            })

                            newPasswordReset
                                .save()
                                .then(() => {
                                    transporter
                                        .sendMail(mailOptions)
                                        .then(() => {
                                            res.json({
                                                status: "PENDING",
                                                message: "Password rest email sent"
                                            })
                                        })
                                        .catch((error) =>{
                                            console.error(error)
                                            res.json({
                                                status: "FAILED",
                                                message : "An error occured while the saving the password reset data"
                                            })

                                        })
                                })
                                .catch(
                                    error => {
                                        console.error(error)
                                        res.json({
                                            status: "FAILED",
                                            message : "An error occured while the saving the password reset data"
                                        })
                                    }
                                )
                        })
                    .catch(
                        error => {
                            console.log(error)
                            res.json({
                                status: "FAILED",
                                message : "An error occured while the hashing password reset data"
                            })
                        }
                    )
            }
        )
        .catch(
            error => {
                console.log(error)
                res.json({
                    status: "FAILED",
                    message : "An error occured while clearing password record"
                })
            }
        )

 */