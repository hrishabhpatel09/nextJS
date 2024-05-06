import { connectDB } from "@/db/dbConnect";
import User from "@/schemas/userModel.Schema";
import {NextRequest,NextResponse} from 'next/server'


connectDB()

export async function GET(request: NextRequest) {
    try {
        const req =await request.json()
        const {token} = req;
        console.log(token)
            if(!token) return NextResponse.json({message:"Token Not Found"})
            console.log(token)

            const user  = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt:Date.now()}})
            if(!user) return NextResponse.json({message: 'Invalid Token'},{status: 400})
            
            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;

            await user.save()

            return NextResponse.json({
                message: 'emailverified Successfully'
            },{status: 200})
    } catch (error) {
        return NextResponse.json({
            message: 'Failed'
        })
    }
}
