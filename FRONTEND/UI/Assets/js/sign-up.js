// for sign up
// signup button
const signUpButton = document.querySelector('.sign-up')
// form tag
const formTag = document.querySelector('.form');

// addeventlistener
signUpButton.addEventListener('click', async (e) => {
    e.preventDefault();
    // inputs from the form
    const newUsername = document.querySelector('#username');
    const newPassword = document.querySelector('#password');
   
    // inputs values
    const body = {
        username: newUsername.value,
        password: newPassword.value
    }

    // fetch  using promise
    const response = await fetch('http://localhost:3000/api/v1/auth/signup', {
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

    // alert message
    const alertMessage = document.createElement('p');
    alertMessage.style.color = 'red';
    alertMessage.style.padding = '10px';

    if(response.message === 'username already exist'){
        alertMessage.textContent = 'username already exist, please sign in';
        formTag.appendChild(alertMessage);
        
        // reload page after 3 seconds
        setTimeout(() =>{
            window.location = 'sign-up.html';
        }, 3000);
    }
    else if(response.message === 'username and password required'){
        alertMessage.textContent = 'username and password required';
        formTag.appendChild(alertMessage);

        // reload page after 3 seconds
        setTimeout(() =>{
            window.location = 'sign-up.html';
        }, 3000);   
    }
    else{
        // location
        // window.location = './sign-in.html';
    }
     
    
    // empty input fields
    newUsername.value = '';
    newPassword.value = ''; 
})
