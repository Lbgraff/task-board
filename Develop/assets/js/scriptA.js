// Retrieve tasks and nextId from localStorage
let taskList = readTasksFromStorage();
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskTitleInputEl = $('input[id="project-name-input"]');
const taskDueDateInputEl = $('input[id="datepicker"]');
const taskDescriptionInputEl = $('input[id="task-description"]');
const closerBtnEl = $('#closer');

// Generates random task ID 
function getTaskIdCharacter() {
    return String.fromCharCode(Math.floor(Math.random() * 77) + 34);
}

function generateTaskId(num) {
    let taskId = ' ';
    for (let i = 0; i < num; i++) {
        taskId += getTaskIdCharacter();
    }
    return taskId;
}


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


function printTaskData() {
    console.log("I am in print task")
    const tasks = readTasksFromStorage();
    console.log(tasks.length);
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    for (let task of tasks) {
        console.log(task);
        if (task.status === 'to-do') {
            todoList.append(handleTaskFormSubmit(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(handleTaskFormSubmit(task));
        } else if (task.status === 'done') {
            doneList.append(handleTaskFormSubmit(task));
        }
    }
}

// Renders the task list and makes cards draggable
function renderTaskList() {
    $('#draggable').draggable({
        opacity: 0.7,
        zIndex: 100
    })
}

// Todo: create a function to handle adding a new task


// Function to handle deleting a task
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

// Drops a task into a new status lane
function handleDrop(event, ui) {
    $("#droppable").droppable(
        function (event, ui) {
            $(this)
                .addClass("ui-state-highlight")
                .find("p")
        });
}




function handleTaskFormSubmit(event) {

    const newTaskId = generateTaskId(8);
    console.log(newTaskId);
    // get user input with ID in object

    const task = {
        name: taskTitleInputEl.val(),
        desc: taskDescriptionInputEl.val(),
        dueDate: taskDueDateInputEl.val(),
        id: newTaskId
    }
    //  Add to task list array and save to local storage.
    console.log(task);
    taskList.push(task);
    saveTasksToStorage(taskList);
    renderTaskList();

    // const newTaskId = generateTaskId(8);
    // console.log(newTaskId);

    // const taskCard = $('<div>')
    //     .addClass('card task-card draggable my-3')
    //     .attr('data-task-id', task.id);
    // const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    // const cardBody = $('<div>').addClass('card-body');
    // const cardDescription = $('<p>').addClass('card-text').text(task.desc);
    // const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    // const cardDeleteBtn = $('<button>')
    //     .addClass('btn btn-danger delete')
    //     .text('Delete')
    //     .attr('data-task-id', task.id);
    // cardDeleteBtn.on('click', handleDeleteTask);

    // if (taskCard.dueDate && task.status !== 'done') {
    //     const now = dayjs();
    //     const taskDueDate = dayjs(taskCard.dueDate, 'MM/DD/YYYY');

    //     if (now.isSame(taskDate, 'day')) {
    //         taskCard.addClass('bg-warning text-white');
    //     } else if (now.isAfter(taskDate)) {
    //         newTask.addClass('bg-danger text-white');
    //         cardDeleteBtn.addClass('border-light');
    // }

    // cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    // taskCard.append(cardHeader, cardBody);

    // return taskCard;

    // console.log(newTask);

    // const tasks = readTasksFromStorage();
    // tasks.push(newTask);

    // saveTasksToStorage(tasks);

    // printTaskData();

    // renderTaskList();

    // taskTitleInputEl.val('');
    // taskDescriptionInputEl.val('');
    // taskDueDateInputEl.val('');
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

closerBtnEl.on('click', handleTaskFormSubmit)

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    printTaskData();

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});