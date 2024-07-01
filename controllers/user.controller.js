const User = require("../Models/user.model");

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `user.controller, getUserById. CastError! user not found with id: ${id}`
      );
      return res.status(404).json({ message: "user not found" });
    }
    console.log(
      `user.controller, getUserById. Error while getting user with id: ${id}`,
      err
    );
    res.status(500).json({ message: "Server error while getting user" });
  }
}

module.exports = { getUserById };
