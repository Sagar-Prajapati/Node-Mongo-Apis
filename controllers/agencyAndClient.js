import mongodb from 'mongodb'
import dotenv from 'dotenv';
import { AgencyValidation } from '../utils/schema';

dotenv.config();

const { MongoClient } = mongodb;
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const dboCon = await client.connect();
const transactionOptions = {
  readConcern: { level: 'snapshot' },
  writeConcern: { w: 'majority' },
  readPreference: 'primary'
};


export const createAgency = async (req, res) => {
  const session = dboCon.startSession();
  session.startTransaction(transactionOptions);
  try {
    const { error, value: data } = AgencyValidation.validate(req.body);
    if (error) {
      await session.abortTransaction();
      return res.badRequest(error.message);
    }

    const { agencyId, Name, address1, address2, city, phoneNo, clients } = data;

    const newAgency = {
      agencyId, Name, address1, address2, city, phoneNo
    }

    const agencyCollection = dboCon.db('demo').collection('agency');
    const insertedAgency = await agencyCollection.insertOne(newAgency);
    const insertedAgencyId = insertedAgency.insertedId.toString();


    //if clients are avaliable
    if(clients && clients.length){
      const clientCollection = dboCon.db('demo').collection('client');

      await Promise.all(
        clients.map(async ({ clientId, name, email, phoneNumber, totalBill }) => {
          const newClient = { clientId, agencyId: insertedAgencyId, name, email, phoneNumber, totalBill };
          await clientCollection.insertOne(newClient);
        })
      )
    }
    //client ended

    await session.commitTransaction();
    return res.ok();
  } catch (error) {
    await session.abortTransaction();
    return res.internalServerError();
  }
  finally {
    await session.endSession();
  }
};