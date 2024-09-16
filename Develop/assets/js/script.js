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
console.log(`readTasks ${tasks}`)
    // if (!tasks) {
    //     tasks = [];
    // }

    return tasks;
}

function saveTasksToStorage(newTask) {
    // const tasks = readTasksFromStorage();
    // tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(newTask));
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
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
            todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }
    //    // find all items class draggable and define what happens when dragged.
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
            // Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            const original = $(e.target).hasClass('draggable')
                ? $(e.target)
                : $(e.target).closest('.draggable');
            // Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });

}

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
function handleDeleteTask() {
    const taskId = $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();

    // ? Remove task from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity. For now, we will use a `forEach()` loop to remove the project.
    tasks.forEach((task) => {
        if (task.id === taskId) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    // We will use our helper function to save the tasks to localStorage
    saveTasksToStorage(tasks);

    // Here we use our other function to print takss back to the screen
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    console.log("hello draggable");
    // Read tasks from localStorage
    const tasks = readTasksFromStorage();

    // Get the task id from the event
    const newId = ui.draggable[0].dataset.taskId;

    // Get the id of the lane that the card was dropped into
    const newStatus = event.target.id;

    for (let task of tasks) {
        // Find the task card by the `id` and update the task status.
        if (task.id === newId) {
            task.status = newStatus;
        }
    }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    closerBtnEl.on('click', handleAddTask);

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});
