export const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

// eslint-disable-next-line max-len
const setStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const addContactData = contact => {
  const data = getStorage('phonebook');
  data.push(contact);
  setStorage('phonebook', data);
};

const removeContact = phone => {
  const dataStorage = getStorage('phonebook');
  const temp = dataStorage.filter(item => item.phone !== phone);
  localStorage.setItem('phonebook', JSON.stringify(temp));
};

export default {
  getStorage,
  setStorage,
  addContactData,
  removeContact,
};
