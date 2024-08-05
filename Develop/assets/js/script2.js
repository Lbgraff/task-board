// closerBtnEl.on('click', function () {
    // const newTaskId = generateTaskId(8);
    // console.log(newTaskId);
    // get user input with ID in object

    // const leighTask  = {
    //     name: taskTitleInputEl.val(),
    //     desc: taskDescriptionInputEl.val(),
    //     dueDate: taskDueDateInputEl.val(),
    //     id: newTaskId
    // }
    //  Add to task list array and save to local storage.
    // console.log(leighTask);
    // taskList.push(leighTask);
    // saveTasksToStorage(taskList);
    // renderTaskList();
// })
// closerBtnEl.on('click', handleTaskFormSubmit);

// Todo: create a function to create a task card
// function createTaskCard(task) {

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

    // if (task.dueDate && task.status !== 'done') {
    //     const now = dayjs();
    //     const taskDueDate = dayjs(task.dueDate, 'MM/DD/YYYY');

    //     if (now.isSame(taskDueDate, 'day')) {
    //         taskCard.addClass('bg-warning text-white');
    //     } else if (now.isAfter(taskDueDate)) {
    //         taskCard.addClass('bg-danger text-white');
    //         cardDeleteBtn.addClass('border-light');
    //     }
    // }

    // cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    // taskCard.append(cardHeader, cardBody);

    // return taskCard;

// }

 // const taskName = taskTitleInputEl.val().trim();
    // const taskType = taskDescriptionInputEl.val();
    // const taskDate = taskDueDateInputEl.val();

    // const newTask = {
    //     name: taskName,
    //     type: taskType,
    //     dueDate: taskDate,
    //     status: 'to-do',
    // };

        // const cardDeleteBtn = $('<button>')
    //     .addClass('btn btn-danger delete')
    //     .text('Delete')
    //     .attr('data-task-id', task.id);
    // cardDeleteBtn.on('click', handleDeleteTask);
