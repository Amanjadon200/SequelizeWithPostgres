const express = require("express");
const {
  userCreate,
  userInsertedMultiple,
  getAllUsersDetails,
  getUser,
  updateUser,
} = require("./Models/userService");
const { createStudent, fetchStudent } = require("./Models/Student/student.service");
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
app.get("/getAllUser", async (req, res) => {
  try {
    const data = await getAllUsersDetails();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
app.get("/getUser", async (req, res, next) => {
  try {
    const data = await getUser();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
app.post("/updateUser", async (req, res, next) => {
  try {
    const data = await updateUser(req.body.name, req.body.age);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
app.post("/createStudent", async (req, res) => {
  try {
    const data = await createStudent(req.body.users);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
app.get("/fetchStudent", async (req, res) => {
  try {
    const data = await fetchStudent();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});
// this middleware is defined if there is not route exist
app.use((req, res) => {
  res.status(404).send({ message: `route is not defined"` });
});
