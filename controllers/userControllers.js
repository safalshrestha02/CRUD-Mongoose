// const { v4: uuidv4 } = require("uuid");

let Users = require("../model/user");

exports.getUsers = async (req, res, next) => {
  const users = await Users.find();
  if (!users) return res.status(204).json({ message: "no users found" });
  res.send(users);
};

exports.createUser = async (req, res, next) => {
  if (!req?.body?.firstName || !req?.body?.lastName) {
    return res.status(400).json({ message: "first and lastname requires" });
  }

  try {
    const result = await Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res, next) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "id is required" });

  const user = await Users.findOne({ _id: req.params.id }).exec();

  if (!user) {
    return res.status(204).json({ message: `${req.params.id} not found` });
  }

  res.send(user);
};

exports.deleteUser = async (req, res, next) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "id is required" });

  const user = await Users.findOne({ _id: req.body.id }).exec();

  if (!user) {
    return res.status(204).json({ message: `${req.body.id} not found` });
  }

  const result = await user.deleteOne({ _id: req.body.id });

  res.send(result);
};

exports.editUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "id is required" });
  }

  const user = await Users.findOne({ _id: req.body.id }).exec();

  if (!user) {
    return res.status(204).json({ message: `${req.body.id} not found` });
  }

  if (req?.body?.firstName) user.firstName = req.body.firstName;
  if (req?.body?.lastName) user.lastName = req.body.lastName;

  const result = await user.save();

  res.json(result);
};
