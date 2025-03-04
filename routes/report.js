const express = require('express');
const router = express.Router();
const { controller } = require('../controllers/reportController');

router.post('/createReport', controller.createReport);
router.post('/updateReport', controller.updateReport);
router.post('/deleteReport', controller.deleteReport);
router.get('/getReportById', controller.getReportById);
router.get('/getReportByIds', controller.getReportByIds);
router.get('/getAllReports', controller.getAllReports);

router.get('/getAllFilterReports', controller.getAllFilterReports);
router.get('/getPendingQtyFiltered', controller.getPendingQtyFiltered);
router.post('/bulkAddDocuments', controller.bulkAddDocuments);

module.exports = router;
