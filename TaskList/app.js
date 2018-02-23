// UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners(){
  // add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', removeAllTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks)
}

// Add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Please insert a name for the task to add')
  } else {
    // Create a list item
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node
    li.appendChild(document.createTextNode(taskInput.value));
    // Add the anchor element for the delete button
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon in HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);

    // Add new list item to list
    taskList.appendChild(li);

    // Clear input
    taskInput.value = '';
  }

  // block default behavior of submit
  e.preventDefault();
}

function removeTask(e){
  // Target only the click on the element with .delete-item class, not its parents
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
    }
  }
}

function removeAllTasks( ){
  // if(confirm('Are you sure you want to remove all tasks?')){
  //   Array.from(taskList.children).forEach(function(item){
  //     item.remove();
  //   })
  // }

  // Better
  if(confirm('Are you sure you want to remove all tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }
  }

}

// Filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}