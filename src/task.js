const taskForm = document.querySelector(".js-task"),
    tasks = taskForm.querySelector("input"),
    pending = document.querySelector(".js-pending"),
    pendingCnt = pending.querySelectorAll("span"),
    finished = document.querySelector(".js-finished")
    finishedCnt = finished.querySelectorAll("span");

const PENDING_LS = "pending", FINISHED_LS = "finished";

let pendingList = [], finishedList = [];

function savePending() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingList));
  }
  
  function saveFinished() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedList));
  }

  function updatePendingCnt() {
    const cnt = pendingList.length;
    pendingCnt[0].innerText = `(${cnt} Tasks)`;
  }
  
  function updateFinishedCnt() {
    const cnt = finishedList.length;
    finishedCnt[0].innerText = `(${cnt} Tasks)`;
  }
  
  function pendingTaskName(event) {
    const task = event.target.parentNode.childNodes[1].innerText;
  
    paintPendingList(task);
    updatePendingCnt();
    updateFinishedCnt();
  }
  
  function finishedTaskName(event) {
    const task = event.target.parentNode.childNodes[1].innerText;
  
    paintFinishedList(task);
    updatePendingCnt();
    updateFinishedCnt();
  }
  
  function deletePending(event) {
    const btn = event.target;
    const div = btn.parentNode;
  
    pending.removeChild(div);
  
    const cleanPending = pendingList.filter(function (task) {
      return task.id !== parseInt(div.id);
    });

    pendingList = cleanPending;
    savePending();
    updatePendingCnt();
  }
  
  function deleteFinished(event) {
    const btn = event.target;
    const div = btn.parentNode;
  
    finished.removeChild(div);
  
    const cleanFinished = finishedList.filter(function (task) {
      return task.id !== parseInt(div.id);
    });
    finishedList = cleanFinished;
    saveFinished();
    updateFinishedCnt();
  }
  
  function paintPendingList(task) {
    const div = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const pendingBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = pendingList.length + 1;

    div.classList.add("item");
    deleteBtn.innerText = "✖";
    pendingBtn.innerText = "○";
    span.innerText = task;
  
    pendingBtn.addEventListener("mouseover", function () { pendingBtn.innerText = "●"; });
    pendingBtn.addEventListener("mouseout", function () { pendingBtn.innerText = "○"; });

    deleteBtn.addEventListener("mouseover", function () { deleteBtn.style.color = "red"; });
    deleteBtn.addEventListener("mouseout", function () { deleteBtn.style.color = "white"; });
    
    deleteBtn.addEventListener("click", deletePending);
    pendingBtn.addEventListener("click", deletePending);
    pendingBtn.addEventListener("click", finishedTaskName);
  
    div.appendChild(pendingBtn);
    div.appendChild(span);
    div.appendChild(deleteBtn);

    div.id = newId;
  
    pending.appendChild(div);
  
    const pendingObj = {
      task: task,
      id: newId
    };
  
    pendingList.push(pendingObj);
    savePending();
  }
  
  function paintFinishedList(task) {
    const div = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const finishedBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = finishedList.length + 1;
  
    div.classList.add("item");
    deleteBtn.innerText = "✖";
    finishedBtn.innerText = "●";
    span.innerText = task;
  
    finishedBtn.addEventListener("mouseover", function () { finishedBtn.innerText = "○"; });
    finishedBtn.addEventListener("mouseout", function () { finishedBtn.innerText = "●"; });

    deleteBtn.addEventListener("mouseover", function () { deleteBtn.style.color = "red"; });
    deleteBtn.addEventListener("mouseout", function () { deleteBtn.style.color = "white"; });
    
    deleteBtn.addEventListener("click", deleteFinished);
    finishedBtn.addEventListener("click", deleteFinished);
    finishedBtn.addEventListener("click", pendingTaskName);
  
    div.appendChild(finishedBtn);
    div.appendChild(span);
    div.appendChild(deleteBtn);
    div.id = newId;
  
    finished.appendChild(div);
  
    const finishedObj = {
      task,
      id: newId
    };
  
    finishedList.push(finishedObj);
    saveFinished();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const currentTask = tasks.value;
    paintPendingList(currentTask);
    updatePendingCnt();

    tasks.value = "";
  }
  
  function loadTasks() {
    const loadedPending = localStorage.getItem(PENDING_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);
  
    if (loadedPending !== null) {
      const parsedPending = JSON.parse(loadedPending);
      parsedPending.forEach(function (tasks) {
        paintPendingList(tasks.task);
      });
      updatePendingCnt();
    }
  
    if (loadedFinished !== null) {
      const parsedFinished = JSON.parse(loadedFinished);
      parsedFinished.forEach(function (tasks) {
        paintFinishedList(tasks.task);
      });
      updateFinishedCnt();
    }
  }
  
  function init() {
    loadTasks();
    taskForm.addEventListener("submit", handleSubmit);
  }
  
  init();
  