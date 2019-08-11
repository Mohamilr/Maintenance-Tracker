// import express
import express from 'express';

// import body-parser
import bodyParser from 'body-parser';

import dotenv from 'dotenv';

// get all routes
import requestRoutes from './routes/requestRoutes';

// initialize express
const app = express();

dotenv.config();

// create port
const PORT = process.env.PORT || 3000;

// configure body-parser
app.use(bodyParser.json({ extended: true }));

// configure routes
app.use('/api/v1/', requestRoutes);


// to test if app is running
app.get('/', (req, res) => {
  res.json({ message: 'welcome to the request api' })
})

//catch wrong route
app.use('*', (req, res) => {
  res.json({ message: 'Route Not Found' })
})

// start the express server
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})

// export app to be used in test
export default app;