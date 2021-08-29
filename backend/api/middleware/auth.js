import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,secret);
        req.userId = decoded?.id;
        next();
    } catch(err) {
        console.log(err);
    }
}

export default auth;