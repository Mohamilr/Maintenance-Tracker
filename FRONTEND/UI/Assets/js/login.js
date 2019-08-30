// for signin
const logInButton = document.querySelector('.sign-in')

// form tag
const form = document.querySelector('.form');

// inputs from the form
const Username = document.querySelector('#username');
const Password = document.querySelector('#password');

// focus on username input when page loads
Username.focus();

logInButton.addEventListener('click', async (e) => {
    e.preventDefault();

    // inputs values
    const body = {
        username: Username.value,
        password: Password.value
    }

    // fetch  using promise
    const response = await fetch('fix-it-maintenance.herokuapp.com/api/v1/auth/login', {
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

    if (response.message === 'incorrect username. please try again or signup if you haven\'t') {
        alertMessage.textContent = 'incorrect username. please try again or signup if you haven\'t';
        form.appendChild(alertMessage);

        // reload page after 3 seconds
        setTimeout(() => {
            window.location = 'sign-in.html';
        }, 3000);
    }
    else if (response.message === 'incorrect username or password') {
        alertMessage.textContent = 'incorrect username or password';
        form.appendChild(alertMessage);

        // reload page after 3 seconds
        setTimeout(() => {
            window.location = 'sign-in.html';
        }, 3000);
    }
    // logs into user dashboard page
    if (response.message === 'user loged in successfully') {
        // user dashboard link 
        window.location = '../UI/logedin-user/dashboard.html';
    }
    // logs into admin dashboard page
    else if (response.message === 'admin loged in successfully') {
        // location
        window.location = '../UI/logedin-admin/dashboard-admin.html';
    }


    // empty input fields
    Username.value = '';
    Password.value = '';
})