const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

const updateLS = () => {
  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const addToDo = (todo) => {
  let todoText = "";

  todo ? (todoText = todo.text) : (todoText = input.value);

  if (todoText) {
    const todoEl = document.createElement("li");

    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");

      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      setTimeout(() => {
        todoEl.classList.add("delete");
        todoEl.ontransitionend = function () {
          todoEl.remove();

          updateLS();
        };
      }, 50);
    });
    updateLS();
    todosUL.appendChild(todoEl);

    input.value = "";

    updateLS();
  }
};

if (todos) {
  todos.forEach((todo) => {
    addToDo(todo);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addToDo();
});
