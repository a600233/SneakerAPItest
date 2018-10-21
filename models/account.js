let mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
        account_name: String,
        account_id: Number,
        gender: String,
        selling: {
                brand:String,
                series:String,
                name:String,
                size:Number,
                },
        buying: {
            brand:String,
            series:String,
            name:String,
            size:Number,
        },
        following_sneakers: {
            brand:String,
            series:String,
            name:String,
            size:Number,
        },
        registration_date: Date,
    },
    { collection: 'accountdb' });

module.exports = mongoose.model('Account', AccountSchema);
