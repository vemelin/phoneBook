import createElement from './createElements.js';
const {
  createHeader,
  createLogo,
  createMain,
  createBtns,
  createTable,
  createForm,
  createFooter,
  createRow,
} = createElement;

export const renderPhoneBook = (app, title) => {
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

export const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};
