(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use_strict';

const {
  modalControl,
  removeControl,
  formControl,
} = require('./modules/control.js');

const {
  renderPhoneBook,
  renderContacts,
} = require('./modules/render.js');

const {
  getStorage,
} = require('./modules/serviceStorage.js');

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = getStorage();
    const {
      list,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);

    renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    removeControl(btnDel, list);
    formControl(form, list, closeModal);
  };
  window.phoneBookInit = init;
}

},{"./modules/control.js":2,"./modules/render.js":4,"./modules/serviceStorage.js":5}],2:[function(require,module,exports){
'use strict';

const {
  sortRows,
} = require('./sort.js');

const {
  createRow,
} = require('./createElements.js');

const {
  addContactData,
  removeContact,
} = require('./serviceStorage.js');

const modalControl = (btnAdd, formOverlay) => {
  document.addEventListener('click', e => {
    sortRows(e);
    if (e.target.matches('.edit-icon')) {
      openModal();
      // Create function to edit every note
      document.querySelector('.form-title').textContent = 'Обновить';
    }
  });
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };
  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };
  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.closest('.close')) {
      closeModal();
    }
  });
  return {closeModal};
};

const removeControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        console.log(target.closest('.contact'));
        target.closest('.contact').remove();
        removeContact(target.dataset.phone);
      }
    });
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);
    addContactData(newContact);
    form.reset();
    closeModal();
  });
};

module.exports = {
  modalControl,
  removeControl,
  addContactPage,
  formControl,
};

},{"./createElements.js":3,"./serviceStorage.js":5,"./sort.js":6}],3:[function(require,module,exports){
'use strict';

const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
};

const createHeader = () => {
  const header = document.createElement('div');
  header.classList.add('header');
  const headerContainer = createContainer();
  header.append(headerContainer);
  header.headerContainer = headerContainer;
  return header;
};

const createLogo = title => {
  const h1 = document.createElement('h1');
  h1.classList.add('logo');
  h1.textContent = `Phone Book. ${title}`;
  return h1;
};

const createMain = () => {
  const main = document.createElement('main');
  const mainContainer = createContainer();
  main.append(mainContainer);
  main.mainContainer = mainContainer;
  return main;
};

const createBtns = arr => {
  const btnWrap = document.createElement('div');
  btnWrap.classList.add('btn-wrapper');
  const btns = arr.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;
    return button;
  });
  btnWrap.append(...btns);
  return {
    btnWrap,
    btns,
  };
};

const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');
  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
  <tr>
    <th class="delete"></th>
    <th data-type="string">Имя</th>
    <th data-type="string">Фамилия</th>
    <th>Телефон</th>
    <th></th>
  </tr>
`);
  const tbody = document.createElement('tbody');
  table.append(thead, tbody);
  table.tbody = tbody;
  return table;
};

const createForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay');
  const form = document.createElement('form');
  form.classList.add('form');
  form.insertAdjacentHTML('beforeend', `
  <button class = "close" type="button"></button>
  <h2 class = "form-title">Добавить контакт</h2>
  <div class="form-group">
    <label class="form-label" for="name">Имя</label>
    <input class="form-input" name="name" id="name" type="text" />
  </div>
  <div class="form-group">
    <label class="form-label" for="surname">Фамилия</label>
    <input class="form-input" name="surname" id="surname" type="text" />
  </div>
  <div class="form-group">
    <label class="form-label" for="phone">Тефлфон</label>
    <input class="form-input" name="phone" id="phone" type="text" />
  </div>
