//import requests
import requests from '../dummydata/dummyData';

const RequestController = {
  allRequests(req, res) {
    // return requests
    return res.status(200).json({
        count: requests.length,
        requests
    });
},
  getsingleRequest(req, res) {
    const id = parseInt(req.params.id);
    const singleRequest = requests.find(request => request.id === id);
    // return single meal
    return res.json({ singleRequest });
  }
  
}


export default RequestController;