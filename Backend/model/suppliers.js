const mongoose = require('mongoose');

const suppSchema = new mongoose.Schema({
    companyName: {
        type: String,
        unique: true,
    },
    officialEmailId: {
        type: String,
        unique: true,
    },
    contactNumber: Number,
    durationOfContract: Number,
    dor: String,
});

const SuppModel = mongoose.model('Supplier', suppSchema);

(async () => {
    await SuppModel.init();
})();

module.exports = SuppModel;