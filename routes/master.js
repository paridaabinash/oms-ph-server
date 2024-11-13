const express = require('express');
const router = express.Router();
const { controller } = require('../controllers/masterController');
const multer = require('multer');

const storage = multer.memoryStorage(); // Or you can use diskStorage
const upload = multer({ storage: storage });

router.get('/getOrderMaster', controller.getOrderMaster);
router.post('/setOrderMaster', controller.setOrderMaster);
router.get('/getBom', controller.getBom);
router.post('/updateBom', controller.updateBom);

router.post('/createLinkingMaster', controller.createLinkingMaster);
router.post('/updateLinkingMaster', controller.updateLinkingMaster);
router.post('/deleteLinkingMaster', controller.deleteLinkingMaster);
router.get('/getLinkingMasterById', controller.getLinkingMasterById);
router.get('/getLinkingMasterByIds', controller.getLinkingMasterByIds);
router.get('/getAllLinkingMaster', controller.getAllLinkingMaster);


router.get('/getImage', controller.getImage);
router.post('/uploadImage', upload.any(), controller.uploadImage);

module.exports = router;