`);
  const btns = createBtns([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'rest',
      text: 'Отмена',
    },
  ]);
  form.append(...btns.btns);
  overlay.append(form);
  return {
    overlay,
    form,
  };
};

const createFooter = title => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  const container = createContainer();
  footer.append(container);
  footer.container = container;
  const p = document.createElement('p');
  p.innerText = `Все права защищены @ ${title}`;
  footer.container.append(p);
  return footer;
};

const createRow = ({name: firstName, surname, phone}) => {
  const tr = document.createElement('tr');
  tr.classList.add('contact');
  const tdDel = document.createElement('td');
  const tdFirstName = document.createElement('td');
  const tdLastName = document.createElement('td');
  const tdPhone = document.createElement('td');
  const cta = document.createElement('td');
  cta.setAttribute('align', 'right');
  const phoneLink = document.createElement('a');
  phoneLink.href = `tel:${phone}`;
  phoneLink.textContent = phone;
  tr.phoneLink = phoneLink;
  tdFirstName.textContent = firstName;
  tdLastName.textContent = surname;
  const btnRemove = document.createElement('button');
  btnRemove.classList.add('del-icon');
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-icon');
  tdDel.classList.add('delete');
  tdDel.append(btnRemove);
  tdPhone.append(phoneLink);
  cta.append(editBtn);
  tr.append(tdDel, tdFirstName, tdLastName, tdPhone, cta);
  return tr;
};

module.exports = {
  createHeader,
  createLogo,
  createMain,
  createBtns,
  createTable,
  createForm,
  createFooter,
  createRow,
};

},{}],4:[function(require,module,exports){
'use strict';

const {
  createHeader,
  createLogo,
  createMain,
  createBtns,
  createTable,
  createForm,
  createFooter,
  createRow,
} = require('./createElements.js');

const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const btns = createBtns([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const {form, overlay} = createForm();
  const footer = createFooter(title);
  header.headerContainer.append(logo);
  main.mainContainer.append(btns.btnWrap, table, overlay);
  app.append(header, main, footer);
  return {
    list: table.tbody,
    logo,
    btnAdd: btns.btns[0],
    btnDel: btns.btns[1],
    formOverlay: overlay,
    form,
  };
};

const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};

module.exports = {
  renderPhoneBook,
  renderContacts,
};

},{"./createElements.js":3}],5:[function(require,module,exports){
'use strict';

const getStorage = () => (
  localStorage.getItem('phonebook') ?
  JSON.parse(localStorage.getItem('phonebook')) : []
);

const setStorage = data => {
  localStorage.setItem('phonebook', JSON.stringify(data));
};

const addContactData = contact => {
  const data = getStorage('phonebook');
  data.push(contact);
  setStorage(data);
};

const removeContact = (phone) => {
  const dataStorage = getStorage();
  const temp = dataStorage.filter(item => item.phone !== phone);
  localStorage.setItem('phonebook', JSON.stringify(temp));
};

module.exports = {
  getStorage,
  setStorage,
  addContactData,
  removeContact,
};

},{}],6:[function(require,module,exports){
'use strict';

const {
  getStorage,
  setStorage,
} = require('./serviceStorage.js');

const sortGrid = (colNum, type) => {
  const grid = document.querySelector('.table');
  const tbody = grid.querySelector('tbody');
  const rowsArray = Array.from(tbody.rows);
  let compare;
  if (colNum === 1) {
    compare = function(rowA, rowB) {
      return rowA.cells.innerHTML > rowB.cells.innerHTML ? 1 : -1;
    };
  }
  if (colNum === 2) {
    compare = function(rowA, rowB) {
      return rowA.cells.innerHTML > rowB.cells.innerHTML ? 1 : -1;
    };
  }
  const data = getStorage();
  const firstNameColumn = document.querySelectorAll('thead tr');
  if (firstNameColumn[0].classList.contains('firstCol')) {
    data.sort((a, b) => (a.surname < b.surname ? 1 : -1));
    firstNameColumn[0].classList.remove('firstCol');
  } else {
    data.sort((a, b) => (a.surname > b.surname ? 1 : -1));
    firstNameColumn[0].classList.add('firstCol');
  }
  setStorage(data);
  data.map(i => console.log(i));

  rowsArray.sort(compare);
  tbody.append(...rowsArray);
};
const sortRows = e => {
  if (e.target.tagName !== 'TH') return;
  const th = e.target;
  sortGrid(th.cellIndex, th.dataset.type);
};

module.exports = {
  sortGrid,
  sortRows,
};

},{"./serviceStorage.js":5}]},{},[1]);
