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

export default {
  createHeader,
  createLogo,
  createMain,
  createBtns,
  createTable,
  createForm,
  createFooter,
  createRow,
};
