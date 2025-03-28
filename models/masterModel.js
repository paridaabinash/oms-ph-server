const { db } = require('../config/db'); // CouchDB instance

const designDoc = 'master'; // Design document

const Master = {
    getAllLinkingMaster: async (view) => {
        const response = await db.view(designDoc, view, { include_docs: true, descending: true });
        return response && response.rows ? response.rows : null;
    },
    getMasterById: async (id) => {
        const response = await db.get(id);
        return response ?? null;
    },
    getLinkingMasterByIds: async (ids, view, include_doc = true) => {
        const response = await db.view(designDoc, view, { keys: ids, include_docs: include_doc });
        return response && response.rows ? response.rows : null;
    },
    createUpdateLinkingMaster: async (data, revised_id = "") => {
        let response;
        if (revised_id) {
            const newDoc = { ...data, _id: revised_id };
            delete newDoc._rev;
            response = await db.insert(newDoc); // Save new document
            await db.destroy(data._id, data._rev); // Delete the old document
        } else {
            response = await db.insert(data);
        }
        if (!response)
            return null;
        data._id = response.id;
        data._rev = response.rev;
        return data ?? null;
    },
    deleteLinkingMaster: async (id, rev) => {
        const response = await db.destroy(id, rev);
        return response ?? null;
    }

}

module.exports = Master;
