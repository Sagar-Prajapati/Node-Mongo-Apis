import mongodb from 'mongodb'
import dotenv from 'dotenv';

dotenv.config();

const { MongoClient } = mongodb;
const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
let dbConnection;
// const dbo = { 
//     connectToServer: (callback)=>{
//         client.connect((err, db)=>{
//             if(err || !db){
//                 return callback(err);
//             }
//         dbConnection = db.db('test');
//         console.log('Successfully connected to MongoDB');  
//         return callback();
//     });
//     },

//     detDb: ()=>{
//         return dbConnection;       
//     },
// };

const dbo = async()=> {
    await client.connect();
    dbConnection = client.db('test');
    return dbConnection;
  }

dbo()
  .then(()=>{
    console.log('Successfully connected to MongoDB')
  })
  .catch(err=>{
      console.log(err);
      process.exit(1)
    })
  .finally(() => client.close());


export default {dbo,client};