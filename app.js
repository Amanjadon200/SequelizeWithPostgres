const express = require("express");
const { userCreate, userInsertedMultiple } = require("./Models/userService");
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("server is listening at 3000 port number");
});
app.post("/user", async (req, res) => {
  try {
    const data = await userCreate(req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
app.post("/addMultipleUser", async (req, res) => {
  try {
    const data = await userInsertedMultiple(req.body.users);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
