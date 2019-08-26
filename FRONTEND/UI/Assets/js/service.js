// username tag (a)
const username = document.querySelector('.username');

// submit button
const submitBtn = document.querySelector('.submit');

// get token
const token = localStorage.getItem('token');

// get username
const userName = localStorage.getItem('username');

// display username
username.innerHTML = `<i class="fas fa-user-circle"></i> ${userName}`;


     // request input fields
    const faultyItem = document.querySelector('#faultyitem');
    const itemType = document.querySelector('#itemtype');
    const description = document.querySelector('.description');
    
    // focus on the faultyitem input when the page loads
    faultyItem.focus()

submitBtn.addEventListener('click', (e) => {
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

    fetch('http://localhost:3000/api/v1/users/requests', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Authorization' : `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
     .then(res => res.json())
     .then(resp => console.log(resp))
     .catch(e => console.log(e))

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