let trailsArray = ['JavaScript', 'Python', 'Java'];
let tasks = [];

function openModal() {
 document.getElementById('task-modal').classList.add('show');
 populateTrailSelect();
}

function closeModal() {
 document.getElementById('task-modal').classList.remove('show');
}

function populateTrailSelect() {
 const select = document.getElementById('trail-select');
 select.innerHTML = ''; // Limpa as opções atuais
 trailsArray.forEach(trail => {
  const option = document.createElement('option');
  option.value = trail;
  option.textContent = trail;
  select.appendChild(option);
 });
}

function addTask() {
 const trailSelect = document.getElementById('trail-select');
 const taskInput = document.getElementById('task-input');
 const addMultiple = document.getElementById('add-multiple-tasks');
 const selectedTrail = trailSelect.value;
 const newTask = taskInput.value.trim();

 if (newTask !== '') {
  tasks.push({ trail: selectedTrail, task: newTask, completed: false });
  renderTasks();
  taskInput.value = '';
  taskInput.focus();

  if (!addMultiple.checked) {
   closeModal();
  }
 }
}



function toggleTaskCompletion(index) {
 tasks[index].completed = !tasks[index].completed;
 renderTasks();
}

function renderTasks() {
 const taskList = document.getElementById('task-list');
 taskList.innerHTML = ''; // Limpa a lista atual

 trailsArray.forEach(trail => {
  const trailTasks = tasks.filter(task => task.trail === trail);

  if (trailTasks.length > 0) {
   const trailHeader = document.createElement('li');
   const iconTrails = document.createElement('span');
   iconTrails.className = 'icon-trail';
   iconTrails.textContent = ' >_';

   const allCompleted = trailTasks.every(task => task.completed);
   if (allCompleted) {
    iconTrails.classList.add('show', 'completed');
   } else {
    iconTrails.classList.remove('completed');
    iconTrails.classList.add('show');
   }

   trailHeader.className = 'trail-header';
   trailHeader.textContent = trail;
   trailHeader.appendChild(iconTrails);
   taskList.appendChild(trailHeader);

   const trailTasksContainer = document.createElement('div');
   trailTasksContainer.className = 'trail-tasks';

   trailTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
              <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${tasks.indexOf(task)})">
              <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.task}</span>
               <button>Delete</button>
            `;
    trailTasksContainer.appendChild(li);
   });

   taskList.appendChild(trailTasksContainer);
  }
 });
}

// Render tasks initially
renderTasks();
