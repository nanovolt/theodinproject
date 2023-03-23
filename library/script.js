function Book(id, title, pages, isRead) {
  this.id = id;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}
Book.prototype.toggle = function toggle() {
  // this.isRead ? (this.isRead = false) : (this.isRead = true);
  if (this.isRead) {
    this.isRead = false;
  } else {
    this.isRead = true;
  }
};

let myLibrary = [];
const b1 = new Book(0, "Harry Potter", 320, true);
const b2 = new Book(1, "The Hobbit", 240, false);
const b3 = new Book(2, "The Tower", 480, false);
myLibrary.push(b1);
myLibrary.push(b2);
myLibrary.push(b3);

const library = document.querySelector(".library");

const toggleButtons1 = document.querySelectorAll(".toggle");
toggleButtons1.forEach((butt) => {
  butt.addEventListener("click", (e) => {
    const { id } = e.target.parentElement.dataset;
    myLibrary[+id].toggle();
    const parent = e.target.parentElement;
    parent.querySelector(".isRead").textContent = myLibrary[+id].isRead;
  });
});

const removeButtons1 = document.querySelectorAll(".remove");
removeButtons1.forEach((butt) => {
  butt.addEventListener("click", (e) => {
    const { id } = e.target.parentElement.dataset;
    document.querySelector(`[data-id="${id}"]`).remove();
    myLibrary = myLibrary.filter((item) => item.id !== +id);
  });
});

function addBookToLibrary(book) {
  myLibrary.push(book);

  const bookItem = document.createElement("div");
  const title = document.createElement("div");
  const pages = document.createElement("div");
  const isRead = document.createElement("div");
  const toggle = document.createElement("button");
  const remove = document.createElement("button");

  bookItem.classList.add("book");
  title.classList.add("title");
  pages.classList.add("pages");
  isRead.classList.add("isRead");
  remove.classList.add("remove");
  toggle.classList.add("toggle");
  title.textContent = book.title;
  pages.textContent = book.pages;
  isRead.textContent = book.isRead;
  remove.textContent = "Remove";
  toggle.textContent = "Toggle";

  library.appendChild(bookItem);
  bookItem.dataset.id = myLibrary.length - 1;
  bookItem.appendChild(title);
  bookItem.appendChild(pages);
  bookItem.appendChild(isRead);
  bookItem.appendChild(toggle);
  bookItem.appendChild(remove);

  const toggleButton = document.querySelectorAll(".toggle");
  toggleButton[toggleButton.length - 1].addEventListener("click", (e) => {
    const { id } = e.target.parentElement.dataset;
    myLibrary[+id].toggle();
    const parent = e.target.parentElement;
    parent.querySelector(".isRead").textContent = myLibrary[+id].isRead;
  });

  const removeButton = document.querySelectorAll(".remove");
  removeButton[toggleButton.length - 1].addEventListener("click", (e) => {
    const { id } = e.target.parentElement.dataset;
    document.querySelector(`[data-id="${id}"]`).remove();
    myLibrary = myLibrary.filter((item) => item.id !== +id);
  });
}

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formdata = new FormData(form);
  let title = formdata.get("title");
  const pages = formdata.get("pages");
  const isRead = formdata.get("isRead");
  if (title === "") {
    title = "No title";
  }
  const bookData = new Book(myLibrary.length, title, +pages, Boolean(+isRead));
  addBookToLibrary(bookData);
});
