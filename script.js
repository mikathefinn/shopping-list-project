// create variables in the global scope so they are accessible later
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');


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
    e.target.parentElement.parentElement.remove();
    //target parent element's parent, the li
  }
};

// Event listeners

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
