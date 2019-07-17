const modal = document.querySelector('.the-modal');
// const btn = document.querySelectorAll('.btn-green');
const btn = document.querySelector('.btn-green');

const cancelModal = document.querySelector('.cancel-modal');

const showModal = (e) => {
    e.target.modal.style.display = 'block';
}
// btn.forEach(button => {
//     return button.addEventListener('click', showModal());
// });

btn.addEventListener('click', () => {
    modal.style.display = 'block';
})

cancelModal.addEventListener('click', () => {
    modal.style.display = 'none';
})