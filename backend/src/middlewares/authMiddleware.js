import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try{
        const cookies = req.cookies;
        const token = cookies['jwt'];
        if(!token){
            return res.status(403).json({message:"Token is Invalid"});
        }
        try{
            const decode = jwt.decode(token);
            req.user = decode;
            console.log("Printing the value of Decode-> ", decode);
        }
        catch(error){
            console.error("Error in verifying the token in authMiddleware:", error.message);
            return res.status(403).json({message:"Token is Invalid"});
        }
        next();
    } catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
}
