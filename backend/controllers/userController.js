const User = require("../models/userModel");

async function getUser(req, res) {
  const { id } = req.params;
  try {
    const singleUser = await User.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (err) {
    console.log("User not founds", err);
    res.status(500).json({ error: "Internal error..." });
  }
}

// async function deleteUser(req, res) {
//   const { id } = req.params;
//   try {
//     const removeUser = await User.findByIdAndDelete({ _id: id });
//     res.status(200).json({
//       message: "User deleted successfully...",
//       userRemove: removeUser,
//     });
//   } catch (err) {
//     console.log("User not founds", err);
//     res.status(500).json("User not found...");
//   }
// }

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const removeUser = await User.findByIdAndDelete(id);
    if (removeUser) {
      res.status(200).json({
        message: "User deleted successfully...",
        userRemove: removeUser,
      });
    } else {
      // If removeUser is null, the user with the provided ID was not found
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.log("Error deleting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    console.log("User not founds", err);
    res.status(500).json({ error: "Internal error..." });
  }
}

async function createNewUser(req, res) {
  const { name, email, age } = req.body;

  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: userAdded });
  } catch (error) {
    console.log(error);
    res.status(402).json({ error: "Failed to create user" });
  }
}

async function updateUser(req, res) {
  const { id, name, email, age } = req.body;

  try {
    const userUpdate = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    if (!userUpdate) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User Updated Successfully", user: userUpdate });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
}

module.exports = {
  getAllUsers,
  createNewUser,
  getUser,
  deleteUser,
  updateUser,
};
