const auth = require("./routes/auth");
const users = require("./routes/users");
const feed = require("./routes/feed");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/tokens", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/feed", feed);

const port = 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));
