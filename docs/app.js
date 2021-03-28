const newTask = document.getElementById('new_task');
const buttonAdd = document.getElementById('button_add');
let listTask = document.querySelector('ul');

let todo;
function toLocal(){
  todo = listTask.innerHTML;
  localStorage.setItem('todo', todo);
}

buttonAdd.onclick = function addElement(){
  let task = newTask.value;
  task.className = 'taskEdit';
  let li = document.createElement('LI');
  let inTask = document.createTextNode(task);
  li.appendChild(inTask);
  if (task == '') {
    alert('Ошибка: Пустая строка')
  } else {
 document.getElementById('list').appendChild(li);
  };
  newTask.value = '';
  let btnDelete = document.createElement('BUTTON');
  btnDelete.textContent = 'Удалить';
  btnDelete.className = 'delete';
  li.appendChild(btnDelete);
  toLocal();
};

listTask.addEventListener('click', function (eventHandler) {
  if (eventHandler.target.tagName === 'LI') {
    eventHandler.target.classList.toggle('checked')
    toLocal();
  } else if (eventHandler.target.tagName === 'BUTTON') {
    let deleteTask = eventHandler.target.parentNode;
    deleteTask.remove();
    toLocal();
  }
}, false);


if(localStorage.getItem('todo')) {
  listTask.innerHTML = localStorage.getItem("todo");
};
