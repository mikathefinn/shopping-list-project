// create variables in the global scope so they are accessible later
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const addButton = itemForm.querySelector('button');
let isEditMode = false;

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  //get items from local storage, loop through them and add them to DOM
  checkUI();
};

const onAddItemSubmit = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  //Validate input to make sure something has been added before submitting
  if (newItem === '') {
    alert('You silly cunt, please add an item.');
    return;
  }
  addItemToDOM(newItem);
  //create item DOM element

  addItemToStorage(newItem);
  //Add item to storage
  checkUI();
};

const addItemToDOM = (item) => {
  // Create a list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  //calls createButton func, passes classes to it, which in turn calls createIcon
  //function and passes icon's classes to it.
  li.appendChild(button);
  // append button to li
  console.log(li);
  itemList.appendChild(li);
  // append li to the itemList to add it to the DOM

  itemInput.value = '';
  //clear the input value to remove the previous entry from the form
};

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};
const addItemToStorage = (item) => {
  console.log(item);
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);
  //push new item (ie. from the input field that is typed in) to the array
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  // set items to local storage after stringifying the array
  //local storage can only story strings in key-value pairs
};

const getItemsFromStorage = () => {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
    // check to see if local storage has any items in it, if not, set
    //itemsFromStorage to an empty array ready to take in more data
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    //if there is something in local storage, pull it out and parse it into objects
    //that are placed in itemsFromStorage array
  }
  return itemsFromStorage;
};

const onClickItem = (e) => {
  //only fire off when clicking something that has a parent that's got a class
  //'remove-item'
  //in html you can see that the icon has a parent with 'remove-item' class ie. the button
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
    //target parent element's parent, the li and pass it to removeItem
  } else {
    console.log(1);
    setItemToEdit(e.target);
  }
};

const setItemToEdit = (itemToEdit) => {
  isEditMode = true;

  itemList.querySelectorAll('li').forEach((i) => i.classList.remove('item-edit'));
// remove the item-edit style from all li elements (before adding styles to the selected one)

  itemToEdit.classList.add('item-edit');
  addButton.classList.add('button-edit');
  addButton.innerHTML = '<i class="fa-solid fa-pen"></i> Edit item';
  // add styles to button and li
  itemInput.value = itemToEdit.textContent;
  //change the input text of the form to the one being edited
};

const removeItem = (item) => {
  if (
    confirm(
      `Are you sure you want to remove ${item.textContent} form the list?`
    )
  ) {
    item.remove();
    // remove item from DOM

    removeItemFromStorage(item.textContent);
  }
  checkUI();
};
const removeItemFromStorage = (itemToRemove) => {
  let itemsFromStorage = getItemsFromStorage();
  //returns an array
  console.log(itemsFromStorage);

  //Filter out item to be removed from the array
  itemsFromStorage = itemsFromStorage.filter((i) => i !== itemToRemove);

  // update to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};
const clearItems = (e) => {
  while (itemList.firstChild) {
    //as long as itemList.firstChild is true, remove firstChild
    itemList.firstChild.remove();
  }

  //Clear from local storage
  localStorage.removeItem('items');
  checkUI();
};

const filterItems = (e) => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  console.log(text);

  items.forEach((item) => {
    if (!item.textContent.toLowerCase().includes(text)) {
      item.style.display = 'none';
    } else {
      item.style.display = 'flex';
    }
  });
};

const checkUI = () => {
  const items = itemList.querySelectorAll('li');
  // items has to be declared inside the function, otherwise it won't
  // update the nodelist length
  //  REMEMBER TO ADD checkUI TO FUNCTIONS THAT CHANGE THE NUMBER OF ITEMS

  //remove ClearAll button and Filter field if no items displayed
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
};

// Event listeners

itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
// check items length when loading the page
document.addEventListener('DOMContentLoaded', displayItems);
//when DOM loads, displayItems
