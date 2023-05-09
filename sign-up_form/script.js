// trim().split(/[\s]+/).join(" ");
const form = document.querySelector("form");

document.querySelector("form").addEventListener("submit", (e) => {
  const formData = new FormData(form);

  for (const entry of formData.entries()) {
    console.log(entry);
  }

  e.preventDefault();
});
