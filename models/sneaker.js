let mongoose = require('mongoose');

let SneakerSchema = new mongoose.Schema({
        brand: String,
        series: String,
        name: String,
        size: Number,
        color: String,
        original_price: Number,
        article_number: Number,
        release_date: Date
    },
    { collection: 'sneakserdb' });

module.exports = mongoose.model('Sneaker', SneakerSchema);
