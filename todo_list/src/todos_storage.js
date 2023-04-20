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
      setCurrentTodoList(name);
    }
  }

  function deleteTodoList(name) {
    localStorage.setItem(
      "ArrayOfTodoLists",
      JSON.stringify(getArrayOfTodoLists().filter((item) => item.name !== name))
    );

    setCurrentTodoList("");
  }

  function init() {
    if (hasTodoLists()) {
      //
    } else {
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
  };
}
