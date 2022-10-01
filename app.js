import express from 'express';
import cookieParser from 'cookie-parser';
import apiResponses from './middleware/api_responses'
import agencyRoutes from './routes/agency';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});


app.use(apiResponses);
app.use('/v1/api', agencyRoutes);
app.use('/',(req,res)=>{return res.ok('this app is running')});

app.use((err, req, res, next) => {
  if (!err.output) {
    return res.status(500).json({
      statusCode: 500
    });
  }
  return res.status(err.output.statusCode).json(err.output);
});

export default app;
