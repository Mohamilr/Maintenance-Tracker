// import express
import express from 'express';

// import body-parser
import bodyParser from 'body-parser';

//imort dotenv
import dotenv from 'dotenv';

// import cors 
import cors from 'cors';

// path
import path from 'path';


// import swagger ui
import swaggerUi from 'swagger-ui-express';

// request route
import requestRoutes from './routes/requestRoutes';
//admin route
import adminRoute from './routes/adminRoutes';
//sign in/up route
import signRoute from './routes/sign.route';

// import swagger document
import swaggerDocument from '../swagger.json';

// initialize express
const app = express();

// configure donenv
dotenv.config();

// configure body-parser
app.use(bodyParser.json({ extended: true }));

// create port
const PORT = process.env.PORT || 3000;

// configure cors
app.use(cors());


// access to CORS (because of policy restriction)
app.use((req, res, next) =>  {
  // allow all routes
  res.setHeader('Access-Control-Allow-Origin', '*');

  // allow methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');

  // allow request headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});



// configure routes
app.use('/api/v1/', requestRoutes);
//admin route
app.use('/api/v1/', adminRoute);
//sign in/up route
app.use('/api/v1', signRoute);


// swagger route
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// configure path to load html files
const frontendDir = path.join(__dirname, '../FRONTEND');
//
app.use(express.static(frontendDir));

// to test if app is running
app.get('/', (req, res) => {
  res.json({ message: 'welcome to the request api' })
})



//catch wrong route
app.use((req, res) => {
  res.status(404)
  res.render('/404.jade', {title : '404:  file not found'})
})

// start the express server
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})

// export app to be used in test
export default app;