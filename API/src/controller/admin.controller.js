import jwt from "jsonwebtoken";

import pool from "../model/connect.database";

const adminController = {
  // all requests
  async getAllRequests(req, res) {
    try {
      // query to get all requests
      const allRequestQuery = `SELECT * FROM requests`;
      const requests = await pool.query(allRequestQuery);

      // protect endpoint response
      jwt.verify(req.token, process.env.ADMIN_SECRETKEY, (err, data) => {
        res.status(200).json({
          message: "all requests",
          count: requests.rows.length,
          requests: requests.rows
        });

        if (err) {
          res.sendStatus(403);
          console.log("error");
        }
        if (!requests.rows.length) {
          res
            .status(404)
            .json({ message: "no request available in the database" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  // approve a request
  async approveARequest(req, res) {
    // number to target a request
    const id = parseInt(req.params.id);

    const status = "Pending";

    try {
      // query to update a request
      const approveQuery = `UPDATE requests SET status=$1 WHERE requestId=$2`;
      const values = [status, id];
      const approveRequest = await pool.query(approveQuery, values);

      // query to select updated request
      const toApprove = `SELECT * FROM requests WHERE requestId=$1`;
      const value = [id];
      const selectedRequest = await pool.query(toApprove, value);

      // protect endpoint response
      jwt.verify(req.token, process.env.ADMIN_SECRETKEY, (err, data) => {
        res.status(200).json({
          message: "request Approved successfully",
          approvedRequest: selectedRequest.rows[0]
        });

        if (err) {
          res.sendStatus(401);
          console.log(err);
        }
        // an error message if the id is not present
        if (!selectedRequest.rows[0]) {
          res.status(404).json({
            message: `request with id ${id} not`
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  // disapprove a request
  async disapproveARequest(req, res) {
    // number to target a request
    const id = parseInt(req.params.id);

    const status = "Disapproved";

    try {
      // query to update a request
      const disapproveQuery = `UPDATE requests SET status=$1 WHERE requestId=$2`;
      const values = [status, id];
      const disapproveRequest = await pool.query(disapproveQuery, values);

      // query to select updated request
      const toDisapprove = `SELECT * FROM requests WHERE requestId=$1`;
      const value = [id];
      const selectedRequest = await pool.query(toDisapprove, value);

      // protect endpoint response
      jwt.verify(req.token, process.env.ADMIN_SECRETKEY, (err, data) => {
        res.status(200).json({
          message: "request Disapproved successfully",
          disapprovedRequest: selectedRequest.rows[0]
        });

        // if token not provided
        if (err) {
          res.sendStatus(401);
        }

        // an error message if the id is not present
        if (!selectedRequest.rows[0]) {
          res.status(404).json({
            message: `request with id ${id} is not present in the database`
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
  async resolveARequest(req, res) {
    // number to target a request
    const id = parseInt(req.params.id);

    const status = "Resolved";

    try {
      // query to update a request
      const resolveQuery = `UPDATE requests SET status=$1 WHERE requestId=$2`;
      const values = [status, id];
      const resolveRequest = await pool.query(resolveQuery, values);

      // query to select updated request
      const toResolve = `SELECT * FROM requests WHERE requestId=$1`;
      const value = [id];
      const selectedRequest = await pool.query(toResolve, value);

      // protect endpoint response
      jwt.verify(req.token, process.env.ADMIN_SECRETKEY, (err, data) => {
        res.status(200).json({
          message: "request resolved successfully",
          resolvedRequest: selectedRequest.rows[0]
        });

        // if token not provided
        if (err) {
          res.sendStatus(401);
          console.log(err);
        }

        // an error message if the id is not present
        if (!selectedRequest.rows[0]) {
          res.status(404).json({
            message: `request with id ${id} is not present in the database`
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
};

// export admin controller to admin route
export default adminController;
