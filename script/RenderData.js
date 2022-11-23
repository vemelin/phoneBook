'use_strict';
export class RenderData {
  constructor(app, title, data) {
    this.$el = document.querySelector(app);
    this.init(title, data);
  }
  createBtns(arr) {
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
  }
  createTable(){
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const tr = document.createElement('tr');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete"></th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
        <th></th>
      </tr>
    `);
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  }
  createForm() {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');
    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class = "close" type="button"></button>
      <h2 class = "form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="firstName">Имя</label>
        <input class="form-input" name="firstName" id="firstName" type="text" />
      </div>
      <div class="form-group">
        <label class="form-label" for="lastName">Фамилия</label>
        <input class="form-input" name="lastName" id="lastName" type="text" />
      </div>
      <div class="form-group">
        <label class="form-label" for="phoneNumber">Тефлфон</label>
        <input class="form-input" name="phoneNumber" id="phoneNumber" type="text" />
      </div>
    `);
    const btns = this.createBtns([
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
    form.append(...btns.btns)
    overlay.append(form);
    return {
      overlay,
      form,
    };
  }
  createLogo(title) {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Phone Book. ${title}`;
    return h1;
  }
  createMain() {
    const main = document.createElement('main');
    const mainContainer = this.createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  }
  createContainer(){
    const container = document.createElement('div')
    container.classList.add('container');
    return container;
  }
  createHeader() {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = this.createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
  }
  buildAppWrapper(title) {
    const app = this.$el;
    const header = this.createHeader();
    const logo = this.createLogo(title);
    const main = this.createMain();
    const btns = this.createBtns([
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
    const table = this.createTable();
    const form = this.createForm();
    const footer = this.createFooter(title);
    header.headerContainer.append(logo);
    main.mainContainer.append(btns.btnWrap);
    app.append(header, main, table, form.overlay, footer);
    return {
      list: table.tbody,
      logo,
      addBtn: btns.btns[0],
      popUp: form.overlay,
      form: form.form,
    };
  }
  createRow({name: firstName, surname: lastName, phone}) {
    const tr = document.createElement('tr');
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
    tdLastName.textContent = lastName;
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
  }
  createFooter(title) {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const container = this.createContainer();
    footer.append(container);
    footer.container = container;
    const p = document.createElement('p');
    p.innerText = `Все права защищены @ ${title}`;
    footer.container.append(p);
    return footer;
  }
  extractData(elem, data) {
    const rowList = data.data.map(this.createRow);
    elem.append(...rowList);
    return rowList;
  }
  onHoverRow(rowList, logo) {
    const titlePlaceholder = logo.textContent;
    rowList.forEach(item => {
      item.addEventListener('mouseenter', () => {
        logo.textContent = item.phoneLink.textContent;
      });
      item.addEventListener('mouseleave', () => {
        logo.textContent = titlePlaceholder;
      });
    });
  }
  init(title, data) {
    const phonebook = this.buildAppWrapper(title);
    const { list, logo, addBtn, popUp, form } = phonebook;
    const rowList = this.extractData(list, data);
    this.onHoverRow(rowList, logo);
    document.addEventListener('click', e => {
      let target = e.target;
      if (target.textContent === 'Добавить') {
        popUp.classList.add('is-visible');
      } if (target.matches('.form-overlay')) {
        popUp.classList.remove('is-visible');
      } if (target.matches('.close')) {
        popUp.classList.remove('is-visible');
      } if (target.textContent === 'Отмена') {
        e.preventDefault();
        popUp.classList.remove('is-visible');
      } if (target.type === 'submit') {
        e.preventDefault();
      } if (target.matches('.edit-icon')) {
        popUp.classList.add('is-visible');
        //Start function to edit every note
        const title = document.querySelector('.form-title').textContent = 'Обновить';
      }
    });
  }
}
