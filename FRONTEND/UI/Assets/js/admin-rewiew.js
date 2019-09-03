const baseUrl = 'https://fix-it-maintenance.herokuapp.com/api/v1';

// get token
const token = localStorage.getItem('token');

if(!token){
  window.location = '../sign-in.html'
}

// parent tag for undetermined requests on the admin review page
const parentTag = document.querySelector('.contents');

// parent tag for approved requests on the admin review page
const approvedParentTag = document.querySelector('.approved-contents');

// page discription tag
const header = document.querySelector('.head');


// notification
const notificationTag = document.querySelector('.notification')

// function to approve requests
const approveRequest = (id) => {
  fetch(`${baseUrl}/requests/${id}/approve`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(e => console.log(e))

  // create notification element    
  const approved = document.createElement('p');
  approved.classList.add('notify')
  approved.textContent = 'Request Approved Successfully'

  notificationTag.appendChild(approved)

  // reloads page 1 sec after the function runs
  setTimeout(() => {
    window.location = 'review.html';
  }, 1000);
}


// function to disapprove requests
const disapproveRequest = (id) => {
  fetch(`${baseUrl}/requests/${id}/disapprove`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(e => console.log(e))

  // create notification element    
  const disapproved = document.createElement('p');
  disapproved.classList.add('notify')
  disapproved.textContent = 'Request Disapproved Successfully'

  notificationTag.appendChild(disapproved)

  // reloads page 1 sec ater the function runs
  setTimeout(() => {
    window.location = 'review.html';
  }, 1000);
}

// function to disapprove requests
const resolveRequest = (id) => {
  fetch(`${baseUrl}/requests/${id}/resolve`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(e => console.log(e))

  // create notification element    
  const resolved = document.createElement('p');
  resolved.classList.add('notify')
  resolved.textContent = 'Request Resolved Successfully'

  notificationTag.appendChild(resolved)

  // reloads page 1 sec ater the function runs
  setTimeout(() => {
    window.location = 'review.html';
  }, 1000);
}



// gets all requests for admin function
const getAllRequests = async () => {

  const response = await fetch(`${baseUrl}/requests`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => { console.log(err) })


  // if there are no requests in the database
  if (response.message === 'no request available in the database') {
    header.textContent = 'NO REQUESTS AVAILABLE IN THE DATABASE';
  }
  // else
  response.requests.forEach(requests => {
    if (requests.status === 'Undetermined') {
      // format date
      date = requests.date.substr(0, 10);

      //  requests format
      parentTag.innerHTML += `<div db-container>
       <div class="bd-head">
       <p>${requests.faultyitem}</p>
       <p>${requests.itemtype}</p>
       <p>${date}</p>
       <p class="req-status">${requests.status}</p>
       </div>
       <div complaint>
       <p>Complaint: ${requests.complaint}</p>
       <button class="btn-green" onclick=approveRequest(${requests.requestid})>Approve</button>
       <button class="btn-red" onclick=disapproveRequest(${requests.requestid})>Disapprove</button>
       </div>
      </div>`;

      // filter requests 
      // elements  
      const search = document.querySelector('.search-input');

      const content = document.querySelectorAll('[db-container]');

      // key up event to enable search by faultyitem
      search.addEventListener('keyup', (e) => {
        const text = e.target.value.toLowerCase()

        content.forEach(div => {
          const divs = div.firstElementChild.firstElementChild.textContent;
          if (divs.toLowerCase().indexOf(text) != -1) {
            div.style.display = 'block';
          }
          else {
            div.style.display = 'none';
          }
        })
      })
    }
    else if (requests.status === 'Pending') {
      // format date
      date = requests.date.substr(0, 10);

      //  requests format
      approvedParentTag.innerHTML += `<div db-container>
        <div class="bd-head">
        <p>${requests.faultyitem}</p>
        <p>${requests.itemtype}</p>
        <p>${date}</p>
        <p class="req-status">${requests.status}</p>
        </div>
        <div complaint>
        <p>Complaint: ${requests.complaint}</p>
        <button class="btn-green" onclick=resolveRequest(${requests.requestid})>Resolve</button>
        </div>
      </div>`;

      // filter requests
      // elements  
      const search1 = document.querySelector('#approve-search');

      const content1 = document.querySelectorAll('[db-container]');

      // key up event to enable search by faultyitem
      search1.addEventListener('keyup', (e) => {
        const text1 = e.target.value.toLowerCase()

        content1.forEach(div => {
          const divs = div.firstElementChild.firstElementChild.textContent;
          if (divs.toLowerCase().indexOf(text1) != -1) {
            div.style.display = 'block';
          }
          else {
            div.style.display = 'none';
          }
        })
      })
    }
  })
}

getAllRequests();

// clears token on logout
document.querySelector('.logout').addEventListener('click', () => {
  localStorage.removeItem("token");
})