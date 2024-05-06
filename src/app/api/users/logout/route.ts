import { connectDB } from "@/db/dbConnect";
import {NextRequest,NextResponse} from 'next/server'

connectDB()

export async function GET(request:NextRequest) {
    try {
        const res = NextResponse.json({
            message: 'Logged Out Successfuly',
            success : true
        })
        res.cookies.delete('token')
        return res;
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        })
    }
}