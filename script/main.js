import {getStorage as pullDataFrom} from './modules/serviceStorage.js';
import {renderPhoneBook, renderContacts} from './modules/render.js';
import * as control from './modules/control.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = pullDataFrom('phonebook');
    const {
      list,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);

    renderContacts(list, data);
    const {closeModal} = control.modalControl(btnAdd, formOverlay);
    control.removeControl(btnDel, list);
    control.formControl(form, list, closeModal);
  };
  window.phoneBookInit = init;
}
