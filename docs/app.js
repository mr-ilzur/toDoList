
let buttonAdd = document.getElementById('button_add');
let checkList = document.getElementById('check_list');
let add = document.getElementById('add');
add.focus();

let todo;
function toLocal(){
  todo = checkList.innerHTML;
  localStorage.setItem('todo', todo);
}

add.addEventListener('keydown', function newElem(e){
  if (e.keyCode === 13) {
    if (add.value === ''){
    return alert('Ошибка: Пустая строка');
    }
    let list = document.createElement('li');
    list.innerHTML =`
      <div id = "newTask" data-elem = 'text'>` + add.value + `</div>
      <div id = "block">
        <span id = "checkTask" data-elem = 'checkbox'>&#10004;</span>
        <span id = "deleteTask" data-elem = 'remove'>&#10006;</span>
      </div>`;
    add.value = '';
    checkList.appendChild(list);
    add.focus();
    toLocal();
  };
});

buttonAdd.addEventListener('click', function newElem(){
  if (add.value === ''){
    return alert('Ошибка: Пустая строка');
  }
  let list = document.createElement('li');
  list.innerHTML =`
    <div id = "newTask" data-elem = 'text'>` + add.value + `</div>
    <div id = "block">
      <span id = "checkTask" data-elem = 'checkbox'>&#10004;</span>
      <span id = "deleteTask" data-elem = 'remove'>&#10006;</span>
    </div>`;
  add.value = '';
  checkList.appendChild(list);
  add.focus();
  toLocal();
});

checkList.addEventListener('click', function(event) {
  let li = event.target.closest('li');
  if (event.target.dataset.elem) {
    switch (event.target.dataset.elem) {
        case 'text':
        let div = event.target;
        let input = document.createElement('input');
        input.className = 'inputEdit';
        input.value = event.target.innerHTML;
        div.innerHTML = '';
        div.appendChild(input);
        input.addEventListener('keydown', function(e) {
          if (e.keyCode === 13) {
            div.innerHTML = this.value;
            toLocal();
          };
          });
        input.addEventListener('blur', function() {
            div.innerHTML = this.value;
            toLocal();
        });
      break;
      case 'checkbox':
        li.classList.toggle('done');
        toLocal();
      break;
      case 'remove':
        li.parentElement.removeChild(li);
        event.preventDefault();
        toLocal();
      break;
    };
  };
});

if(localStorage.getItem('todo')) {
  checkList.innerHTML = localStorage.getItem("todo");
};
