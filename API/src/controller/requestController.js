//import requests
import jwt from 'jsonwebtoken';

import pool from '../model/connect.database';


const RequestController = {
  async allRequest(req, res) {
    try {
      const requestQuery = `SELECT * FROM requests`
      const requests = await pool.query(requestQuery);
      if (!requests.rows.length) {
        res.status(404).json({ message: 'no request available in the database' });
      }

      jwt.verify(req.token, process.env.SECRETKEY, (err, data) => {
        if (err) {
          res.sendStatus(403)
          console.log('error')
        }
        else {
          //all requests
          res.status(200).json({
            message: 'all requests',
            count: requests.length,
            requests: requests.rows
          });
        }
      })
    }
    catch (err) {
      console.log(err)
    }
  },
  async getsingleRequest(req, res) {
    const id = parseInt(req.params.id);

    try {
      const requestQuery = `SELECT * FROM requests WHERE requestId=$1`;
      const value = [id];
      const request = await pool.query(requestQuery, value);

      if (!request.rows.length) {
        res.status(404).json({ message: `request with id ${id} is not present in the database` });
      }

      res.status(200).json({
        request: request.rows[0]
      });
    }
    catch (err) {
      console.log(err);
    }


    // jwt.verify(req.token, 'secretkey', (err, data) => {
    //   if (err) {
    //     res.sendStatus(403);
    //   }
    //   else {
    //     // an error message if the id is not present
    //     if (!singleRequest) {
    //       res.status(404).json({ message: `request with id ${id} not found` })
    //     }
    //     // return single request
    //     return res.status(200).json({ singleRequest });
    //   }
    // })
  },
  async addRequest(req, res) {
    const { faultyItem, itemType, complaint, userId } = req.body;
    const status = 'Pending';

    if (!faultyItem || !itemType || !complaint) {
      res.status(400).json({
        message: "input all body"
      })
    }

    try {
      const requestQuery = `INSERT INTO requests (faultyItem, itemType, date, complaint, status, userId)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const value = [faultyItem, itemType, new Date(), complaint, status, userId];
      const newRequest = await pool.query(requestQuery, value);
      res.status(200).json({
        request: newRequest.rows
      })
    }
    catch (err) {
      console.log(err);
    }

    // jwt.verify(req.token, 'secretkey', (err, dara) => {
    //   if (err) {
    //     res.sendStatus(403);
    //   }
    //   else {
    //     // response to the post request
    //     return res.status(201).json({
    //       message: 'request created succesfully',
    //       request: {
    //         id: newID,
    //         faultyItem,
    //         itemType,
    //         date: new Date(),
    //         complaint,
    //         status
    //       }
    //     });
    //   }
    // })
  },
  async modifyARequest(req, res) {
    const id = parseInt(req.params.id);

    try {
      const requestQuery = `SELECT *  FROM requests WHERE requestId=$1`;
      const value = [id];
      const request = await pool.query(requestQuery, value);

      if (!request.rows[0]) {
        res.status(404).json({
          message: `request with id ${id} is not present in the database`
        })
      }

      const selectedRequest = request.rows[0];

      const { faultyItem } = req.body || selectedRequest.faultyItem;
      const { itemType } = req.body || selectedRequest.itemType;
      const { complaint } = req.body || selectedRequest.complaint;

      const updateQuery = `UPDATE requests SET faultyItem=$1, itemType=$2, date=$3, complaint=$4 WHERE requestId=$5 RETURNING *`;
      const values = [faultyItem, itemType, new Date(), complaint, id];
      const updatedRequest = await pool.query(updateQuery, values);

      if (!updatedRequest.rows.length) {
        res.status(400).json({
          message: `request with id ${id} is not present in the database`
        })
      }
      res.status(200).json({
        message: 'request updated successfully',
        updatedRequest: updatedRequest.rows[0]
      });
    }
    catch (err) {
      console.log(err);
    }
    // jwt.verify(req.token, 'secretkey', (err, data) => {
    //   if (err) {
    //     res.sendStatus(403);
    //   }
    //   else {
    //     return res.status(200).json({
    //       message: 'request updated successfully'
    //     });
    //   }
    // })
  }
}


export default RequestController;