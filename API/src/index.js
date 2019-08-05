// import express
import express from 'express';

// import body-parser
import bodyParser from 'body-parser';

// get all routes
import requestRoutes from './routes/requestRoutes';
//admin route
import adminRoute from './routes/adminRoutes';

// initialize express
const app = express();

// create port
const port = 3000;

// configure body-parser
app.use(bodyParser.json({ extended: true }));

// configure routes
app.use('/api/v1/', requestRoutes);
//admin route
app.use('/api/v1/', adminRoute);


// to test if app is running
app.get('/', (req, res) => {
  res.json({ message: 'welcome to the request api' })
})

//catch wrong route
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route Not Found' })
})

// start the express server
app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})

// export app to be used in test
export default app;