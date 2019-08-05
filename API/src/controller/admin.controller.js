import requests from '../dummydata/dummyData';


const adminController = {
   getAllRequests(req, res) {
       res.status(200).json({
           message: "all requests",
           count: requests.length,
           requests
       })
   },
   approveARequest(req, res) {
       const id = parseInt(req.params.id);
       
       requests.map(request => {
        requests[id -1] = {
            id,
            faultyItem: request.faultyItem,
            itemType: request.itemType,
            date: request.date,
            complaint: request.complaint,
            status: "pending"
        }
       })
      
    res.status(200).json({
        message: "request approved"
    })
   }
}


export default adminController;