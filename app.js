const createEl_btn = document.querySelector('.add');
const table = document.querySelector('.data-table');
const cName = document.querySelector('#customerName');
const cPhone = document.querySelector('#customerPhone');
const cAccount = document.querySelector('#customerAccount');
const form = document.querySelector('.form');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#search-input');
const filterOption = document.querySelector('.filter-entry');
const hammDiv = document.querySelector('.hamm-div');
const mainSideBar = document.querySelector('.fullwidth');
const checkk = document.querySelector('#checkk');
const navLogo = document.querySelector('.logo');
const navSearch = document.querySelector('.responsive');

let count = 1;

// hamm

const hammClick = () => {
    if (checkk.checked) {
        mainSideBar.className = 'main-display';
        navLogo.style.display = 'none';
        navSearch.style.display = 'none';

    } else {
        mainSideBar.className = 'fullwidth';
        navLogo.style.display = 'inline';
        navSearch.style.cssText = 'display:inline; margin-top: 14px;';
    }
};
hammDiv.onclick = hammClick;
window.addEventListener('DOMContentLoaded', hammClick);

// form
form.addEventListener('submit', (e) => {
    e.preventDefault();
}, false);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
}, false);

createEl_btn.onclick = () => {

    const cNameValue = cName.value.toUpperCase();
    let cPhoneValue = cPhone.value;
    const cAccountValue = cAccount.value;

    if (cNameValue === '') {
        alert('Text input must be entered...');
        cName.select();
        cName.focus();
    } else if (cPhoneValue === '') {
        alert('Text input must be entered...');
        cPhone.select();
        cPhone.focus();
    } else if (isNaN(cPhoneValue)) {
        alert('Phone Number input should contain only numbers!');
        cPhone.select();
        cPhone.focus();
    } else if (cPhoneValue.length < 11) {
        alert('Phone Number input limit not reached!');
        cPhone.select();
        cPhone.focus();
    } else if (cPhoneValue.length > 11) {
        alert('Phone Number input limit exceeded!');
        cPhone.select();
        cPhone.focus();
    } else if (cAccountValue === '') {
        alert('Text input must be entered...')
        cAccount.select();
        cAccount.focus();
    } else if (cAccountValue.length !== 10) {
        alert('Account Number is either incomplete or has exceeded it\'s limit!');
        cAccount.select();
        cAccount.focus();
    } else if (isNaN(cAccountValue)) {
        alert('Account Number input should contain only numbers!');
        cAccount.select();
        cAccount.focus();
    } else {

        //* tr element

        let tableRow = document.createElement('tr');
        tableRow.className = 'table-row';
        table.appendChild(tableRow);

        let serialNumber = document.createElement('td');
        serialNumber.className = 'table-data';
        serialNumber.textContent = count++;
        tableRow.appendChild(serialNumber);

        let tableData1 = document.createElement('td');
        tableData1.className = 'table-data';
        tableData1.textContent = cNameValue;
        tableRow.appendChild(tableData1);

        let tableData2 = document.createElement('td');
        tableData2.className = 'table-data';
        if (cPhoneValue.startsWith('0')){
            cPhoneValue = cPhoneValue.replace('0', '+234 ');
        }
        tableData2.textContent = cPhoneValue;
        tableRow.appendChild(tableData2);

        let tableData3 = document.createElement('td');
        tableData3.className = 'table-data';
        tableData3.textContent = cAccountValue;
        tableRow.appendChild(tableData3);

        let tableData4 = document.createElement('td');
        tableData4.className = 'table-data';
        let dateCreated = Date().slice(0, 24);
        tableData4.innerHTML = dateCreated;
        tableRow.appendChild(tableData4);

        // create check button

        let check = document.createElement('button');
        check.type = 'checkbox';
        check.className = 'check-btn';
        check.title = 'check item';
        check.innerHTML = '&check;';
        tableRow.appendChild(check);

        // create delete button
        let del = document.createElement('button');
        del.className = 'del-btn';
        del.title = 'remove from list';
        del.textContent = 'x';
        tableRow.appendChild(del);

        saveLocalEntries(cName.value);
        saveLocalEntries(cPhone.value);
        saveLocalEntries(cAccount.value);
        saveLocalEntries(dateCreated);

        // cName.value = "";
        // cPhone.value = "";
        // cAccount.value = "";
    }
}

