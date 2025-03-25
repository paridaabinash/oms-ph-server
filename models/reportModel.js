const { db } = require('../config/db'); // CouchDB instance

const designDoc = 'report'; // Design document
const pendingReportDesignDoc = 'reportFilter';

const Report = {
    getMaximumUID: async (view) => {
        const response = await db.view(designDoc, view, { descending: true, limit: 1 });
        return response && response.rows && response.rows.length > 0 ? response.rows[0].id : 0;
    },
    getMaximumArtID: async (view) => {
        const response = await db.view(designDoc, view, { descending: true, limit: 1 });
        return response?.rows?.length > 0 ? response.rows[0].value : 0;
    },
    createUpdateReport: async (data) => {
        const response = await db.insert(data);
        if (!response)
            return null;
        data._id = response.id;
        data._rev = response.rev;
        return data ?? null;
    },
    deleteReport: async (id, rev) => {
        const response = await db.destroy(id, rev);
        return response ?? null;
    },
    getReportById: async (id) => {
        const response = await db.get(id);
        return response ?? null;
    },
    getReportByIds: async (ids, view, include_doc = true) => {
        const response = await db.view(designDoc, view, { keys: ids, include_docs: include_doc });
        return response && response.rows ? response.rows : null;
    },
    getAllReports: async (view) => {
        const response = await db.view(designDoc, view, { include_docs: true, descending: true });
        return response && response.rows ? response.rows : null;
    },
    getAllFilterReports: async(view, include_docs, start = null, end = null) => {
        let queryOptions = { include_docs: include_docs, descending: true };

        if (start != "undefined" && end != "undefined") { // in case of descending true reverse start end keys
            queryOptions.startkey = parseInt(end);
            queryOptions.endkey = parseInt(start);
        }

        const response = await db.view(pendingReportDesignDoc, view, queryOptions);

        return response && response.rows ? response.rows : null;
    },
    getPendingQtyFiltered: async (view) => {
        const response = await db.view(pendingReportDesignDoc, view, { group: true });
        return response && response.rows ? response.rows : null;
    },
    bulkAddDocuments: async (docs) => {
        const response = await db.bulk({ docs: docs });
        return response ? response : null;
    },
}

module.exports = Report;
