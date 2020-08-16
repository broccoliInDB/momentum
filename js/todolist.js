const PENDING_LIST = "pendingList";
const FINISHED_LIST = "finishedList";
const todoForm = document.querySelector(".todoFormJs");
const todoInput = todoForm.querySelector(".todoInputJs");
const pending = todoForm.querySelector(".pending");
const finished = todoForm.querySelector(".finished");

const getLocalStorageItemList = (type) => {
  const result = localStorage.getItem(type) ? JSON.parse(localStorage.getItem(type)) : []
  return result;
};

const deleteLocalStorageItem = (type, id) => {
  const todoList = getLocalStorageItemList(type).filter(item => item.id !== parseInt(id))
  localStorage.setItem(type, JSON.stringify(todoList))
}

const updateLocalStorageItem = (type, id) => {
  const pendingList = getLocalStorageItemList(PENDING_LIST)
  const finishedList = getLocalStorageItemList(FINISHED_LIST)
  if (type === PENDING_LIST) {
    const index = pendingList.findIndex(item => item.id === parseInt(id))
    localStorage.setItem(FINISHED_LIST, JSON.stringify([...finishedList, ...pendingList.splice(index, 1)]))
    localStorage.setItem(PENDING_LIST, JSON.stringify(pendingList))
  } else {
    const index = finishedList.findIndex(item => item.id === parseInt(id))
    localStorage.setItem(PENDING_LIST, JSON.stringify(pendingList.concat(finishedList.splice(index, 1))))
    localStorage.setItem(FINISHED_LIST, JSON.stringify(finishedList))
  }
}

const updateUITodoList = (type, li) => {
  if (type === PENDING_LIST) {
    pending.removeChild(li)
    finished.appendChild(li)
  } else {
    finished.removeChild(li)
    pending.appendChild(li)
  }
}

const createTodoItem = (type, item) => {
  const li = document.createElement("li");
  li.dataset.id = item.id
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const span = document.createElement('span')
  span.innerText = item.text;
  const closeBtn = document.createElement("button");
  closeBtn.type = 'button';
  closeBtn.innerText = "❌";
  if (type === PENDING_LIST) {
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(closeBtn);
  } else {
    checkbox.setAttribute("checked", true);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(closeBtn);
  }
  return li
}

const addPendingItem = (value) => {
  const pendingList = getLocalStorageItemList(PENDING_LIST);
  const item = {
    id: new Date().getTime(),
    text: value
  }
  pendingList.push(item);
  localStorage.setItem(PENDING_LIST, JSON.stringify(pendingList));
  const li = createTodoItem(PENDING_LIST, item)
  pending.appendChild(li)
};


const createUITodoItemList = (type, valueList) => {
  if (type !== PENDING_LIST && type !== FINISHED_LIST) return;
  const fragment = document.createDocumentFragment();

  for (let value of valueList) {
    fragment.appendChild(createTodoItem(type, value))
  }
  return fragment;
};

const setPendingList = (pendingList) => {
  if (!pendingList) return;
  const fragment = createUITodoItemList(PENDING_LIST, pendingList);
  pending.appendChild(fragment);
};

const setFinishedList = (finishedList) => {
  if (!finishedList) return;
  const fragment = createUITodoItemList(FINISHED_LIST, finishedList);
  finished.appendChild(fragment);
};

const removeTodoItem = (type, li) => {
  if (type === PENDING_LIST) {
    pending.removeChild(li)
    deleteLocalStorageItem(type, li.getAttribute('data-id'))
  } else {
    finished.removeChild(li)
    deleteLocalStorageItem(type, li.getAttribute('data-id'))
  }
}

const moveTodoItem = (type, li) => {
  updateUITodoList(type, li)
  updateLocalStorageItem(type, li.getAttribute('data-id'))
}

// Handlers
const submitHandler = (evt) => {
  evt.preventDefault();
  if (todoInput.value) {
    addPendingItem(todoInput.value);
  }
  todoInput.value = "";
};

const clickHandler = (evt) => {
  const target = evt.target
  const button = target.closest('button')
  if (!button) return
  const type = target.closest('.pending') ? PENDING_LIST : FINISHED_LIST
  const li = button.closest('li')
  removeTodoItem(type, li)
}

const checkedHandler = (evt) => {
  const target = evt.target
  const checkbox = target.closest('input[type=checkbox]')
  if (!checkbox) return
  const type = target.closest('.pending') ? PENDING_LIST : FINISHED_LIST
  const li = checkbox.closest('li')
  if (type === PENDING_LIST) {
    checkbox.setAttribute("checked", true);
  } else {
    checkbox.setAttribute("checked", false);
  }
  moveTodoItem(type, li)
}

// Init
const setTodoList = () => {
  const pendingList = getLocalStorageItemList(PENDING_LIST);
  const finishedList = getLocalStorageItemList(FINISHED_LIST);

  setPendingList(pendingList);
  setFinishedList(finishedList);
};

todoForm.addEventListener("submit", submitHandler);
todoForm.addEventListener("click", clickHandler);
todoForm.addEventListener("change", checkedHandler);
window.addEventListener("load", setTodoList);