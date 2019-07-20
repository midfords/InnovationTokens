const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  }
});

const transactionSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ["spend", "send", "distribute"],
    required: true
  },
  sender: { type: userSchema },
  recipient: { type: userSchema },
  message: { type: String, maxlength: 240 },
  amount: {
    type: Number,
    required: true
  },
  hash: {
    type: String,
    maxlength: 1024
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

function validateSendTransaction(transaction) {
  const schema = {
    recipientId: Joi.objectId().required(),
    amount: Joi.number()
      .integer()
      .min(1)
      .required(),
    message: Joi.string()
      .max(240)
      .allow("")
  };

  return Joi.validate(transaction, schema);
}

function validateSpendTransaction(transaction) {
  const schema = {
    message: Joi.string()
      .min(1)
      .max(240)
      .required(),
    amount: Joi.number()
      .integer()
      .min(1)
      .required()
  };

  return Joi.validate(transaction, schema);
}

function validateDistributeTransaction(transaction) {
  const schema = {
    amount: Joi.number()
      .integer()
      .min(1)
      .required()
  };

  return Joi.validate(transaction, schema);
}

exports.Transaction = Transaction;
exports.validateSend = validateSendTransaction;
exports.validateSpend = validateSpendTransaction;
exports.validateDistribute = validateDistributeTransaction;
