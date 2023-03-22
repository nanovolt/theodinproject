const myLibrary = [];

function Book(title, pages, isRead) {
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  const formrdata = new FormData(form);
  console.log(formrdata.get("title"));
  console.log(formrdata.get("pages"));
  console.log(formrdata.get("isRead"));
  e.preventDefault();
});
