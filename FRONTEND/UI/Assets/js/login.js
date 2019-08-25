
// for signin
const logInButton = document.querySelector('.sign-in')
// form tag
const form = document.querySelector('.form');

logInButton.addEventListener('click', async (e) => {
    e.preventDefault();
    // inputs from the form
    const Username = document.querySelector('#username');
    const Password = document.querySelector('#password');
   
    // inputs values
    const body = {
        username: Username.value,
        password: Password.value
    }

    // fetch  using promise
    const response = await fetch('http://localhost:3000/api/v1/auth/login', {
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

    // alert message
    const alertMessage = document.createElement('p');
    alertMessage.style.color = 'red';
    alertMessage.style.padding = '10px';

    if(response.message === 'incorrect username. please try again or signup if you haven\'t'){
        alertMessage.textContent = 'incorrect username. please try again or signup if you haven\'t';
        form.appendChild(alertMessage);
        
        // reload page after 3 seconds
        setTimeout(() =>{
            window.location = 'sign-in.html';
        }, 3000);
    }
    else if(response.message === 'incorrect username or password'){
        alertMessage.textContent = 'incorrect username or password';
        form.appendChild(alertMessage);

        // reload page after 3 seconds
        setTimeout(() =>{
            window.location = 'sign-in.html';
        }, 3000);   
    }
    else{
        // location
        // window.location = '../UI/logedin-admin/dashboard-admin.html';


        // user dashboard link 
        window.location = '../UI/logedin-user/dashboard.html';
    }
     
    
    // empty input fields
    Username.value = '';
    Password.value = ''; 
})