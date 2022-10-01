import connection from "../db";

const {client} = connection;

const transactionOptions = {
  readConcern: { level: 'snapshot' },
  writeConcern: { w: 'majority' },
  readPreference: 'primary'
};



export const createAgency = async(req,res) => {
  const session = client.startSession();
  try {
    session.startTransaction(transactionOptions);
    const agency = client.db('demo').collection('agency');
    console.log(agency);
    await session.commitTransaction();
    return res.ok(agency);
  } 
  catch (error) {
    await session.abortTransaction();
    return res.internalServerError();
  } 
  finally {
    await session.endSession();
  }
};