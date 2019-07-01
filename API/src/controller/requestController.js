//import requests
import requests from '../dummydata/dummyData';

const RequestController = {
    allRequests(req, res) {
        // return requests;
        return res.status(200).json({
            count: requests.length,
            requests
        })
    }
}


export default RequestController;