const Report = require('../models/reportModel');
const orderView = 'orderReport';
const artView = 'artReport';



const controller = {
    createReport: async (req, res) => {
        try {
            const repdata = req.body;
            if (repdata.type == 'order_report') {
                let maxid = await Report.getMaximumUID(orderView);
                if (maxid != 0)
                    maxid = maxid.split('/').slice(-1)[0];
                repdata.wo_number = "WO/" + new Date().getUTCFullYear().toString().slice(-2) + "/" + (parseInt(maxid) + 1).toString();
                repdata._id = repdata.wo_number;

                // 
                //let pm_data = {};
                //pm_data.type = "pm_report";
                //pm_data.wo_number = repdata.wo_number;
                //pm_data.brand_name = repdata.brand_name;
                //pm_data.dye = repdata.dye;
                //pm_data.carton_size_inner = repdata.carton_size_inner;
                //pm_data.carton_size_outer = repdata.carton_size_outer;
                //pm_data.pack_type = repdata.pack_type;
                //pm_data.order_qty = repdata.order_qty;
                //pm_data.order_type = repdata.order_type;

                //if (repdata.ctn_required == "Required") {
                //    pm_data.pm_item = "Unit Carton";
                //    pm_data._id = "pm_" + Date.now();
                //    await Report.createUpdateReport(pm_data);
                //}

                //if (repdata.product_type.toLowerCase().includes("lotion"))
                //    pm_data.pm_item = "Label";
                //else if (repdata.product_type.toLowerCase().includes("ointment"))
                //    pm_data.pm_item = "Tube";
                //else if (repdata.product_type.toLowerCase().includes("tablet") || repdata.product_type.toLowerCase().includes("capsule"))
                //    pm_data.pm_item = "Foil";

                //pm_data._id = "pm_" + Date.now();
                //await Report.createUpdateReport(pm_data);

                //pm_data._id = "pm_" + Date.now();
                //pm_data.pm_item = "Carton";
                //await Report.createUpdateReport(pm_data);

            }
            else if (repdata.type == 'pm_report') {
                repdata._id = "pm_" + Date.now();
            }
            else if (repdata.type == 'art_report') {
                let maxid = await Report.getMaximumArtID(artView);
                if (maxid != 0)
                    maxid = maxid.split('/')[2];
                repdata.artwork_code = "WEL/" + new Date().getUTCFullYear().toString().slice(-2) + "/" + (parseInt(maxid) + 1).toString();
                repdata._id = repdata.artwork_code;
                repdata.carton_artwork_code_inner = repdata.artwork_code + "/CI";
                repdata.carton_artwork_code_outer = repdata.artwork_code + "/CO";
                //product_type
                //repdata.tube_sticker_foil_artwork_code = repdata.artwork_code + "";
            }
            else if (repdata.type == 'rm_report') {
                repdata._id = "rm_" + Date.now();
            }

            const response = await Report.createUpdateReport(repdata);
            return res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateReport: async (req, res) => {
        try {
            const repdata = req.body;
            const response = await Report.createUpdateReport(repdata);
            return res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteReport: async (req, res) => {
        try {
            const { _id, _rev } = req.body;
            const response = await Report.deleteReport(_id, _rev);
            return res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getReportById: async (req, res) => {
        try {
            const { _id } = req.query;
            const response = await Report.getReportById(_id);
            return res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getReportByIds: async (req, res) => {
        try {
            const { _ids, view, include_doc } = req.query;
            const idsArray = Array.isArray(_ids) ? _ids : [_ids];
            const response = await Report.getReportByIds(idsArray, view, include_doc);
            return res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllReports: async (req, res) => {
        try {
            const { view } = req.query;
            const response = await Report.getAllReports(view);
            if (response)
                return res.status(200).json(response)
            else
                return null;
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllFilterReports: async (req, res) => {
        try {
            const { view, include_docs, start, end } = req.query;
            const response = await Report.getAllFilterReports(view, include_docs, start, end);
            if (response)
                return res.status(200).json(response)
            else
                return null;
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPendingQtyFiltered: async (req, res) => {
        try {
            const { view } = req.query;
            const response = await Report.getPendingQtyFiltered(view);
            if (response)
                return res.status(200).json(response)
            else
                return null;
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    bulkAddDocuments: async (req, res) => {
        try {
            const docs = req.body;
            const response = await Report.bulkAddDocuments(docs);
            if (response)
                return res.status(200).json(response)
            else
                return null;
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

module.exports = { controller };