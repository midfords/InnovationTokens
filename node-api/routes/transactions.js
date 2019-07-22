const _ = require("lodash");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const { Transaction } = require("../models/transaction");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.post("/spend", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { amount, message } = req.body;

    console.log(req.body);

    const user = await User.findById(_id);
    if (!user) return res.status(400).send("Invalid user.");

    const manager = await User.findById(user.managerId);
    if (!manager) return res.status(400).send("Manager not found.");

    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

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

    console.log(req.body);

    const [sender, recipient] = await Promise.all([
      User.findById(_id),
      User.findById(recipientId)
    ]);

    if (!sender) return res.status(400).send("Invalid sender.");
    if (!recipient) return res.status(400).send("Invalid recipient.");

    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

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

router.post("/distribute", auth, async (req, res) => {});

module.exports = router;
