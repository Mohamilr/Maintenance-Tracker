//import requests
import requests from '../dummydata/dummyData';
import jwt from 'jsonwebtoken';


const RequestController = {
  allRequest(req, res) {
    jwt.verify(req.token, 'secretkey', (err, data) => {
      if (err) {
        res.sendStatus(403)
        console.log('error')
      }
      else {
        //all requests
        res.status(200).json({
          message: 'all requests',
          count: requests.length,
          requests
        })
      }
    })
  },
  getsingleRequest(req, res) {
    const id = parseInt(req.params.id);
    // select a request by id
    const singleRequest = requests.find(request => request.id === id);

    jwt.verify(req.token, 'secretkey', (err, data) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        // an error message if the id is not present
        if (!singleRequest) {
          res.status(404).json({ message: `request with id ${id} not found` })
        }
        // return single request
        return res.status(200).json({ singleRequest });
      }
    })
  },
  addRequest(req, res) {
    const lastId = requests[requests.length - 1].id;
    const newID = lastId + 1;

    const { faultyItem, itemType, complaint } = req.body;
    const status = 'pending';

    if (!faultyItem || !itemType || !complaint) {
      res.status(400).json({
        message: "input all body"
      })
    }
    // adds request to the present requests 
    requests.push({
      id: newID,
      faultyItem,
      itemType,
      date: new Date(),
      complaint,
      status
    });
    jwt.verify(req.token, 'secretkey', (err, dara) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        // response to the post request
        return res.status(201).json({
          message: 'request created succesfully',
          request: {
            id: newID,
            faultyItem,
            itemType,
            date: new Date(),
            complaint,
            status
          }
        });
      }
    })
  },
  modifyARequest(req, res) {
    const id = parseInt(req.params.id);
    const { faultyItem, itemType, complaint } = req.body;

    requests.map(request => {
      if (request.id === id) {
        requests[id - 1] = {
          id: id,
          faultyItem: faultyItem || request.faultyItem,
          itemType: itemType || request.itemType,
          date: new Date(),
          complaint: complaint || request.complaint,
          status: request.status
        }
      }
    })
    jwt.verify(req.token, 'secretkey', (err, data) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        return res.status(200).json({
          message: 'request updated successfully'
        });
      }
    })
  }
}


export default RequestController;