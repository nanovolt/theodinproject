const express = require("express");
const path = require("path");

const dir = path.join(__dirname, "public");
console.log(dir);

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(dir, "index.html"));
});
app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(dir, "contact-me.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(dir, "about.html"));
});
app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(dir, "404.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`exress server at port: ${PORT}`);
});
