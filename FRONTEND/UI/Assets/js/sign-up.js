const baseUrl = 'https://fix-it-api.herokuapp.com';

// for sign up
// signup button
const signUpButton = document.querySelector('.sign-up')
// form tag
const form = document.querySelector('.form');

// inputs from the form
const newUsername = document.querySelector('#username');
const newPassword = document.querySelector('#password');

newUsername.focus();

// addeventlistener
signUpButton.addEventListener('click', async (e) => {
    e.preventDefault();
    

    // inputs values
    const body = {
        username: newUsername.value,
        password: newPassword.value
    }

    // fetch  using promise
    const response = await fetch(`${baseUrl}/api/v1/auth/signup`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .catch(e => console.log(e))


    // save token in the local storage to be used for authorization
    localStorage.setItem('token', response.token)

    // save userid in the localstorage
    localStorage.setItem('userid', response.userId)

    // save username in the localstorage
    localStorage.setItem('username', response.username)


    // alert message
    const alertMessage = document.createElement('p');
    alertMessage.style.color = 'red';
    alertMessage.style.padding = '10px';

    if (response.message === 'username already exist') {
        alertMessage.textContent = 'username already exist';
        form.appendChild(alertMessage);

        // reload page after 3 seconds
        setTimeout(() => {
            window.location = 'sign-up.html';
        }, 3000);
    }
    else if (response.message === 'username and password required') {
        alertMessage.textContent = 'username and password required';
        form.appendChild(alertMessage);

        // reload page after 3 seconds
        setTimeout(() => {
            window.location = 'sign-up.html';
        }, 3000);
    }

    // logs into user dashboard page
    if (response.message === 'user signed up successfully') {
        // user dashboard link
        window.location = '../UI/logedin-user/dashboard.html';
    }
    // logs into admin dashboard page
    else if (response.message === 'admin signed up successfully') {
        // location
        window.location = '../UI/logedin-admin/dashboard-admin.html';
    }


    // empty input fields
    newUsername.value = '';
    newPassword.value = '';
})
