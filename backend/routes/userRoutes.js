const express = require("express");
const {
  getAllUsers,
  createNewUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/getUser/:id", getUser);
router.get("/", getAllUsers);
router.post("/createUser", createNewUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
