const baseUrl = 'https://fix-it-api.herokuapp.com';

// username tag (a)
const username = document.querySelector('.username');

// submit button
const submitBtn = document.querySelector('.submit');

// get token
const token = localStorage.getItem('token');

// get username
const userName = localStorage.getItem('username');

// display username
username.innerHTML = '<i class="fas fa-user-circle"></i>' + ' ' + userName.toLocaleUpperCase();

// notification
const notificationTag = document.querySelector('.notification')

// request input fields
const faultyItem = document.querySelector('#faultyitem');
const itemType = document.querySelector('#itemtype');
const description = document.querySelector('.description');
    
// focus on the faultyitem input when the page loads
faultyItem.focus()

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
        // get userid
    const user = localStorage.getItem('userid');
    const userId = parseInt(user, 10)

    const body = {
        faulty_item: faultyItem.value,
        item_type: itemType.value,
        complaint: description.value,
        userId
    }

    const response = await fetch(`${baseUrl}/api/v1/users/requests`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Authorization' : `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
     .then(res => res.json())
     .catch(e => console.log(e))

     // create notification element    
   const created = document.createElement('p');
   created.classList.add('notify')
   if(response.message === 'input all body'){
    created.classList.add('notify')
    created.style.color = 'red'
    created.textContent = 'All Entries Are Required'
   }
   else {
   created.textContent = 'Request Created Successfully, Please go to dashboard'
   }
   notificationTag.appendChild(created)
   
   //  reloads page 1 sec after the function runs
   setTimeout(() => {
    window.location = 'service.html';
   }, 1500);

     faultyItem.value = '';
     itemType.value = '';
     description.value = '';
})

  
// clears localStorage on logout
document.querySelector('.logout').addEventListener('click', () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
})