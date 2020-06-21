const express = require("express");
const parserController = require("../controllers/parser");
const router = express.Router();

router.get("/", parserController.getPageData);

module.exports = router;
