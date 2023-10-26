// create variables in the global scope so they are accessible later
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

const addItem = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  //Validate input to make sure something has been added before submitting
  if (newItem === '') {
    alert('You silly cunt, please add an item.');
    return;
  }
  // Create a list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  console.log(li);

  const button = createButton('remove-item btn-link text-red');
  //calls createButton func, passes classes to it, which in turn calls createIcon
  //function and passes icon's classes to it.
  li.appendChild(button);
  // append button to li
  console.log(li);
  itemList.appendChild(li);
  // append li to the itemList to add it to the DOM

  checkUI();
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
const removeItem = (e) => {
  //only fire off when clicking something that has a parent that's got a class
  //'remove-item'
  //in html you can see that the icon has a parent with 'remove-item' class ie. the button
  if (e.target.parentElement.classList.contains('remove-item')) {
    console.log('click');
    if (
      confirm(
        `Are you sure you want to remove ${e.target.parentElement.parentElement.textContent} form the list?`
      )
    ) {
      e.target.parentElement.parentElement.remove();
    }
    //target parent element's parent, the li
  }
  checkUI();
};

const clearItems = (e) => {
  while (itemList.firstChild) {
    //as long as itemList.firstChild is true, remove firstChild
    itemList.firstChild.remove();
  }
  checkUI();
};

const filterItems = (e) => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  console.log(text);

  items.forEach(function (item) {
    if (!item.textContent.toLowerCase().includes(text)) {
      item.style.display = 'none';
    } else {
      item.style.display = 'block';
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

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
// check items length when loading the page
