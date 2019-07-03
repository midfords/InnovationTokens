const _ = require("lodash");
const { Transaction } = require("../models/transaction");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let { from, to } = req.query;

  if (from === undefined || to === undefined) {
    from = 0;
    to = 10;
  }

  if (from < 0 || to < 0 || from >= to || to - from > 50)
    res.status(400).send("To / from range must not be larger than 50.");

  const transactions = await Transaction.find().sort({ date: 1 });
  res.send(transactions);
});

router.get("/:id", async (req, res) => {});

module.exports = router;
