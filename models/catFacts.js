const mongoose = require("mongoose");

const catFactSchema = new mongoose.Schema({
    fact: String,
    fetchedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("CatFact", catFactSchema);
