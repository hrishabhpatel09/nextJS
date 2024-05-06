import { connectDB } from "@/db/dbConnect";
import User from "@/schemas/userModel.Schema";
import {NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

connectDB()


export async function POST(request:NextRequest) {
    const reqBody =await request.json()
    const {email, password} = reqBody;
    // TODO:// verification 

    const user = await User.findOne({email:email});
    if(!user) return NextResponse.json({message:'User Not Found'})
    const hashedPass = user.password;
    const isPasswordCorrect = bcrypt.compare(password,hashedPass);

    if(!isPasswordCorrect) return NextResponse.json({msg: 'Invalid Password , Please Try Again'})
    
    const token = jwt.sign({
        id: user.id
    },process.env.TOKEN_SECRET!,{expiresIn: '1h'})

    const res = NextResponse.json({
        msg: 'Logged in Successfully',
        success: true
    })

    res.cookies.set('token',token,{httpOnly:true,secure:true})
    return res;
}