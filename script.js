'use strict';

let dataList = [];

const MAIN_BAR = document.querySelector('.bar');
const ADD_BUTTON = document.querySelector('.add-task');
const SEARCH_BUTTON = document.querySelector('.search-task');
const DATA_MAIN_CONTAINER = document.querySelector('.data-main');
const NO_DATA = document.querySelector('.no-data');
const ALL_DATA = document.querySelector('#all');
const ACTIVE_DATA = document.querySelector('#active');
const COMPLETE_DATA = document.querySelector('#complete');
const ACTION = document.querySelector("#action");
const SORT = document.querySelector('#sort');



if (dataList.length === 0) {
    NO_DATA.style.opacity = 100;
}

DATA_MAIN_CONTAINER.innerHTML = '';

// View todo list
const viewTODO = function (dataArray, sort = false, value = 'Oldest') {
    DATA_MAIN_CONTAINER.innerHTML = '';
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;

    function sortAlphaNum(a, b) {
        var aA = a.data.replace(reA, "");
        var bA = b.data.replace(reA, "");
        if (aA === bA) {
            var aN = parseInt(a.data.replace(reN, ""), 10);
            var bN = parseInt(b.data.replace(reN, ""), 10);
            return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
            return aA > bA ? 1 : -1;
        }
    }
    let data = sort ? dataArray.slice().sort(sortAlphaNum) : dataArray;

    data.forEach(function (dataItem, i) {
        let ch = dataItem.check == true ? 'checked' : null;
        const text = `<div class="data-line">
      <div class="data">
              <input type="checkbox" name="chek" value="${dataItem.data}" class="check" id="check-${dataItem.id}" onchange="checkItem(${dataItem.id})" ${ch} >
              <input type="text" id="${dataItem.id}" class='textadd' value="${dataItem.data}" disabled ${Boolean(ch) ? 'style="text-decoration:line-through"' : 'style="text-decoration:none"'}>
      </div>
      <div class="data-button">
          <button class="edit edit-close" onclick=editItem(${dataItem.id})><i class="fa-solid fa-pen-to-square" title="Edit button"></i></button>
          <button class="delete" onclick=deleteItem(${i})><i class="fa-solid fa-delete-left"title="Delete button"></i></button>
      </div>
  </div>
  <hr style="margin: 15px 0;">`;
        if (sort) {
            if (value == 'A-Z')
                DATA_MAIN_CONTAINER.insertAdjacentHTML('beforeend', text);
            else
                DATA_MAIN_CONTAINER.insertAdjacentHTML('afterbegin', text);
        }
        else {
            if (value == 'Newest')
                DATA_MAIN_CONTAINER.insertAdjacentHTML('afterbegin', text);
            else
                DATA_MAIN_CONTAINER.insertAdjacentHTML('beforeend', text);
        }
    });
};

// Delete Item of TODO
function deleteItem(id) {
    if (confirm("Are you sure for deleting this task ?") == true) {
        dataList.splice(id, 1);
        viewTODO(dataList);
        console.log(dataList);
        if (dataList.length == 0) {
            NO_DATA.style.opacity = 100;
        }
    }
};

// Edit Item of TODO
function editItem(id) {
    const Data = dataList.findIndex(data => data.id === id);
    let editInput = document.getElementById(id);
    editInput.removeAttribute('disabled');
    editInput.focus();

    editInput.classList.add('edit-active');

    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && editInput.classList.contains('edit-active')) {
            e.preventDefault();
            let d = editInput.value;
            dataList[Data].data = d;
            console.log(dataList);
            editInput.classList.remove('edit-active');
            editInput.setAttribute('disabled', '');
        }
    })
}

