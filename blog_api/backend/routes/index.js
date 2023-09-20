const express = require("express");

const router = express.Router();

const user = {
  user: {
    id: 1,
    username: "jay",
  },
};

router.get("/", (req, res) => {
  res.json(req.headers);
});

module.exports = router;
