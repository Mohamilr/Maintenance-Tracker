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

// configure cors
app.use(cors());

// configure donenv
dotenv.config();

// configure body-parser
app.use(bodyParser.json({ extended: true }));

// create port
const PORT = process.env.PORT || 3000;


// configure path to load html files
const frontendDir = path.join(__dirname, '../FRONTEND');
//
app.use(express.static(frontendDir));


// configure routes
app.use('/api/v1/', requestRoutes);
//admin route
app.use('/api/v1/', adminRoute);
//sign in/up route
app.use('/api/v1', signRoute);


// swagger route
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// to test if app is running
app.get('/welcome', (req, res) => {
  res.json({ message: 'welcome to the request api' })
})



//catch wrong route
app.use((req, res) => {
  res.status(404).send(
    `<section style="text-align: center">
    <h1 style="font-size: 10em">404</h1>
    <p>You must have visited the wrong link.</p>
    <p>Please go back to the homepage <a href="../index.html" style="color : #30c252">Fix It</a></p>
  </section>`
  )
})

// start the express server
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})

// export app to be used in test
export default app;