//import requests
import requests from '../dummydata/dummyData';

const RequestController = {
  allRequest(req, res) {
    res.status(200).json({
      count: requests.length,
      requests
    })
  },
  getsingleRequest(req, res) {
    const id = parseInt(req.params.id);
    const singleRequest = requests.find(request => request.id === id);
    if(!singleRequest){
      return res.status(404).json({ message: `request with id ${id} not found` })
      }
    // return single request
    return res.status(200).json({ singleRequest });
 },
 addRequest(req, res) {
    const lastId = requests[requests.length - 1].id;
    const newID = lastId + 1;

    const  { faultyItem }  = req.body;
    const  { itemType } = req.body;
    const  { complaint } = req.body;
    const  { status }  = req.body;

    const newRequest = {
      id: newID,
      faultyItem,
      itemType,
      date: new Date(),
      complaint,
      status
    }

    requests.push(newRequest);
    
    return res.status(200).json({ request: newRequest });

  }

  
}


export default RequestController;