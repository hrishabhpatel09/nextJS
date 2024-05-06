import User from "@/schemas/userModel.Schema";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt'

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.TRANSPORTER_USER,
    pass: process.env.TRANSPORTER_PASS
  }
});
export const sendEmail = async ({ email, emailType, userId }:any) => {
  try {
    console.log(email,emailType,userId)
    const verifyToken = await bcrypt.hash(userId.toString(),10)
    if(emailType==='VERIFY'){
      await User.findByIdAndUpdate(userId,{
        $set:{
          verifyToken:verifyToken,
          verifyTokenExpiry :Date.now() + 3600000
        }
      })
    }
    else if(emailType==='RESET'){
      await User.findByIdAndUpdate(userId,{
        $set:{
          forgotPasswordToken:verifyToken,
          forgotPasswordTokenExpiry :Date.now() + 3600000
        }
      })
    }
    const mailOptions = {
      from: 'hrishabhpatel2023.ai',
      to: email,
      subject: emailType==='VERIFY'?'Verify Your Email':'Reset Your Password',
      html: `<a href="http://localhost:3000/api/users/verifyemail?token=${verifyToken}">Click Here</a> to ${emailType=='VERIFY'?'verify your email':'reset your password'}`,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
  } catch (error:any) {
    throw new Error(error.message)
  }
};
