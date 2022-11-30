import sort from './sort.js';
const {sortRows} = sort;
import createElement from './createElements.js';
const {createRow} = createElement;
import serviceStorage from './serviceStorage.js';
const {addContactData, removeContact} = serviceStorage;

export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };
  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };
  btnAdd.addEventListener('click', openModal);

  document.addEventListener('click', e => {
    sortRows(e);
    if (e.target.matches('.edit-icon')) {
      openModal();
      // Create function to edit every note
      document.querySelector('.form-title').textContent = 'Обновить';
    }
  });

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.closest('.close')) {
      closeModal();
    }
  });
  return {closeModal};
};

export const removeControl = (btnDel, list) => {
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

export const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

export const formControl = (form, list, closeModal) => {
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

// export default {
//   modalControl,
//   removeControl,
//   addContactPage,
//   formControl,
// };
