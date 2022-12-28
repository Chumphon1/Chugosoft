const express = require("express");
const {getStocks, getPost, deletePost} = require("../controllers/stocks");
const router = express.Router();


router.get("/7-11/:barcode", getStocks);
router.post("/7-11/", getPost)
router.delete("/7-11/:productNo", deletePost)

module.exports = router;