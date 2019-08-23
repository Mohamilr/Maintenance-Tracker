
    const token = localStorage.getItem('token');


 const getAllRequests = async () => {

   const response = await fetch('http://localhost:3000/api/v1/requests', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer' + token
    }
  })
  .then(res => res.json())
//   .then(data => { console.log(data) })
  .catch(err => { console.log(err) })

  console.log(response)
}
// getAllRequests();

// getAllRequests();