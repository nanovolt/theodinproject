export default function TodosStorage() {
  function getArrayOfTodoLists() {
    const array = JSON.parse(localStorage.getItem("ArrayOfTodoLists"));
    if (!array) {
      return [];
    }
    return array;
  }

  function hasTodoLists() {
    if (localStorage.getItem("ArrayOfTodoLists")) {
      return true;
    }
    return false;
  }

  function addTodoList(name) {
    const array = getArrayOfTodoLists();

    const todoList = {
      name: `${name}`,
      todos: [],
    };
    array.push(todoList);
    localStorage.setItem("ArrayOfTodoLists", JSON.stringify(array));
  }

  function getCurrentTodoList() {
    return localStorage.getItem("currentTodoList");
  }

  function setCurrentTodoList(list) {
    localStorage.setItem("currentTodoList", list);
  }

  function init() {
    if (hasTodoLists()) {
      //
    } else {
      setCurrentTodoList("Default");
      addTodoList("Default");
    }

    console.log(getCurrentTodoList());
    console.log(getArrayOfTodoLists());
  }

  function isNotPresent(name) {
    const arr = getArrayOfTodoLists();
    if (arr.filter((todo) => todo.name === name).length === 0) {
      console.log(
        "not present:",
        arr.filter((todo) => todo.name === name)
      );
      return true;
    }
    console.log(
      "present:",
      arr.filter((todo) => todo.name === name)
    );
    return false;
  }

  return {
    getArrayOfTodoLists,
    addTodoList,
    hasTodoLists,
    getCurrentTodoList,
    init,
    isNotPresent,
  };
}
