 import dotenv from 'dotenv';
 import http from 'http';
 import app from './app.js';
 import dbo from './db';
 
 dotenv.config();
 
 const normalizePort = val => {
   const port = parseInt(val, 10);
   if (isNaN(port)) {
     return val;
   }
   if (port >= 0) {
     return port;
   } 
   return false;
 };
 
 
 const onError = error => {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
   switch (error.code) {
     case 'EACCES':
       console.error(`${bind} requires elevated privileges`);
       process.exit(1);
     case 'EADDRINUSE':
       console.error(`${bind} is already in use`);
       process.exit(1);
     default:
       throw error;
   }
 };
 
 const onListening = () => {
   const addr = server.address();
 };
 
 const port = normalizePort(process.env.PORT);
 app.set('port', port);
 
 /**
  * Create HTTP server.
  */
 
 const server = http.createServer(app);

 dbo.connectToServer((err)=>{
  if(err){
      console.error(err);
      process.exit();
  }
});

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
console.log(`started on port ${port}`);





 