// import express
import express from 'express';

// import body-parser
import bodyParser from 'body-parser';

//imort dotenv
import dotenv from 'dotenv';

// request route
import requestRoutes from './routes/requestRoutes';
//admin route
import adminRoute from './routes/adminRoutes';
//sign in/up route
import signRoute from './routes/sign.route';

// initialize express
const app = express();

//configure donenv
dotenv.config();

// create port
const PORT = process.env.PORT || 3000;

// configure body-parser
app.use(bodyParser.json({ extended: true }));

// configure routes
app.use('/api/v1/', requestRoutes);
//admin route
app.use('/api/v1/', adminRoute);
//sign in/up route
app.use('/api/v1', signRoute);


// to test if app is running
app.get('/', (req, res) => {
  res.json({ message: 'welcome to the request api' })
})

//catch wrong route
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route Not Found' })
})

// start the express server
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})

// export app to be used in test
export default app;