table.onclick = (e) => {

    let item = e.target;
    let entry = item.parentElement;

    if (item.classList[0] === 'del-btn') {
        entry.classList.add('fall');
        // removeLocalEntries(entry);
        setTimeout(
            () => {
                entry.remove();
            }, 250
        )
    };

    if (item.classList[0] === 'check-btn') {
        entry.classList.toggle('completed');
    };
}


// search form

// searchInput.oninput = () => {
//     let searchInputValue = searchInput.value;
//     if (searchInputValue === '') {
//         window.location.reload();
//     } else {
//         let searchResultPosition = cNameValue.search(searchInputValue);
//         table.innerHTML = searchResultPosition;
//     }
// }

filterOption.onclick = (e) => {
    let entries = createEl_btn.childNodes;

    entries.forEach((entry) => {
        switch (e.target.value) {
            case 'all':
                entry.style.display = 'block';
                break;
            case "completed":
                if (entry.classList.contains('completed')) {
                    entry.style.display = 'block';
                } else {
                    entry.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!entry.classList.contains('completed')) {
                    entry.style.display = 'flex';
                } else {
                    entry.style.display = 'none';
                }
                break;
        }
    });
}

const saveLocalEntries = (entry1) => {
    //* check if already exits...
    let entries;
    if (localStorage.getItem('entries') === null) {
        entries = [];
    } else {
        entries = JSON.parse(localStorage.getItem('entries'));
    }

    entries.push(entry1);
    localStorage.setItem('entries', JSON.stringify(entries));
}

// const getEntries = () => {
//     //* check if already exits...
//     let entries;
//     if (localStorage.getItem('entries') === null) {
//         entries = [];
//     } else {
//         entries = JSON.parse(localStorage.getItem('entries'));
//     }
//     entries.forEach((entry) => {
//         // div element todo__wrapper

//         let todoDiv = document.createElement('div');
//         todoDiv.className = 'entry';
//         el.appendChild(todoDiv);

//         // li element

//         let todoli = document.createElement('li');
//         todoli.className = 'entry-item';
//         todoli.textContent = entry;
//         todoDiv.appendChild(todoli);

//         // create check button

//         let check = document.createElement('button');
//         check.type = 'checkbox';
//         check.className = 'check-btn';
//         check.title = 'check item';
//         check.innerHTML = '&check;';
//         todoDiv.appendChild(check);

//         // create delete button
//         let del = document.createElement('button');
//         del.className = 'del-btn';
//         del.title = 'remove from list';
//         del.textContent = 'x';
//         todoDiv.appendChild(del);
//     });
// }
// document.addEventListener('DOMContentLoaded', getEntries);

// const removeLocalentries = (entry) => {
//     let entries;
//     if (localStorage.getItem('entries') === null) {
//         entries = [];
//     } else {
//         entries = JSON.parse(localStorage.getItem('entries'));
//     }

//     const todoIndex = entry.children[0].innerText;
//     entries.splice(entries.indexOf(todoIndex), 1);
//     localStorage.setItem("entries", JSON.stringify(entries));
// }

//! cookies here

// function setCookie(cname,cvalue,exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + (exdays*24*60*60*1000));
//   let expires = "expires=" + d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(';');
//   for(let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// function checkCookie() {
//   let user = getCookie("username");
//   if (user != "") {
//     alert("Welcome again " + user);
//   } else {
//      user = prompt("Please enter your name:","");
//      if (user != "" && user != null) {
//        setCookie("username", user, 30);
//      }
//   }
// };
// window.onload = () => {
//     checkCookie();
// }