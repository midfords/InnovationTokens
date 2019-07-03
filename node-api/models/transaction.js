const mongoose = require("mongoose");
//const Joi = require("joi");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: {
    type: String,
    required: true
  }
});

const transactionSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ["spend", "send", "dist"],
    required: true
  },
  user: { type: userSchema },
  user2: { type: userSchema },
  description: { type: String, maxlength: 140 },
  amount: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
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
