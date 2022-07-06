'use strict';

const dataList = [];

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
const span = document.querySelector('span');


if (dataList.length === 0) {
    noData.style.opacity = 100;
}
dataMainContainer.innerHTML = '';

const displayData = function (dataa, sort = false, value = 'Oldest') {
    dataMainContainer.innerHTML = '';


    const data = dataa.map(d => d.data);

    const d = sort ? data.slice().sort() : data;

    d.forEach((mov, i) => {
        const text = `<div class="data-line">
      <div class="data">
              <input type="checkbox" name="chek" value="${mov}" class="check" id="check-${i}" onchange=checkID(${i})> 
              <span><input type="text" id="${i}" class='textadd' value=${mov} disabled></span>
      </div>
      <div class="data-button">
          <button class="edit edit-close" onclick=editID(${i})><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete" onclick=deleteID(${i})><i class="fa-solid fa-delete-left"></i></button>
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
    dataList.splice(id, 1);
    displayData(dataList);
    console.log(dataList);
    if (dataList.length == 0) {
        noData.style.opacity = 100;
    }
};


function editID(id) {
    const Data = dataList.findIndex(data => data.id === id);
    console.log(Data);
    let editInput = document.getElementById(id);
    editInput.removeAttribute('disabled');
    console.log(editInput);
    editInput.focus();

    editInput.classList.add('edit-active');
    console.log(editInput.classList.contains('edit-active'));

    document.addEventListener('keypress', function(e) {
        if(e.key==='Enter' && editInput.classList.contains('edit-active'))
        {
            e.preventDefault();
            let d = editInput.value;
            dataList[Data].data = d;
            console.log(dataList);
            editInput.classList.remove('edit-active');
            editInput.setAttribute('disabled','');
        }
    })
}

const add = (data) => {
    if (data !== '') {
        noData.style.opacity = 0;
        dataList.push({ id: dataList.length, data: data, check: false });
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
        noData.style.opacity = 100;
        displayData(filterdData);
    }
    else {
        noData.style.opacity = 0;
    }

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
        const data = mainBar.value;
        search(data);

        const filterdData = dataList.filter(mov => mov.data.toLowerCase().includes(data.toLowerCase()));
    }
});


addButton.addEventListener('click', function (e) {
    e.preventDefault();
    const data = mainBar.value;
    add(data);
});


searchButton.addEventListener('click', function (e) {
    e.preventDefault();

    dataMainContainer.innerHTML = '';
    const data = mainBar.value;
    search(data);
});

allData.addEventListener('click', function (e) {
    e.preventDefault();
    displayData(dataList);
});

// checked.addEventListener('change',function(e){
//     e.preventDefault();
//     console.log('checked');
// });

activeData.addEventListener('click', function (e) {
    e.preventDefault();
    const active = dataList.filter(d => d.check == true);
    console.log(active);
});

action.addEventListener('change', function () {
    if (action.value == "Delete All Selected") {
        addActivityItem();
    }
    else if (action.value == "Select All") {
        addActivityItem();
    }
    else {
        addActivityItem();
    }
});

let sort = false;

const Sorted = () => {
    if (Sort.value == 'A-Z') {
        displayData(dataList, !sort, Sort.value);
    }
    else if (Sort.value == 'Z-A') {
        displayData(dataList, !sort, Sort.value);
    }
    else if (Sort.value == 'Newest') {
        displayData(dataList, sort, Sort.value);
    }
    else {
        displayData(dataList, sort, Sort.value);
    }
}

Sort.addEventListener('change', function () {
    Sorted();
});

Sort.addEventListener('click', function () {
    Sorted();
});


function addActivityItem() {
    // ... Code to add item here
    console.log(action.value);
}

function checkID(index) {
    const dataCheck = dataList.findIndex(d => d.id === index);
    dataList[dataCheck].check=true;
    // document.getElementById(`check-${index}`).checked = "checked";

}



/*

function editItem(event) {
    // console.log(Data);
    let item = event.target.innerHTML;
    let itemInput = document.createElement('input');
    itemInput.type='text';
    itemInput.value=item;
    itemInput.addEventListener('keypress',saveItem);
    itemInput.addEventListener('click',saveItem);
    event.target.parentNode.prepend(itemInput);
    event.target.remove();
    itemInput.select();
}

function saveItem(event) {
    let inputValue = event.target.value;
    if(event.target.value.length > 0 && (event.keyCode === 13 || event.type === 'click')) {
        let span = document.createElement('span');
        span.addEventListener('dblclick', editItem);
        span.textContent = event.target.value;
        event.target.parentNode.prepend(span);
        event.target.remove();
    }
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