// Add item Function
const addItem = (data) => {
    if (data !== '') {
        NO_DATA.style.opacity = 0;
        dataList.push({ id: Date.now(), data: data, check: false });
        console.log(dataList);
        viewTODO(dataList);
        MAIN_BAR.value = '';
    }
    else if (dataList.length == 0) {
        NO_DATA.style.opacity = 100;
    }
    else {
        NO_DATA.style.opacity = 0;
    }

    if (!ADD_BUTTON.classList.contains('focus')) ADD_BUTTON.classList.add('focus');
    if (SEARCH_BUTTON.classList.contains('focus')) SEARCH_BUTTON.classList.remove('focus');

    if (!ALL_DATA.classList.contains('active-footer'))
        ALL_DATA.classList.add('active-footer');
    if (ACTIVE_DATA.classList.contains('active-footer'))
        ACTIVE_DATA.classList.remove('active-footer');
    if (COMPLETE_DATA.classList.contains('active-footer'))
        COMPLETE_DATA.classList.remove('active-footer');
}

// Search Function
const searchItem = (dataItem) => {
    DATA_MAIN_CONTAINER.innerHTML = '';
    const data = dataItem.toLowerCase();
    const filterdData = dataList.filter(dataItem => dataItem.data.toLowerCase().includes(data));
    if (filterdData.length != 0) {
        viewTODO(filterdData);
        NO_DATA.style.opacity = 0;
    }
    else if (filterdData.length == 0) {
        NO_DATA.innerHTML = 'NO DATA FOUND';
        NO_DATA.style.opacity = 100;
    }
    else {
        NO_DATA.style.opacity = 0;
    }

    if (!SEARCH_BUTTON.classList.contains('focus')) SEARCH_BUTTON.classList.add('focus');
    if (ADD_BUTTON.classList.contains('focus')) ADD_BUTTON.classList.remove('focus');
}


// Value of main bar will ADD or SEARCH by enter key
MAIN_BAR.addEventListener('keyup', function (e) {
    if (e.key == 'Enter' && ADD_BUTTON.classList.contains('focus')) {
        // e.preventDefault();
        const data = MAIN_BAR.value;
        addItem(data);
    }
    else if (SEARCH_BUTTON.classList.contains('focus')) {
        // e.preventDefault();
        DATA_MAIN_CONTAINER.innerHTML = '';
        const data = MAIN_BAR.value;
        searchItem(data);
    }
});

// TODO Item add onclick of Add button
ADD_BUTTON.addEventListener('click', function (e) {
    e.preventDefault();

    if (dataList.length !== 0) {
        viewTODO(dataList);
    }
    const data = MAIN_BAR.value;
    console.log(data);
    addItem(data);
});

// TODO Item search onclick of Search button
SEARCH_BUTTON.addEventListener('click', function (e) {
    e.preventDefault();

    DATA_MAIN_CONTAINER.innerHTML = '';
    const data = MAIN_BAR.value;
    searchItem(data);
});

// Display all item of TODO
ALL_DATA.addEventListener('click', function (e) {
    e.preventDefault();
    if (!ALL_DATA.classList.contains('active-footer'))
        ALL_DATA.classList.add('active-footer');
    if (ACTIVE_DATA.classList.contains('active-footer'))
        ACTIVE_DATA.classList.remove('active-footer');
    if (COMPLETE_DATA.classList.contains('active-footer'))
        COMPLETE_DATA.classList.remove('active-footer');
    if (dataList.length === 0) {
        NO_DATA.innerHTML = 'ADD NEW TASK ITEM';
        NO_DATA.style.opacity = 100;
        DATA_MAIN_CONTAINER.innerHTML = '';
    }
    else {
        NO_DATA.style.opacity = 0;
        viewTODO(dataList);
    }
});

// Display active item of TODO
ACTIVE_DATA.addEventListener('click', function (e) {
    e.preventDefault();
    if (!ACTIVE_DATA.classList.contains('active-footer'))
        ACTIVE_DATA.classList.add('active-footer');
    if (ALL_DATA.classList.contains('active-footer'))
        ALL_DATA.classList.remove('active-footer');
    if (COMPLETE_DATA.classList.contains('active-footer'))
        COMPLETE_DATA.classList.remove('active-footer');
    const active = dataList.filter(d => d.check == false);
    if (active.length === 0) {
        NO_DATA.innerHTML = 'NO DATA FOUND';
        NO_DATA.style.opacity = 100;
        DATA_MAIN_CONTAINER.innerHTML = '';
    }
    else {
        NO_DATA.style.opacity = 0;
        viewTODO(active);
    }
});

