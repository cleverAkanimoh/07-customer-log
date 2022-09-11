const fname = document.querySelector('#fname');
const pass1 = document.querySelector('#pass1');
const pass2 = document.querySelector('#pass2');
const checkbox = document.querySelector('#checktoggle');
const error = document.querySelector('.error-msg');
let formSign = document.querySelector('.form-sign');

// form

formSign.addEventListener('submit', (e) => {
    e.preventDefault();
    if (fname.value === '') {
        error.textContent = 'name input cannot be empty';
        fname.select();
       
    } else if ( pass1.value === '') {
        error.textContent = 'password input cannot be empty';
        pass1.select();
    } else if (pass1.value !== pass2.value) {
        error.textContent = 'password inputs does not match';
        pass2.select();
    }
    setTimeout(() => { error.textContent = '' }, 5000)
    saveLocalEntries(fname.value, pass1.value);
}, false);

// toggle password visibility

const checkToggle = () => {
    if (checkbox.checked) {
        pass1.type = 'text';
        pass2.type = 'text';
    } else {
        pass1.type = 'password';
        pass2.type = 'password';
    }
};
checkbox.onclick = checkToggle;
document.addEventListener('DOMContentLoaded', checkToggle);

// local storage

const saveLocalEntries = (entry1, entry2) => {

    //* check if already exits...
    let entries;
    if (localStorage.getItem('entries') === null) {
        entries = [];
    } else {
        entries = JSON.parse(localStorage.getItem('entries'));
    }

    entries = {
        entry1: entry1,
        entry2: entry2,
    };
    localStorage.setItem('entries', JSON.stringify(entries));
}

const getEntries = () => {
    //* check if already exits...
    let entries;
    if (localStorage.getItem('entries') === null) {
        entries = [];
    } else {
        entries = JSON.parse(localStorage.getItem('entries'));
    }

    fname.value = entries.entry1;
    pass1.value = entries.entry2;
    JSON.parse(localStorage.getItem('entries'));

}
document.addEventListener('DOMContentLoaded', getEntries);