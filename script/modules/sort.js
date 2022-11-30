import dataStorage from './serviceStorage.js';

const {
  getStorage,
  setStorage,
} = dataStorage;

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
  const data = getStorage('phonebook');
  const firstNameColumn = document.querySelectorAll('thead tr');
  if (firstNameColumn[0].classList.contains('firstCol')) {
    data.sort((a, b) => (a.surname < b.surname ? 1 : -1));
    firstNameColumn[0].classList.remove('firstCol');
  } else {
    data.sort((a, b) => (a.surname > b.surname ? 1 : -1));
    firstNameColumn[0].classList.add('firstCol');
  }
  setStorage('phonebook', data);
  rowsArray.sort(compare);
  tbody.append(...rowsArray);
};
const sortRows = e => {
  if (e.target.tagName !== 'TH') return;
  const th = e.target;
  sortGrid(th.cellIndex, th.dataset.type);
};

export default {
  sortGrid,
  sortRows,
};
