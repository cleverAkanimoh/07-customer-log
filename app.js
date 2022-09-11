const createEl_btn = document.querySelector('.add');
const table = document.querySelector('.data-table');
const cName = document.querySelector('#customerName');
const cPhone = document.querySelector('#customerPhone');
const cAccount = document.querySelector('#customerAccount');
const form = document.forms;
const searchInputs = document.querySelectorAll('#search-input');
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

for (let i = 0; i < form.length; i++) {
    form[i].addEventListener('submit', (e) => {
        e.preventDefault();
    }, false);
}

//creating new elements

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
        if (cPhoneValue.startsWith('0')) {
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

        cName.value = "";
        cPhone.value = "";
        cAccount.value = "";
    }
}

// deleting and adding filter options

table.ondblclick = (e) => {

    let item = e.target;
    let entry = item.parentElement;

    if (item.classList[0] === 'del-btn') {
        entry.classList.add('fall');
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

// search functionality

searchInputs.forEach((input) => {
    input.oninput = () => {
        let tableValue = document.querySelectorAll('.table-row');
        let noSearchResult = document.querySelector('.search-not-found');
        let searchQuery = input.value;

        for (let i = 0; i < tableValue.length; i++) {
            if (tableValue[i].textContent.toUpperCase().includes(searchQuery.toUpperCase())) {
                tableValue[i].classList.remove('search-hidden');
                noSearchResult.style.display = 'none';
                table.classList.remove('table-hidden');

            } else if (!tableValue[i].textContent.toUpperCase().includes(searchQuery.toUpperCase())) {
                tableValue[i].classList.add('search-hidden');
                noSearchResult.style.display = 'block';
                table.classList.add('table-hidden');
            } else {
                tableValue[i].classList.add('search-hidden');
                noSearchResult.style.display = 'none';
                table.classList.remove('table-hidden');

            };
        }
    }
});

// filter functionality

filterOption.onclick = (e) => {
    let tableRow = document.querySelectorAll('.table-row');

    console.log(tableRow);
    console.log(e.target.value)

    tableRow.forEach((entry) => {
        switch (e.target.value) {
            case 'all':
                entry.classList.remove('table-hidden');
                break;
            case "completed":
                if (entry.classList.contains('completed')) {
                    entry.classList.remove('table-hidden');
                } else {
                    entry.classList.add('table-hidden');
                }
                break;
            case "uncompleted":
                if (!entry.classList.contains('completed')) {
                    entry.classList.remove('table-hidden');
                } else {
                    entry.classList.add('table-hidden');
                }
                break;
        }
    });
}