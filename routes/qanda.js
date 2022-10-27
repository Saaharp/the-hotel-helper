const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const QAndAController = require("../controllers/qanda");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/createqa", upload.single("file"), QAndAController.createQA);
router.post('/q', QAndAController.getSearch)
router.post('/save/:id', QAndAController.saveQA)
router.delete("/deleteQA/:id", QAndAController.deleteQA);
router.get('/editQA/:id', QAndAController.editQA)


module.exports = router;
