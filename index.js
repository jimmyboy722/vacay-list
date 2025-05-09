let inputs = document.querySelectorAll("input");
let button = document.querySelector("button");
let toDoList = document.querySelector("#to-do-list");
let task = [];

let localStorageData = localStorage.getItem("toDo array");

if (localStorageData != null) {
  let originalData = JSON.parse(localStorageData);
  task = originalData;
  displayToDos();
}

button.addEventListener("click", function () {
  let query = inputs.value;
  inputs.value = "";
  task.push(inputValue);
  if (query.trim() === "") {
    alert("Please enter a task");
    throw new Error("empty input field");
  }
  let toDoObj = {
    id: Date.now(),
    text: query,
  };
  task.push(toDoObj);
  localStorage.setItem("toDo array", JSON.stringify(toDo));
  displayToDos();
});

function displayToDos() {
  toDoList.innerHTML = "";
  for (let i = 0; i < toDo.length; i++) {
    let { id, text } = toDo[i];
    let el = document.createElement("div");
    el.innerHTML = `
            <span class="task" contenteditable="false">${text}</span>
            <button class='edit'>Edit</button>
            <span class="delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z"></path></svg></span>
        `;
    let delBtn = el.querySelector(".delete");
    let editBtn = el.querySelector(".edit");
    let toDoText = el.querySelector(".task");

    // deleting the task
    delBtn.addEventListener("click", function () {
      let filteredArray = task.filter(function (toDoObj) {
        return toDoObj.id != id;
      });
      task = filteredArray;
      localStorage.setItem("toDo array", JSON.stringify(task));
      toDoList.removeChild(el);
    });
    // editing the task
    editBtn.addEventListener("click", function () {
      if (editBtn.innerText == "Edit") {
        toDoText.setAttribute("contenteditable", "true");
        // Enabling editing
        toDoText.focus(); // To focus on the text to edit
        editBtn.innerText = "Save"; // changes button text to 'save'
      } else {
        toDoText.setAttribute("contenteditable", "false");

        let updatedText = toDoText.innerText.trim();
        if (updatedText !== "") {
          task = task.map(function (toDoObj) {
            if (toDoObj.id == id) {
              toDoObj.text = updatedText;
            }
            return toDoObj;
          });
          localStorage.setItem("toDo array", JSON.stringify(task));
        }
        editBtn.innerText = "Edit"; // changes button text back to 'edit'
      }
    });

    el.classList.add("todo");
    toDoList.appendChild(el);
  }
}
