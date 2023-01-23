const { v4: uuidv4 } = require("uuid");

let users = [];

exports.getUsers = (req, res, next) => {
  res.send(users);
};

exports.createUser = (req, res, next) => {
  const body = req.body;
  const parsedBody = body;
  const userid = uuidv4();
  users.push({ ...parsedBody, id: userid });
  res.send(`user ${parsedBody.firstName} added`);
};

exports.getUser = (req, res, next) => {
  const idToFind = req.params.id;
  const getId = users.find((user) => user.id === idToFind);
  res.send(getId);
};

exports.deleteUser = (req, res, next) => {
  const idToFind = req.params.id;
  users = users.filter((user) => user.id !== idToFind);
  res.send(`user with ${idToFind} deleted`);
};

exports.editUser = (req, res) => {
  const idToFind = req.params.id;
  let getId = users.find((user) => user.id === idToFind);
  let foundId = users[getId];

  getId.firstName = req.body.firstName;
  getId.lastName = req.body.lastName;

  users[getId] = foundId;

  res.send(`user with ${idToFind} edited`);
};
