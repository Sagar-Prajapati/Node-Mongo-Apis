import mongodb, { ObjectId } from 'mongodb'
import dotenv from 'dotenv';
import { AgencyValidation, ClientUpdateValidation } from '../utils/schema';

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

    const { agencyId, name, address1, address2, city, phoneNo, clients } = data;

    const newAgency = {
      agencyId, name, address1, address2, city, phoneNo
    }

    const agencyCollection = dboCon.db('demo').collection('agency');
    const insertedAgency = await agencyCollection.insertOne(newAgency);
    const insertedAgencyId = insertedAgency.insertedId.toString();


    //if clients are avaliable
    if (clients && clients.length) {
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

export const updateClient = async (req, res) => {
  const session = dboCon.startSession();
  session.startTransaction(transactionOptions);
  try {
    const { error, value: data } = ClientUpdateValidation.validate(req.body);
    if (error) {
      await session.abortTransaction();
      return res.badRequest(error.message);
    }

    const { agencyObjectId, clientObjectId, client } = data;

    const agencyCollection = dboCon.db('demo').collection('agency');
    const _agency = await agencyCollection.findOne({ "_id": ObjectId(agencyObjectId) });

    if (!_agency) {
      await session.abortTransaction();
      return res.badRequest('wrong agency Id');
    }

    const clientCollection = dboCon.db('demo').collection('client');
    const _client = await clientCollection.findOne({ "_id": ObjectId(clientObjectId),"agencyId":agencyObjectId });

    if (!_client) {
      await session.abortTransaction();
      return res.badRequest('this client is not belong to this agency');
    }

    const query = { "_id": ObjectId(clientObjectId)};
    const update = { $set:client};
    const options = { upsert: true };

    await clientCollection.updateOne(query,update,options);

    await session.commitTransaction();
    return res.ok("client updated");
  } 
  catch (error) {
    await session.abortTransaction();
    return res.internalServerError();
  }
  finally {
    await session.endSession();
  }
}






// this API is NOT WORKING 
export const getMaxTotalBillData = async(req,res)=>{
  try {

    const clientCollection = dboCon.db('demo').collection('client');
    const _client = clientCollection.find().sort({"totalBill":-1}).limit(1)

    console.log(_client);

    return res.ok();
  }  catch (error) {
    return res.internalServerError();
  }
}