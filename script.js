'use strict';

let dataList = [];

const mainBar = document.querySelector('.bar');
const addButton = document.querySelector('.add-task');
const searchButton = document.querySelector('.search-task');
const dataMainContainer = document.querySelector('.data-main');
const noData = document.querySelector('.no-data');
const editButton = document.querySelector('.edit');
const deleteButton = document.querySelector('.delete');
const value = document.querySelector('span');
const allData = document.querySelector('.all');
const activeData = document.querySelector('.active');
const completeData = document.querySelector('.complete');
const checked = document.querySelector('.check');
const action = document.querySelector("#action");
const Sort = document.querySelector('#sort');
const bodyPart = document.querySelector('body');
const deleteAll = document.querySelector('.deleteAll');
const selectAll = document.querySelector('.selectAll');
const unselectAll = document.querySelector('.unselectAll');



if (dataList.length === 0) {
    noData.style.opacity = 100;
}
dataMainContainer.innerHTML = '';

const displayData = function (dataa, sort = false, value = 'Oldest') {
    dataMainContainer.innerHTML = '';
    let d = sort ? dataa.slice().sort(function (a, b) {
        if (a.data < b.data) {
            return -1;
        }
        if (a.data > a.data) {
            return 1;
        }
        return 0;
    }).sort((a, b) => a.data.length - b.data.length) : dataa;

    d.forEach(function (mov, i) {
        let ch = mov.check == true ? 'checked' : 'a';
        const text = `<div class="data-line">
      <div class="data">
              <input type="checkbox" name="chek" value="${mov.data}" class="check" id="check-${mov.id}" onchange=checkID(${mov.id}) ${ch}> 
              <input type="text" id="${mov.id}" class='textadd' value=${mov.data} disabled>
      </div>
      <div class="data-button">
          <button class="edit edit-close" onclick=editID(${mov.id})><i class="fa-solid fa-pen-to-square" title="Edit button"></i></button>
          <button class="delete" onclick=deleteID(${i})><i class="fa-solid fa-delete-left"title="Delete button"></i></button>
      </div>
  </div>
  <hr style="margin: 15px 0;">`;
        if (sort) {
            if (value == 'A-Z')
                dataMainContainer.insertAdjacentHTML('beforeend', text);
            else
                dataMainContainer.insertAdjacentHTML('afterbegin', text);
        }
        else {
            if (value == 'Newest')
                dataMainContainer.insertAdjacentHTML('afterbegin', text);
            else
                dataMainContainer.insertAdjacentHTML('beforeend', text);
        }
    });
};

function deleteID(id) {
    if (confirm("Are you sure for deleting this task ?") == true) {
        dataList.splice(id, 1);
        displayData(dataList);
        console.log(dataList);
        if (dataList.length == 0) {
            noData.style.opacity = 100;
        }
        setTimeout(alert("Your task is deleted :)"),1000);
    }
};


function editID(id) {
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

const add = (data) => {
    if (data !== '') {
        noData.style.opacity = 0;
        dataList.push({ id: Date.now(), data: data, check: false });
        console.log(dataList);
        displayData(dataList);
        mainBar.value = '';
    }
    else if (dataList.length == 0) {
        noData.style.opacity = 100;
    }
    else {
        noData.style.opacity = 0;
    }

    if (!addButton.classList.contains('focus')) addButton.classList.add('focus');
    if (searchButton.classList.contains('focus')) searchButton.classList.remove('focus');
}

const search = (data) => {
    const filterdData = dataList.filter(mov => mov.data.toLowerCase().includes(data.toLowerCase()));
    if (filterdData.length != 0) {
        displayData(filterdData);
        mainBar.value = '';
    }
    else if (filterdData.length == 0) {
        noData.innerHTML = 'NO DATA FOUND';
        noData.style.opacity = 100;
        displayData(filterdData);
    }
    else {
        noData.style.opacity = 0;
    }
    mainBar.value = '';

    if (!searchButton.classList.contains('focus')) searchButton.classList.add('focus');
    if (addButton.classList.contains('focus')) addButton.classList.remove('focus');
}


mainBar.addEventListener('keypress', function (e) {
    if (e.key == 'Enter' && addButton.classList.contains('focus')) {
        e.preventDefault();
        const data = mainBar.value;
        add(data);
    }
    else if (e.key == 'Enter' && searchButton.classList.contains('focus')) {
        e.preventDefault();

        dataMainContainer.innerHTML = '';
        const data = mainBar.value;
        search(data);
    }
});


addButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (dataList.length !== 0) {
        displayData(dataList);
    }
    const data = mainBar.value;
    add(data);
});


searchButton.addEventListener('click', function (e) {
    e.preventDefault();

    dataMainContainer.innerHTML = '';
    const data = mainBar.value;
    search(data);
});

