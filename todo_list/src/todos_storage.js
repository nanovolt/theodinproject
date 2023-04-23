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
      setCurrentTodoList("Default");
      addTodoList("Default");
    }
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
  };
}
