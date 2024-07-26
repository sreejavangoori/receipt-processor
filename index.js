const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const receiptProcessor = require("./routes/receiptProcessor.js");
app.use("/receipts/", receiptProcessor);
