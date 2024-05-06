import { connectDB } from "@/db/dbConnect";
import User from "@/schemas/userModel.Schema";
import {NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getDataFromToken from "@/helpers/tokenValidation";

export async function GET(request:NextRequest) {
    const id = await getDataFromToken(request);

    const user = await User.findOne({_id:id});
    return NextResponse.json({
        success: true,
        username: user.username,
        email: user.email,
    })
}

