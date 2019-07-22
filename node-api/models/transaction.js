const mongoose = require("mongoose");
//const Joi = require("joi");

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

// function validateTransaction(trans) {
//   const schema = {
//     name: Joi.string()
//       .min(1)
//       .max(255)
//       .required(),
//     email: Joi.string()
//       .min(1)
//       .max(255)
//       .required()
//       .email(),
//     password: Joi.string()
//       .min(5)
//       .max(255)
//       .required()
//   };

//   return Joi.validate(trans, schema);
// }

exports.Transaction = Transaction;
//exports.validate = validateUser;
