import requests from '../dummydata/dummyData';


const adminController = {
   getAllRequests(req, res) {
       res.status(200).json({
           message: "all requests",
           count: requests.length,
           requests
       })
   }
}


export default adminController;