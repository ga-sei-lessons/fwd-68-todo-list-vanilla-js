// 1. ADDING TO-DOS


/* APP STATE */

// Our array of to-dos - we will push a to-do to this array when a new to do is added, and then render the whole list of to-dos as `li` elements in our `ul#to-do-list` element
const toDos = [];
const completedToDos = [];

/* DOM ELEMENTS */

const completedToDoList = document.querySelector("#completed-list");
const toDoList = document.querySelector("#to-do-list");
const form = document.querySelector("#to-do-form");
const toDoInput = document.querySelector("#to-do-input");
const toDoCount = document.querySelector("#to-do-count")

/* EVENT LISTENERS */

form.addEventListener("submit", addToDo);

/* FUNCTIONS */

// adds a todo to our list and rerenders the todos
function addToDo(event) {
  // Prevents default HTML action on a form submit - page does not refresh
  event.preventDefault();
  // Check if user has typed anything in input element
  const toDo = toDoInput.value;
  if (toDo) {
    // Add typed string to `toDos` array
    toDos.push(toDo);
    // Render all to-dos
    renderToDos();
  }
  
  // Clear value from input element - input is now blank again
  toDoInput.value = "";
}

// clears the list of todos and rerenders
function renderToDos() {
  // Clear `ul` element of HTML before rendering - prevents double rendering of to-dos
  // toDoList.innerHTML = ""; // bad way of doing things
  
  // do it like this 
  while(toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild)
  }

  // For each element in array, render that toDo
  for (let i = 0; i < toDos.length; i++) {
    renderToDo(toDos[i]);
  }
  // Can also use for...of loop
  // for (toDo of toDos) {
  //   renderToDo(toDo);
  // }

  toDoCount.innerText = toDos.length;
}

// adds one todo to DOM and with a click event on it
function renderToDo(toDo) {
  // create element
  const li = document.createElement("li");
  // add css class
  li.classList.add("to-do-item");
  // update the text
  li.innerText = toDo;
  // append to the DOM
  toDoList.appendChild(li);
  // add event listen to complete todo
  li.addEventListener("click", function() {
    completeToDo(toDo);
  })
}

// 2. COMPLETE TO-DOS

// When user clicks a to-do `li` element, this function is called
function completeToDo(toDo) {
  // add completed to-do to completed array
  completedToDos.push(toDo);
  
  // Remove completed to-do from to-dos array
  // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
  // toDos = toDos.filter(t => t !== toDo);
  toDos = toDos.filter(function(t) {
    return t !== toDos
  })
  
  // Re-render to-dos and completed to-dos
  renderToDos();
  renderCompletedToDos();
}

// Similar logic with rendering to-dos - but no click event listener
function renderCompletedToDos() {
  // completedToDoList.innerHTML = "";
  while (completedToDoList.firstChild) {
    completedToDoList.removeChild(completedToDoList.firstChild)
  }
  
  for (completedToDo of completedToDos) {
    renderCompleted(completedToDo);
  }
  
  document.querySelector("#completed-to-do-count").innerText = completedToDos.length;
}

function renderCompleted(completed) {
  const li = document.createElement("li");
  li.classList.add("done-item");
  li.innerText = completed;
  completedToDoList.appendChild(li);
}