// Display completed item of TODO
COMPLETE_DATA.addEventListener('click', function (e) {
    e.preventDefault();
    if (!COMPLETE_DATA.classList.contains('active-footer'))
        COMPLETE_DATA.classList.add('active-footer');
    if (ALL_DATA.classList.contains('active-footer'))
        ALL_DATA.classList.remove('active-footer');
    if (ACTIVE_DATA.classList.contains('active-footer'))
        ACTIVE_DATA.classList.remove('active-footer');
    const complete = dataList.filter(d => d.check == true);
    if (complete.length === 0) {
        NO_DATA.innerHTML = 'NO DATA FOUND';
        NO_DATA.style.opacity = 100;
        DATA_MAIN_CONTAINER.innerHTML = '';
    }
    else {
        NO_DATA.style.opacity = 0;
        viewTODO(complete);
    }
});

let sort = false;

const sortItem = (value) => {
    if (value == 'A-Z') {
        viewTODO(dataList, !sort, value);
    }
    else if (value == 'Z-A') {
        viewTODO(dataList, !sort, value);
    }
    else if (value == 'Newest') {
        viewTODO(dataList, sort, value);
    }
    else if (value == 'Oldest') {
        viewTODO(dataList, sort, value);
    }
}
// Sort item of TODO
SORT.addEventListener('change', function () {
    sortItem(SORT.value);
});

SORT.addEventListener('click', function () {
    sortItem(SORT.value);
});

// Delete all selected item of TODO FUNCTION
const deleteallSelected = () => {
    if (dataList.filter(d => d.check == true).length != 0) {
        if (confirm("Are you sure for deleting this task ?") == true) {
            DATA_MAIN_CONTAINER.innerHTML = '';
            const x = dataList.filter(d => d.check == false);
            dataList.splice(0);
            console.log(dataList);
            dataList = [].concat(x);
            if (dataList.length === 0) {
                NO_DATA.innerHTML = 'ADD NEW TASK ITEM';
                NO_DATA.style.opacity = 100;
            }
            else {
                viewTODO(dataList);
            }
        }
    }
    else {
        alert('First select the task ;)');
    }
}

// Select all item of TODO FUNCTION
const selectAll = () => {
    dataList.forEach(d => d.check = true);
    if (dataList.length !== 0) {
        viewTODO(dataList);
    }
    else {
        DATA_MAIN_CONTAINER.innerHTML = '';
    }
}

// UnSelect all item of TODO FUNCTION
const unselectAll = () => {
    dataList.forEach((dataItem) => dataItem.check = false);
    if (dataList.length !== 0) {
        viewTODO(dataList);
    }
    else {
        DATA_MAIN_CONTAINER.innerHTML = '';
    }
}

// perform action like deleteAllSelected, selectAll, unselectAll
ACTION.addEventListener('change', function () {
    if (ACTION.value == "Delete All Selected") {
        deleteallSelected();
        ACTION.value = "Action";
    }
    else if (ACTION.value == "Select All") {
        selectAll();
        ACTION.value = "Action";
    }
    else if (ACTION.value == "Unselect All") {
        unselectAll();
        ACTION.value = "Action";
    }
});

// Checked Item function
function checkItem(index) {
    const dataCheck = dataList.findIndex(d => d.id === index);
    dataList[dataCheck].check = !dataList[dataCheck].check;
    const checkInput = document.getElementById(`check-${index}`);
    // const textInput = document.getElementById(index);
    if (checkInput.checked) {
        checkInput.setAttribute('checked', '');
    }
    else {
        checkInput.removeAttribute('checked');
    }

    viewTODO(dataList);
}


/*
 if(checkInput.classList.contains('del'))
            checkInput.classList.remove('del');
    }
*/