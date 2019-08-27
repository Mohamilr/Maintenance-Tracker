// username tag (a)
const username = document.querySelector('.username');

// parent tag (contents) on the admin dashboard page
const parentTag = document.querySelector('.contents');

// page discription tag
const header = document.querySelector('.head');

// generaten token
const token = localStorage.getItem('token');

// get userid
const userId = localStorage.getItem('userid');

// get username
const userName = localStorage.getItem('username');

// gets all requests for admin function
const getAllRequests = async () => {

   const response = await fetch(`http://localhost:3000/api/v1/users/requests/${userId}/all`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .catch(err => { console.log(err) })

 
  // if there are no requests in the database
  if(response.message === 'no request available in the database'){
      header.textContent = 'NO REQUESTS AVAILABLE IN THE DATABASE';
  }
  // else
  response.requests.forEach(requests => {
    // format date
    date = requests.date.substr(0, 10);
    
    //  requests format
     parentTag.innerHTML += `<div db-container>
     <div tb-headers-admin class="bd-head">
     <p>${requests.faultyitem}</p>
     <p>${requests.itemtype}</p>
     <p>${date}</p>
     <p class="req-status">${requests.status}</p>
     </div>
       <div complaint>
       <p>Complaint: ${requests.complaint}</p>
       </div>
     </div>`; 

    //  const status = document.querySelectorAll('.req-status');
    //  status.forEach(status => {
    //   if(requests.status === 'Undetermined' && requests.status === 'Disapproved'){
    //     status.style.color = 'red';
    //  }
    //  else if(requests.status === 'Pending'){
    //     status.style.color = '#f2e12c';
    //  }
    //  else if(requests.status === 'Resolved'){
    //     status.style.color = '#30c252';
    //  }
    //  })
     
     
  })
}
// display username
username.innerHTML = `<i class="fas fa-user-circle"></i> ${userName}`;
// callback to get all requests
getAllRequests();

// clears localStorage on logout
document.querySelector('.logout').addEventListener('click', () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  localStorage.removeItem("username");
})