const _ = require("lodash");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const {
  Transaction,
  validateSend,
  validateSpend,
  validateDistribute
} = require("../models/transaction");
const { User, validate: validateUser } = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.post("/spend", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { amount, message } = req.body;

    const { error } = validateSpend(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(_id);
    if (!user) return res.status(400).send("Invalid user.");

    if (amount > user.balance)
      return res.status(400).send("Insufficient balance.");

    const manager = await User.findById(user.managerId);
    if (!manager) return res.status(400).send("Manager not found.");

    try {
      const transaction = new Transaction({
        kind: "spend",
        sender: {
          _id: user._id,
          first: user.first,
          last: user.last
        },
        message,
        amount,
        hash: ""
      });

      await new Fawn.Task()
        .save("transactions", transaction)
        .update(
          "users",
          { _id: user._id },
          {
            $inc: { balance: parseInt(amount) * -1 }
          }
        )
        .run();

      res.send(transaction);
    } catch (err) {
      res.status(500).send("Transaction failed.");
    }
  } catch (err) {
    console.log(err);
    if (err) return res.status(400).send(`Transaction was rejected.`);
  }
});

router.post("/send", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { amount, message, recipientId } = req.body;

    const { error } = validateSend(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const [sender, recipient] = await Promise.all([
      User.findById(_id),
      User.findById(recipientId)
    ]);

    if (!sender) return res.status(400).send("Invalid sender.");

    if (amount > sender.balance)
      return res.status(400).send("Insufficient balance.");

    if (!recipient) return res.status(400).send("Invalid recipient.");

    try {
      const transaction = new Transaction({
        kind: "send",
        sender: {
          _id: sender._id,
          first: sender.first,
          last: sender.last
        },
        recipient: {
          _id: recipient._id,
          first: recipient.first,
          last: recipient.last
        },
        message,
        amount,
        hash: ""
      });

      await new Fawn.Task()
        .save("transactions", transaction)
        .update(
          "users",
          { _id: sender._id },
          {
            $inc: { balance: parseInt(amount) * -1 }
          }
        )
        .update(
          "users",
          { _id: recipient._id },
          {
            $inc: { balance: parseInt(amount) }
          }
        )
        .run();

      res.send(transaction);
    } catch (err) {
      res.status(500).send("Transaction failed.");
    }
  } catch (err) {
    console.log(err);
    if (err) return res.status(400).send(`Transaction was rejected.`);
  }
});

router.post("/distribute", [auth, admin], async (req, res) => {
  try {
    const { _id } = req.user;
    const { amount } = req.body;

    const { error } = validateDistribute(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const sender = await User.findById(_id);
    if (!sender) return res.status(400).send("Invalid sender.");

    try {
      const transaction = new Transaction({
        kind: "distribute",
        sender: {
          _id: sender._id,
          first: sender.first,
          last: sender.last
        },
        message: "",
        amount,
        hash: ""
      });

      await new Fawn.Task()
        .save("transactions", transaction)
        .update("users", { roles: [] }, { $inc: { balance: parseInt(amount) } })
        .options({ multi: true })
        .run();

      res.send(transaction);
    } catch (err) {
      res.status(500).send("Transaction failed.");
    }
  } catch (err) {
    console.log(err);
    if (err) return res.status(400).send(`Transaction was rejected.`);
  }
});

module.exports = router;
