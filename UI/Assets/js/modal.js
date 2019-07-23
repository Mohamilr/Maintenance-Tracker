const modal = document.querySelector('.the-modal');
const btn = document.querySelectorAll('#update');
const cancelModal = document.querySelector('.cancel-modal');

// iterate over all btn(update-buttons)
for(let i = 0; i < btn.length; i++){
    btn[i].addEventListener('click', () => {
        modal.style.display = 'block';
    })
}

// to cancel the modal
cancelModal.addEventListener('click', () => {
    modal.style.display = 'none';
})