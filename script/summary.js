//intialize all dynamic functions
async function summaryInit() {
  await loadedTaskstoBoard();
  countAllTasks();
  countAllToDOs();
  countAllInProgress();
  countAllAwaitFeedback();
  countAllDone();
  countTaskUrgent();
  getCurrentDate();
}

// summary of all tasks
function countAllTasks() {
  let summaryAllTasks = document.getElementById('taskInBoard');
  summaryAllTasks.innerHTML = /*html*/ `
      ${loadedTasks.length}
  `;
}

// summary of To Do tasks
function countAllToDOs() {
  let toDO = loadedTasks.filter((t) => t['status'] == 'todo');
  let summarytoDos = document.getElementById('toDoInBoard');
  summarytoDos.innerHTML = /*html*/ `
      ${toDO.length}
  `;
}

//summary of In Progress tasks
function countAllInProgress() {
  let inProgress = loadedTasks.filter((t) => t['status'] == 'progress');
  let summaryinProgress = document.getElementById('inProgressInBoard');
  summaryinProgress.innerHTML = /*html*/ `
      ${inProgress.length}
  `;
}

// summary of Await Feedback tasks
function countAllAwaitFeedback() {
  let awaitFeedback = loadedTasks.filter((t) => t['status'] == 'feedback');
  let summaryawaitFeedback = document.getElementById('awaitFeedbackInBoard');
  summaryawaitFeedback.innerHTML = /*html*/ `
      ${awaitFeedback.length}
  `;
}

//summary of Done tasks
function countAllDone() {
  let done = loadedTasks.filter((t) => t['status'] == 'done');
  let summaryDone = document.getElementById('doneInBoard');
  summaryDone.innerHTML = /*html*/ `
      ${done.length}
  `;
}

// summary of Urgent tasks
function countTaskUrgent() {
  let tasksUrgent = loadedTasks.filter((t) => t['priority'] == 'urgent');
  let summaryTasksUrgent = document.getElementById('urgentInBoard');
  summaryTasksUrgent.innerHTML = /*html*/ `
      ${tasksUrgent.length}
  `;
}

// directs user to give html
function redirectToBoard() {
  window.location.href = '/board.html';
}

// get current Date and shows on summary
function getCurrentDate() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  document.getElementById('currentDateContainer').innerText = formattedDate;
}
