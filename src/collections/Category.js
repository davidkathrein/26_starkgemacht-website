"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var payload_1 = require("payload");
exports.Category = {
    slug: 'category',
    labels: {
        singular: 'Kategorie',
        plural: 'Kategorien',
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'slug', 'updatedAt'],
    },
    access: {
        read: function () { return true; },
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Name',
        },
        (0, payload_1.slugField)({ fieldToUse: 'name' }),
        {
            name: 'description',
            type: 'textarea',
            label: 'Beschreibung',
            admin: {
                description: 'Kurze Beschreibung der Kategorie',
            },
        },
    ],
    timestamps: true,
};
