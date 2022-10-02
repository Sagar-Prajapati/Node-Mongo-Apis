import mongodb from 'mongodb'
import dotenv from 'dotenv';

dotenv.config();

const { MongoClient } = mongodb;
const connectionString = process.env.ATLAS_URI;

export const client = new MongoClient(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

let dbConnection;
const dbo = { 
    connectToServer: (callback)=>{
        client.connect((err, db)=>{
            if(err || !db){
                return callback(err);
            }
        dbConnection = db.db('testusers');
        console.log('Successfully connected to MongoDB');  
        return callback();
    });
    }
};

export default dbo;