const mongoose = require('mongoose');

const compSchema = new mongoose.Schema({
    companyName: String,
    whyUs: String,
    vision: String,
    mission: String,
    contactUs: {
        address: String,
        businessHours: String,
        contactNumber: Number,
    },
    quaterDetails: [
        {
            quater: String,
            result: {
                sales: Number,
                otherIncome: Number,
                grossProfit: Number,
                depreciation: Number,
                interest: Number,
                tax: Number,
                netProfit: Number,
            },
        },
    ],
});

const CompModel = mongoose.model('Company', compSchema);

(async () => {
    await CompModel.init();
})();

module.exports = CompModel;