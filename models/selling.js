let mongoose = require('mongoose');

let SellingSchema = new mongoose.Schema({
        brand: String,
        series: String,
        name: String,
        size: Number,
        article_number: String,
        selling_price: Number,
        account_name: String
    },
    { collection: 'sellingdb' });

module.exports = mongoose.model('Selling', SellingSchema);
