const mongoose = require('mongoose');

const prodSchema = new mongoose. Schema ({
name: String,
saltComposition: String,
about: String,
use: [String],
sideEffects: [String],
});

const ProdModel = mongoose.model('Product', prodSchema);

(async () => {
await ProdModel.init();
})();

module.exports = ProdModel;