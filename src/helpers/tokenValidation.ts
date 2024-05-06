import jwt from 'jsonwebtoken'
import {NextRequest} from 'next/server'


const getDataFromToken = async (request: NextRequest) =>{
    const token = request.cookies.get('token')?.value || "";
    const decodedData:any = jwt.verify(token,process.env.TOKEN_SECRET!)
    console.log(decodedData.id)
    return  decodedData.id;
}

export default getDataFromToken