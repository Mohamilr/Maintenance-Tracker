import jwt from 'jsonwebtoken';

import pool from '../model/connect.database';


const RequestController = {
  // all requests for a loged in user
  async allRequest(req, res) {
    const userId  = parseInt(req.params.id);

    try {
      // query to get all requests in the database
      const requestQuery = `SELECT * FROM requests WHERE userId=$1`
      const value = [userId]
      const requests = await pool.query(requestQuery, value);


      // protect endpoint response
      jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
        
        // if token not provided
        if (err) {
          res.status(401).json({
            message: "token not generated"
          })
        }

        //  if the there are no request in the database
         if (!requests.rows.length) {
          res.json({ 
            status: 404,
            message: 'no request available in the database' 
          });
        }

        return res.status(200).json({
          message: 'all requests',
          count: requests.rows.length,
          requests: requests.rows
        });
 
      })
    }
    catch (err) {
      console.log(err)
    }
  },
  // a single request
  async getsingleRequest(req, res) {
    // number to target a request
    // const userId  = parseInt(req.params.id, 10);
    const id = parseInt(req.params.id);
    

    try {
      // query to get a single request from the database
      const requestQuery = `SELECT * FROM requests WHERE requestId=$1`;
      const value = [id];
      const request = await pool.query(requestQuery, value);


      // protect enpoint response
      jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
        // if token not provided
        if (err) {
          res.status(401).json({
            message: "token not generated"
          })
        }
        
          // an error message if the id is not present
          if (!request.rows.length) {
            res.status(404).json({ message: `request with id ${id} is not present in the database` });
          }
         
        // return single request
        return res.status(200).json({
          request: request.rows[0]
        });
        
      })
    }
    catch (err) {
      console.log(err);
    }
  },
  // post a request
  async addRequest(req, res) {
    const { faulty_item, item_type, complaint, userId } = req.body;
    const status = 'Undetermined';

    try {
      // query to post a request
      const requestQuery = `INSERT INTO requests (faultyItem, itemType, date, complaint, status, userId)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const values = [faulty_item, item_type, new Date(), complaint, status, userId];
      const newRequest = await pool.query(requestQuery, values);

      // protect enpoint response
      jwt.verify(req.token, process.env.SECRET_KEY, (err, dara) => {

        // if token not provided
        if (err) {
          res.sendStatus(401);
        }
        // if a body value is not present
        if (!faulty_item || !item_type || !complaint) {
          res.status(400).json({
            message: "input all body"
          })
        }

        // response to the post request
        res.status(201).json({
          message: "request added successfully",
          request: newRequest.rows
        })
      })
    }
    catch (err) {
      console.log(err);
    }
  },
  // update or modify a request
  async modifyARequest(req, res) {
    // number to target a request
    const id = parseInt(req.params.id);

    try {
      // query to get a single request from the database
      const requestQuery = `SELECT *  FROM requests WHERE requestId=$1`;
      const value = [id];
      const request = await pool.query(requestQuery, value);

      if (!request.rows[0]) {
        res.status(404).json({
          message: `request with id ${id} is not present in the database`
        })
      }

      // the sigle request gotten from the above query
      const selectedRequest = request.rows[0];
     
      // if request has been approved by admin
     if (selectedRequest.status !== 'Undetermined') {
      return res.status(403).json({
        message: 'sorry, you can no longer update this request'
      })
    }

      // values from the body
      const faulty_item = req.body.faulty_item || selectedRequest.faultyitem;
      const item_type = req.body.item_type || selectedRequest.itemtype;
      const complaint = req.body.complaint || selectedRequest.complaint;

      // query to update a single request from the database
      const updateQuery = `UPDATE requests SET faultyItem=$1, itemType=$2, date=$3, complaint=$4 WHERE requestId=$5 RETURNING *`;
      const values = [faulty_item, item_type, new Date(), complaint, id];
      const updatedRequest = await pool.query(updateQuery, values);

      // protect enpoint response
      jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {

        // if token not provided
        if (err) {
          res.status(401).json({
            message: "token not generated"
          })
          console.log('error')
        }
        
        // if the queried request is not present
        if (!updatedRequest.rows.length) {
          res.status(404).json({
            message: `request with id ${id} is not present in the database`
          })
        }

        return res.status(200).json({
          message: 'request updated successfully',
          updatedRequest: updatedRequest.rows[0]
        });
      })
    }
    catch (err) {
      console.log(err);
    }
  }
}


export default RequestController;