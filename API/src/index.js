// import express
import express from 'express';

// import body-parser
import bodyParser from 'body-parser';

// get all routes
import requestRoutes from './routes/requestRoutes';

// initialize express
const app = express();

// create port
const port = 3000;

// configure body-parser
app.use(bodyParser.json({ extended: true }));

// configure routes
app.use('/api/v1/', requestRoutes);


// to test if app is running
app.get('/', (req, res) => {
  res.json({ message: 'it will work' })
})

// start the express server
app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})

// export app to be used in test
export default app;