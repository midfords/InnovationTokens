const _ = require("lodash");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const { Transaction } = require("../models/transaction");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.post("/send", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { amount, recipientId } = req.body;

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
        message: "",
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

router.post("/spend", auth, async (req, res) => {});

router.post("/distribute", auth, async (req, res) => {});

module.exports = router;
