// TaskForge – interactive to‑do list
const taskListEl = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const filterTabs = document.querySelectorAll('.filter-tab');
const drawer = document.getElementById('drawer');
const editInput = document.getElementById('editTaskInput');
const saveEditBtn = document.getElementById('saveEditBtn');
const toastContainer = document.getElementById('toastContainer');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

let tasks = [];
let editId = null;
let currentFilter = 'all';

// ---------- Utility ----------
function showToast(message){
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(()=>toast.remove(),3000);
}

function render(){
  taskListEl.innerHTML = '';
  const filtered = tasks.filter(t=>{
    if(currentFilter==='all') return true;
    if(currentFilter==='active') return !t.completed;
    if(currentFilter==='completed') return t.completed;
  });
  filtered.forEach(task=>{
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;
    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div class="task-actions">
        <button class="edit-btn" title="Edit">✎</button>
        <button class="delete-btn" title="Delete">🗑️</button>
        <button class="complete-btn" title="Toggle Complete">${task.completed ? '↺' : '✔'}</button>
      </div>
    `;
    taskListEl.appendChild(li);
  });
}

function addTask(text){
  const trimmed = text.trim();
  if(!trimmed){
    showToast('Task cannot be empty');
    return;
  }
  const newTask = {id:Date.now().toString(), text:trimmed, completed:false};
  tasks.push(newTask);
  render();
  showToast('Task added');
}

function deleteTask(id){
  tasks = tasks.filter(t=>t.id!==id);
  render();
  showToast('Task deleted');
}

function toggleComplete(id){
  const task = tasks.find(t=>t.id===id);
  if(task){
    task.completed = !task.completed;
    render();
    showToast(task.completed ? 'Task completed' : 'Task marked as active');
  }
}

function openEditDrawer(id){
  const task = tasks.find(t=>t.id===id);
  if(!task) return;
  editId = id;
  editInput.value = task.text;
  drawer.classList.add('show');
  drawer.setAttribute('aria-hidden','false');
}

function closeDrawer(){
  drawer.classList.remove('show');
  drawer.setAttribute('aria-hidden','true');
  editId = null;
}

function saveEdit(){
  const newText = editInput.value.trim();
  if(!newText){
    showToast('Task cannot be empty');
    return;
  }
  const task = tasks.find(t=>t.id===editId);
  if(task){
    task.text = newText;
    render();
    showToast('Task updated');
    closeDrawer();
  }
}

// ---------- Event Listeners ----------
addTaskBtn.addEventListener('click',()=>addTask(newTaskInput.value));
newTaskInput.addEventListener('keypress',e=>{if(e.key==='Enter') addTask(newTaskInput.value);});

taskListEl.addEventListener('click',e=>{
  const li = e.target.closest('.task-item');
  if(!li) return;
  const id = li.dataset.id;
  if(e.target.classList.contains('delete-btn')) deleteTask(id);
  else if(e.target.classList.contains('complete-btn')) toggleComplete(id);
  else if(e.target.classList.contains('edit-btn')) openEditDrawer(id);
});

filterTabs.forEach(tab=>{
  tab.addEventListener('click',()=>{
    filterTabs.forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    render();
  });
});

// Drawer controls
drawer.querySelector('.drawer-close').addEventListener('click',closeDrawer);
saveEditBtn.addEventListener('click',saveEdit);

// Nav toggle for mobile
navToggle.addEventListener('click',()=>navLinks.classList.toggle('show'));

// Initial render
render();