// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskTitleInputEl = $('input[name="task-title"]');
const taskDueDateInputEl = $('input[name="datepicker"]');
const taskDescriptionInputEl = $('input[name="task-description"]');
const closerBtnEl = $('#closer');

// Todo: create a function to generate a unique task id
// function getTaskIdCharacter() {
//     return String.fromCharCode(Math.floor(Math.random() * 77) + 34);
// }

// function generateTaskId(num) {
//     let taskId = ' ';
//     for (let i = 0; i < num; i++) {
//         taskId += getTaskIdCharacter();
//     }
//     return taskId;
// }

// closerBtnEl.on('click', function () {
//     const newTaskId = generateTaskId(8);
// })

function readTasksFromStorage() {
   let tasks = JSON.parse(localStorage.getItem('tasks'));
  
    if (!tasks) {
      tasks = [];
    }
  
    return tasks;
  }
  
  function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  

// Todo: create a function to create a task card
function createTaskCard(task) {

    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.type);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;

}

function printTaskData() {
    const tasks = readTasksFromStorage();

    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    for (let task of tasks) {
        if (task.status === 'to-do') {
            todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100
    })
}

// Todo: create a function to handle adding a new task


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

    const taskId = $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();

    tasks.forEach((task) => {
        if (task.id === taskId) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });
    saveTasksToStorage(tasks);
    printTaskData();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    $("#droppable").droppable(
        function (event, ui) {
            $(this)
                .addClass("ui-state-highlight")
                .find("p")
        });
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    printTaskData();

    $('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

    $("#staticBackdrop").dialog({
        autoOpen: false,
        modal: true
    });
    $("#opener").click(function () {
        $("#staticBackdrop").dialog("open");
    });

});

function handleTaskFormSubmit(event) {
    event.preventDefault();

    const taskName = taskNameInputEl.val().trim();
    const taskType = taskTypeInputEl.val();
    const taskDate = taskDateInputEl.val();

    const newtask = {
        name: taskName,
        type: taskType,
        dueDate: taskDate,
        status: 'to-do',
    };

    const tasks = readTasksFromStorage();
    tasks.push(newtask);

    saveTasksToStorage(tasks);

    printTaskData();

    taskNameInputEl.val('');
    taskTypeInputEl.val('');
    taskDateInputEl.val('');
}

function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();

    const taskId = ui.draggable[0].dataset.taskId;

    const newStatus = event.target.id;

    for (let task of tasks) {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }
}