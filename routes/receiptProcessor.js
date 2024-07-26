const receiptProcessor = require("../controller/receiptProcessor.js");
const router = require("express").Router();

router.post("/process", receiptProcessor.addReceipt);
router.get("/:receiptId/points", receiptProcessor.getPoints);

module.exports = router;
