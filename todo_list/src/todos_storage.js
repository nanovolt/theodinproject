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

  function getCurrentTodoList() {
    return localStorage.getItem("currentTodoList");
  }

  function setCurrentTodoList(todoList) {
    localStorage.setItem("currentTodoList", todoList);
  }

  function addTodoList(name) {
    const array = getArrayOfTodoLists();

    const todoList = {
      name: `${name}`,
      todos: [],
    };

    array.push(todoList);
    // console.log(JSON.stringify(array));
    localStorage.setItem("ArrayOfTodoLists", JSON.stringify(array));
    setCurrentTodoList(name);
  }

  function deleteTodoList(name) {
    // console.log(getArrayOfTodoLists().filter((item) => item.name !== name));
    console.log(
      JSON.stringify(getArrayOfTodoLists().filter((item) => item.name === name))
    );
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

    // console.log(getCurrentTodoList());
    // console.log(getArrayOfTodoLists());
  }

  function isNotPresent(name) {
    const arr = getArrayOfTodoLists();
    if (arr.filter((todo) => todo.name === name).length === 0) {
      return true;
    }

    return false;
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
  };
}
