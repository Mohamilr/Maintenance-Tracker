const baseUrl = 'https://fix-it-api.herokuapp.com';

// username tag (a)
const username = document.querySelector('.username');

// parent tag (contents) on the admin dashboard page
const parentTag = document.querySelector('.contents');

// page discription tag
const header = document.querySelector('.head');

// get token
const token = localStorage.getItem('token');

// get userid
const userId = localStorage.getItem('userid');

// get username
const userName = localStorage.getItem('username');


// modal for updating requests    
const modal = document.querySelector('.the-modal');


// gets all requests for admin function
const getAllRequests = async () => {

    const response = await fetch(`${baseUrl}/api/v1/users/requests/${userId}/all`, {
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
       <button class="btn-green" id="update" onclick=localStorage.setItem('id',${requests.requestid})>Update</button>
       </div>
       </div>`;

       // modal
       const btn = document.querySelectorAll('#update');
       const cancelModal = document.querySelector('.cancel-modal');
               

        // iterate over all btn(update-buttons)
        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener('click', () => {
                modal.style.display = 'block';
            })
        }

        // to cancel the modal
        cancelModal.addEventListener('click', () => {
            modal.style.display = 'none';
        })
    })
}

// callback to get all requests
getAllRequests();

// display username
username.innerHTML = '<i class="fas fa-user-circle"></i>' + ' ' + userName.toLocaleUpperCase();


// update input fields
const faultyItem = document.querySelector('#faultyitem');
const itemType = document.querySelector('#itemtype');
const description = document.querySelector('.description');
const userID = parseInt(userId, 10);

// submit button
const submitBtn = document.querySelector('.submit');

// notification
const notificationTag = document.querySelector('.notification')

// function to mdify a request
submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    // get the id of the selected request
    const tag = localStorage.getItem('id')
    const id = parseInt(tag, 10)


    // body values
    const body = {
        faulty_item: faultyItem.value,
        item_type: itemType.value,
        complaint: description.value,
        userId
    }

    const response = await fetch(`${baseUrl}/api/v1/users/requests/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(e => console.log(e))

        
    modal.style.display = 'none';    
    
    // create notification element    
    const update = document.createElement('p');
    update.classList.add('notify')

    // 
    if (response.message === 'sorry, you can no longer update this request') {
        update.style.color = 'red';
        update.textContent = 'Sorry, you can no longer update this request';
    }
    else {
        update.textContent = 'Request Updated Successfully';
    }
    notificationTag.appendChild(update)

    // reloads page after 1.5 sec
    setTimeout(() => {
    window.location = 'acceptance-status.html'
    }, 1500)

})


// clears localStorage on logout
document.querySelector('.logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
})

