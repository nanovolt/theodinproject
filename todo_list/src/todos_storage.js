import format from "date-fns/format";
import { parseISO } from "date-fns/esm";

export default function TodosStorage() {
  function getArrayOfTodoLists() {
    const array = JSON.parse(localStorage.getItem("ArrayOfTodoLists"));
    if (!array) {
      return [];
    }
    return array;
  }

  function renameTodoList(oldName, newName) {
    const arr = getArrayOfTodoLists();

    arr[arr.findIndex((todoList) => todoList.name === oldName)].name = newName;

    localStorage.setItem("ArrayOfTodoLists", JSON.stringify(arr));
  }

  function hasTodoLists() {
    if (localStorage.getItem("ArrayOfTodoLists")) {
      return true;
    }
    return false;
  }

  function getCurrentTodoList() {
    return localStorage.getItem("currentTodoList");
  }

  function setCurrentTodoList(todoList) {
    localStorage.setItem("currentTodoList", todoList);
  }

  function isNotPresent(name) {
    const arr = getArrayOfTodoLists();
    if (arr.filter((todo) => todo.name === name).length === 0) {
      return true;
    }
    return false;
  }

  function addTodoList(name) {
    const arr = getArrayOfTodoLists();

    if (isNotPresent(name)) {
      const todoList = {
        name: `${name}`,
        todos: [],
      };

      arr.push(todoList);
      localStorage.setItem("ArrayOfTodoLists", JSON.stringify(arr));
    }
  }

  function deleteTodoList(name) {
    localStorage.setItem(
      "ArrayOfTodoLists",
      JSON.stringify(getArrayOfTodoLists().filter((item) => item.name !== name))
    );
  }

  function getArrayofTodos() {
    const arr = getArrayOfTodoLists();

    if (getCurrentTodoList()) {
      const { todos } =
        arr[
          arr.findIndex((todoList) => todoList.name === getCurrentTodoList())
        ];

      return todos;
    }
    return [];
  }

  function getIds() {
    const arr = getArrayOfTodoLists();
    const { todos } =
      arr[arr.findIndex((todoList) => todoList.name === getCurrentTodoList())];

    const s = new Set(todos.map((item) => item.id));

    // console.log(todos.map((item) => item.id));

    return s;
  }

  function getLength() {
    const arr = getArrayOfTodoLists();

    return arr[
      arr.findIndex((todoList) => todoList.name === getCurrentTodoList())
    ].todos.length;
  }

  function addTodo(todo) {
    const arr = getArrayOfTodoLists();

    arr[
      arr.findIndex((todoList) => todoList.name === getCurrentTodoList())
    ].todos.push(todo);

    localStorage.setItem("ArrayOfTodoLists", JSON.stringify(arr));
  }

  function getTodo(id) {
    const arr = getArrayOfTodoLists();

    const currentTodoList =
      arr[arr.findIndex((todoList) => todoList.name === getCurrentTodoList())];

    const targetTodoList = currentTodoList.todos.filter(
      (todo) => todo.id === id
    );

    return targetTodoList[0];
  }

  function updateTodo(task) {
    const id = Number(task.id);

    const arr = getArrayOfTodoLists();

    const currentTodoList =
      arr[arr.findIndex((todoList) => todoList.name === getCurrentTodoList())];

    currentTodoList.todos[id].title = task.title;
    currentTodoList.todos[id].description = task.description;
    currentTodoList.todos[id].dueDate = task.dueDate;
    currentTodoList.todos[id].priority = task.priority;

    localStorage.setItem("ArrayOfTodoLists", JSON.stringify(arr));
  }

  function deleteTodo(id) {
    const arr = getArrayOfTodoLists();

    const currentTodoList =
      arr[arr.findIndex((todoList) => todoList.name === getCurrentTodoList())];

    const updatedTodoList = currentTodoList.todos.filter(
      (todo) => todo.id !== id
    );

    currentTodoList.todos = updatedTodoList;

    localStorage.setItem("ArrayOfTodoLists", JSON.stringify(arr));
  }

  function init() {
    if (!localStorage.getItem("ArrayOfTodoLists")) {
      setCurrentTodoList("Groceries");
      addTodoList("Groceries");

      addTodo({
        title: "Milk",
        description: "2 cartons",
        dueDate: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
        priority: "Low",
        id: 0,
        complete: true,
      });

      addTodo({
        title: "Steak or ribs",
        description: "5kg",
        dueDate: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
        priority: "Normal",
        id: 1,
        complete: false,
      });

      addTodo({
        title: "Hot sauce",
        description: "Don't forget the milk",
        dueDate: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
        priority: "Critical",
        id: 2,
        complete: false,
      });

      setCurrentTodoList("Projects");
      addTodoList("Projects");

      addTodo({
        title: "Hot fix ticket #42069",
        description: "",
        dueDate: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
        priority: "Urgent",
        id: 0,
        complete: false,
      });

      addTodo({
        title: "Send excel",
        description: "",
        dueDate: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
        priority: "Normal",
        id: 1,
        complete: true,
      });

      addTodo({
        title: "Finish report",
        description: "",
        dueDate: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
        priority: "Low",
        id: 2,
        complete: false,
      });

      setCurrentTodoList("Workout");
      addTodoList("Workout");

      addTodo({
        title: "Hanging leg raise 3x30",
        description: "",
        dueDate: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
        priority: "Normal",
        id: 0,
        complete: true,
      });

      addTodo({
        title: "Pull-up 3x15",
        description: "",
        dueDate: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
        priority: "Normal",
        id: 1,
        complete: true,
      });

      addTodo({
        title: "Pike push-up 3x15",
        description: "",
        dueDate: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
        priority: "Normal",
        id: 2,
        complete: true,
      });

      addTodo({
        title: "5k run",
        description: "",
        dueDate: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
        priority: "Urgent",
        id: 3,
        complete: false,
      });

      setCurrentTodoList("Groceries");
    }
  }

  function toggleComplete(id, toggle) {
    const arr = getArrayOfTodoLists();

    const currentTodoList =
      arr[arr.findIndex((todoList) => todoList.name === getCurrentTodoList())];

    if (toggle) {
      currentTodoList.todos[id].complete = true;
    } else {
      currentTodoList.todos[id].complete = false;
    }

    localStorage.setItem("ArrayOfTodoLists", JSON.stringify(arr));
  }

  return {
    init,
    getArrayOfTodoLists,
    addTodoList,
    deleteTodoList,
    hasTodoLists,
    getCurrentTodoList,
    setCurrentTodoList,
    isNotPresent,
    renameTodoList,
    addTodo,
    getLength,
    getArrayofTodos,
    deleteTodo,
    getIds,
    getTodo,
    updateTodo,
    toggleComplete,
  };
}
