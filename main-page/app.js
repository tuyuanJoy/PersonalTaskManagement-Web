let tasks = [];

// Get DOM elements
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalDueDate = document.getElementById('modalDueDate');
const modalPriority = document.getElementById('modalPriority');
const modalStatus = document.getElementById('modalStatus');
const modalSaveButton = document.getElementById('modalSaveButton');
const modalCloseButton = document.getElementById('modalCloseButton');

// Add event listeners
taskForm.addEventListener('submit', addTask);
modalSaveButton.addEventListener('click', saveTask);
modalCloseButton.addEventListener('click', closeModal);

// Add task function
function addTask(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;
  const status = document.getElementById('status').value;
  const id = Date.now();
  const task = { id, title, description, dueDate, priority, status };
  tasks.push(task);
  renderTaskList();
  closeModal();
}

// Render task list function
function renderTaskList() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    listItem.innerHTML = `
      <div class="task-details">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <small><b>Due Date:</b> ${task.dueDate}</small>
        <br>
        <small><b>Priority:</b> ${task.priority}</small>
        <br>
        <small><b>Status:</b> ${task.status}</small>
      </div>
      <div class="task-actions">
        <button class="edit" data-task-id="${task.id}">Edit</button>
        <button class="delete" data-task-id="${task.id}">Delete</button>
      </div>
    `;
    listItem.querySelector('.edit').addEventListener('click', openEditModal);
    listItem.querySelector('.delete').addEventListener('click', deleteTask);
    taskList.appendChild(listItem);
  });
}

// Edit task function
function openEditModal(event) {
  const taskId = parseInt(event.target.getAttribute('data-task-id'));
  const task = tasks.find(task => task.id === taskId);
  modalTitle.value = task.title;
  modalDescription.value = task.description;
  modalDueDate.value = task.dueDate;
  modalPriority.value = task.priority;
  modalStatus.value = task.status;
  modalSaveButton.setAttribute('data-task-id', taskId);
  modal.style.display = 'flex';
}

// Save edited task function
function saveTask() {
  const taskId = parseInt(modalSaveButton.getAttribute('data-task-id'));
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  tasks[taskIndex].title = modalTitle.value;
  tasks[taskIndex].description = modalDescription.value;
  tasks[taskIndex].dueDate = modalDueDate.value;
  tasks[taskIndex].priority = modalPriority.value;
  tasks[taskIndex].status = modalStatus.value;
  renderTaskList();
  closeModal();
}

// Delete task function
function deleteTask(event) {
  const taskId = parseInt(event.target.getAttribute('data-task-id'));
  tasks = tasks.filter(task => task.id !== taskId);
  renderTaskList();
  }
  
  // Close modal function
  function closeModal() {
  modal.style.display = 'none';
  modalTitle.value = '';
  modalDescription.value = '';
  modalDueDate.value = '';
  modalPriority.value = 'Low';
  modalStatus.value = 'Not Started';
  modalSaveButton.removeAttribute('data-task-id');
  }
  
  // Initial render
  renderTaskList();