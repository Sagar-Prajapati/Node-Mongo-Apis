import mongodb, { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();


const { MongoClient } = mongodb;
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const dboCon = await client.connect();


export const verifyUser = async(req,res,next)=>{
  try {
    if (!req.headers.authorization) {
      return res.unauthorized('Authentication required');
    }
    const token = req.headers.authorization.replace(/Bearer /, '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    const {name,role} = decoded;

    const userCollection = dboCon.db('testusers').collection('userverify');
    const _user = await userCollection.findOne({ "name": name,"role":role,"token":token });

    if (!_user) {
      return res.badRequest('you have no permission to access');
    }  
    
    next();
  } catch (error) {
    return res.unauthorized('Authentication required');
  }
}




