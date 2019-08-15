import jwt from 'jsonwebtoken';
import pool from '../model/connect.database';


const adminController = {
   async getAllRequests(req, res) {
       try{
           const allRequestQuery = `SELECT * FROM requests`
           const requests = await pool.query(allRequestQuery);
          res.status(200).json({
           message: "all requests",
           count: requests.length,
           requests: requests.rows
       })
       }
       catch(err){
           console.log(err);
       }   
   },
   async approveARequest(req, res) {
       const id = parseInt(req.params.id);
       const status = 'Pending';

       try{
           const approveQuery = `UPDATE requests SET status=$1 WHERE requestId=$2`
           const values = [status, id];
           const approveRequest = await pool.query(approveQuery, values)
        
           
           const toApprove = `SELECT * FROM requests WHERE requestId=$1`;
           const value = [id];
           const selectedRequest = await pool.query(toApprove, value);

           if(!selectedRequest.rows[0]){
            res.status(404).json({
                message: `request with id ${id} is not present in the database`
            })
        }
           res.status(200).json({
            message: 'request Approved successfully',
            approvedRequest: selectedRequest.rows[0]
          });
        
       }
       catch(err){
            console.log(err);
       }
   },
   async disapproveARequest(req, res) {
       const id = parseInt(req.params.id);
       const status = 'Disapproved';

       try{
           
           const disapproveQuery = `UPDATE requests SET status=$1 WHERE requestId=$2`;
           const values = [status, id];
           const disapproveRequest = await pool.query(disapproveQuery, values);

           const toDisapprove = `SELECT * FROM requests WHERE requestId=$1`;
           const value = [id];
           const selectedRequest = await pool.query(toDisapprove, value);


           if(!selectedRequest.rows[0]){
            res.status(404).json({
                message: `request with id ${id} is not present in the database`
            })
        }

           res.status(200).json({
               message: 'request Disapproved successfully',
               disapprovedRequest: selectedRequest.rows[0]
           });
       }
       catch(err){
           console.log(err);
       }
   },
   async resolveARequest(req, res) {
       const id = parseInt(req.params.id);

       const status = 'Resolved';

       try{
           
           const resolveQuery = `UPDATE requests SET status=$1 WHERE requestId=$2`;
           const values = [status, id];
           const resolveRequest = await pool.query(resolveQuery, values);

           const toResolve = `SELECT * FROM requests WHERE requestId=$1`;
           const value = [id];
           const selectedRequest = await pool.query(toResolve, value);


           if(!selectedRequest.rows[0]){
            res.status(404).json({
                message: `request with id ${id} is not present in the database`
            })
        }

           res.status(200).json({
               message: 'request resolved successfully',
               resolvedRequest: selectedRequest.rows[0]
           });
       }
       catch(err){
           console.log(err);
       }
   }
}


export default adminController;