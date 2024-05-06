import User from "@/schemas/userModel.Schema";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0bfea38b62aa4e",
    pass: "6608724e7b9cf0"
  }
});
export const sendEmail = async ({ email, emailType, userId }:any) => {
  try {
    console.log(email,emailType,userId)
    const verifyToken = await bcrypt.hash(userId.toString(),10)
    if(emailType==='VERIFY'){
      await User.findByIdAndUpdate(userId,{
        verifyToken:verifyToken,
        verifyTokenExpiry :Date.now() + 3600000
      })
    }
    else if(emailType==='RESET'){
      await User.findByIdAndUpdate(userId,{
        forgotPasswordToken:verifyToken,
        forgotPasswordTokenExpiry :Date.now() + 3600000
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
