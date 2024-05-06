import { connectDB } from "@/db/dbConnect";
import User from "@/schemas/userModel.Schema";
import {NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcrypt'
import { sendEmail } from "@/helpers/mailer";

connectDB()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {username,email,password}= reqBody
        // TODO: //Validation
        console.log(email)
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({
                message:'User Already Registered'
            },{status: 400})
        }
        console.log(typeof password)
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()

        //send verification mail
        await sendEmail({email,emailType:'VERIFY',userId: savedUser._id})
        console.log("mail send Successfully")
        return NextResponse.json({
            message: 'User registered Succesfully',
            success: true,
            savedUser
        })
    } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            status:500
        })
    }
}