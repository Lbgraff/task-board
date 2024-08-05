// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskTitleInputEl = $('input[id="project-name-input"]');
const taskDueDateInputEl = $('input[id="datepicker"]');
const taskDescriptionInputEl = $('input[id="task-description"]');
const closerBtnEl = $('#closer');

// Todo: create a function to generate a unique task id
function generateTaskId(num) {
    function getTaskIdCharacter() {
        return String.fromCharCode(Math.floor(Math.random() * 77) + 34);
    }

    let taskId = ' ';
    for (let i = 0; i < num; i++) {
        taskId += getTaskIdCharacter();
    }
    return taskId;
    console.log(taskId);
}

// Todo: create a function to create a task card
function createTaskCard(task) {

    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.desc);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'MM/DD/YYYY');

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

function readTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) {
        tasks = [];
    }

    return tasks;
}

function saveTasksToStorage(newTask) {
    const tasks = readTasksFromStorage();
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // function printTaskData() {
    console.log("I am in print task")
    const tasks = readTasksFromStorage();
    console.log(tasks.length);
    const todoList = $('#todo-cards');
    todoList.empty();
    $('#todo-cards').draggable({
        opacity: 0.7,
        zIndex: 100
    })

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
    $('#in-progress-cards').draggable({
        opacity: 0.7,
        zIndex: 100
    })

    const doneList = $('#done-cards');
    doneList.empty();
    $('#done-cards').draggable({
        opacity: 0.7,
        zIndex: 100
    })

    for (let task of tasks) {
        console.log(task);
        if (task.status === 'to-do') {
            todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }
//    // find all items class draggable and define what happens when dragged.
//    $(".draggable").draggable({
//     opacity: 0.7,
//     zIndex: 100,
//     // helper function jquery ui documentation.
//     helper: //put helper function here.
// });

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    // event.preventDefault();
    const newTaskId = generateTaskId(8);
    console.log(newTaskId);
    // get user input with ID in object

    const task = {
        name: taskTitleInputEl.val(),
        desc: taskDescriptionInputEl.val(),
        dueDate: taskDueDateInputEl.val(),
        id: newTaskId,
        status: "to-do"
    }

    saveTasksToStorage(task);
    renderTaskList();

}

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
    console.log("hello draggable");
        // Read tasks from localStorage
        const projects = readTasksFromStorage();
      
        // Get the task id from the event
        const newId = ui.draggable[0].dataset.taskId;
      
        // Get the id of the lane that the card was dropped into
        const newStatus = event.target.id;
      
        for (let task of tasks) {
          // Find the project card by the `id` and update the project status.
          if (task.id === newId) {
            task.status = newStatus;
          }
        }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    closerBtnEl.on('click', handleAddTask)

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});