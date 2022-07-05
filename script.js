'use strict';

const dataList = [];
const active = [];
const deactive = [];

const mainBar = document.querySelector('.bar');
const addButton = document.querySelector('.add-task');
const searchButton = document.querySelector('.search-task');
const dataMainContainer = document.querySelector('.data-main');
const noData = document.querySelector('.no-data');
const editButton = document.querySelector('.edit');
const deleteButton = document.querySelector('.delete');
const value = document.querySelector('span');
// const deleteAll = document.querySelector('.delete-all');
const allData = document.querySelector('.all');
const activeData = document.querySelector('.active');
const completeData = document.querySelector('.complete');
const checked = document.querySelector('.check');



if (dataList.length === 0) {
    noData.style.opacity = 100;
}
dataMainContainer.innerHTML = '';

const displayData = function (data, sort = false) {
    dataMainContainer.innerHTML = '';

    const dat = sort ? data.slice().sort((a, b) => a - b) : data;

    dat.forEach((mov, i) => {
        const text = `<div class="data-line">
      <div class="data">
          <form>
              <input type="checkbox" name="chek" value="${mov}" class="check"> ${mov}
          </form>
      </div>
      <div class="data-button">
          <button class="edit edit-${i}"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete delete-${i}"><i class="fa-solid fa-delete-left"></i></button>
      </div>
  </div>`;
        dataMainContainer.insertAdjacentHTML('beforeend', text);
    });
};

addButton.addEventListener('click', function (e) {
    e.preventDefault();
    const data = mainBar.value;
    if (data !== '') {
        noData.style.opacity = 0;
        dataList.push({data: data, check:false});
        console.log(dataList);
        displayData(dataList.map(d=>d.data));
        mainBar.value = '';
    }
    else if(dataList.length==0) {
        noData.style.opacity = 100;
    }
    else
    {
        noData.style.opacity = 0;
    }

    if (!addButton.classList.contains('focus')) addButton.classList.add('focus');
    if (searchButton.classList.contains('focus')) searchButton.classList.remove('focus');
});


searchButton.addEventListener('click', function (e) {
    e.preventDefault();

    dataMainContainer.innerHTML = '';
    const data = mainBar.value;
    const filterdData = dataList.map(d=>d.data).filter(mov => mov.toLowerCase().includes(data.toLowerCase()));
    if (filterdData.length != 0) {
        displayData(filterdData);
    }
    else if(filterdData.length==0) {
        noData.style.opacity = 100;
    }
    else
    {
        noData.style.opacity = 0;
    }

    if (!searchButton.classList.contains('focus')) searchButton.classList.add('focus');
    if (addButton.classList.contains('focus')) addButton.classList.remove('focus');
});

allData.addEventListener('click', function(e) {
    e.preventDefault();
    displayData(dataList);
});

checked.addEventListener('change',function(e){
    e.preventDefault();
    console.log('checked');
});

activeData.addEventListener('click', function(e){
    e.preventDefault();
    const active = dataList.filter(d=>d.check==true);
    console.log(active);
});


