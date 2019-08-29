// parent tag (contents) on the admin dashboard page
const parentTag = document.querySelector('.contents');

// page discription tag
const header = document.querySelector('.head');

// get token
const token = localStorage.getItem('token');


// gets all requests for admin function
const getAllRequests = async () => {

  const response = await fetch('https://fix-it-api.herokuapp.com/api/v1/requests', {
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
  })


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

getAllRequests();

// clears token on logout
document.querySelector('.logout').addEventListener('click', () => {
  localStorage.removeItem("token");
})