mainBar.addEventListener('change', function (e) {
    console.log('mainbar value changed');
});

allData.addEventListener('click', function (e) {
    e.preventDefault();
    displayData(dataList);
});

activeData.addEventListener('click', function (e) {
    e.preventDefault();
    const active = dataList.filter(d => d.check == false);
    if (active.length === 0) { 
        noData.innerHTML = 'NO DATA FOUND';
        noData.style.opacity = 100;
        dataMainContainer.innerHTML = '';
    }
    else {
        noData.style.opacity = 0;
        displayData(active);
    }
});

completeData.addEventListener('click', function (e) {
    e.preventDefault();
    const complete = dataList.filter(d => d.check == true);
    if (complete.length === 0) {
        noData.innerHTML = 'NO DATA FOUND';
        noData.style.opacity = 100;
        dataMainContainer.innerHTML = '';
    }
    else {
        noData.style.opacity = 0;
        displayData(complete);
    }
});

let sort = false;

Sort.addEventListener('change', function () {
    if (Sort.value == 'A-Z') {
        displayData(dataList, !sort, Sort.value);
        Sort.value = 'Sort-List';
    }
    else if (Sort.value == 'Z-A') {
        displayData(dataList, !sort, Sort.value);
        Sort.value = 'Sort-List';
    }
    else if (Sort.value == 'Newest') {
        displayData(dataList, sort, Sort.value);
        Sort.value = 'Sort-List';
    }
    else if (Sort.value == 'Oldest') {
        displayData(dataList, sort, Sort.value);
        Sort.value = 'Sort-List';
    }
});

const deleteallSelected = () => {
    if (dataList.filter(d => d.check == true).length != 0) {
        if (confirm("Are you sure for deleting this task ?") == true) {
            dataMainContainer.innerHTML = '';
            const x = dataList.filter(d => d.check == false);
            console.log('x', x);
            dataList.splice(0);
            console.log(dataList);
            dataList = [].concat(x);
            if (dataList.length === 0) {
                noData.innerHTML = 'ADD NEW TASK ITEM';
                noData.style.opacity = 100;
            }
            else {
                displayData(dataList);
            }
        }
    }
    else{
        alert('First select the task ;)');
    }
}

const selectAllF = () => {
    dataList.forEach(d => d.check = true);
    if (dataList.length !== 0) {
        displayData(dataList);
    }
    else {
        dataMainContainer.innerHTML = '';
    }
}

const unselectAllF = () => {
    dataList.forEach((mov) => mov.check = false);
    if (dataList.length !== 0) {
        displayData(dataList);
    }
    else {
        dataMainContainer.innerHTML = '';
    }
}

action.addEventListener('change', function () {
    if (action.value == "Delete All Selected") {
        deleteallSelected();
        action.value = "Action";
    }
    else if (action.value == "Select All") {
        selectAllF();
        action.value = "Action";
    }
    else if (action.value == "Unselect All") {
        unselectAllF();
        action.value = "Action";
    }
});





function checkID(index) {
    const dataCheck = dataList.findIndex(d => d.id === index);
    dataList[dataCheck].check = !dataList[dataCheck].check;
    const checkInput = document.getElementById(`check-${index}`);
    //checkInput.checked = true;
    if (checkInput.checked)
        checkInput.setAttribute('checked', '');
    else
        checkInput.removeAttribute('checked');

    displayData(dataList);
}
/*
function validateInterest(evt)
{
    evt.preventDefault();
    var mininterest = document.querySelectorAll("[name=mininterest]");
    var count = 0,
    interests = [];
    for (var i = 0; i < mininterest.length; i++)
    {
        if (mininterest[i].checked) {
            count++;
            interests.push(mininterest[i].value);
        }
    } //This is meant to mimic where you would make a fetch POST call
    if (count > 1) {
        addToLog("enough interests selected: " + interests);
    }
    else {
        addToLog("**NOT ENOUGH** interests selected: " + interests);
    }
    return false;
}

action.addEventListener("click", function() {
    var options = action.querySelectorAll("option");
    var count = options.length;
    if(typeof(count) === "undefined" || count < 2)
    {
        addActivityItem();
    }
});
*/


 // editInput.value = Data;


    // if (editButton.classList.contains('edit-active')) {
    //     console.log('EDIT');
    // }

    // document.addEventListener('keypress', function (e) {
    //     if (e.key === 'Enter' && editButton.classList.contains('edit-active')) {

    //         e.preventDefault();
            // d = editInput.value;
            // dataList.splice(id, 1);
            // dataList.push({ id: id, data: d, check: false });
            // editButton.classList.remove('edit-active');
    //     }
    // });