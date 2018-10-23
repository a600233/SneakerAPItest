let Selling = require('../models/selling');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/sellingdb');

let db = mongoose.connection;
var mongodbUri ='mongodb://a600233:cs748596123@ds119692.mlab.com:19692/heroku_kcg1tlsl';
mongoose.connect(mongodbUri);
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});
router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Selling.find(function(err, selling) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(selling,null,5));
    });
}
router.findOneById = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Selling.find({ "_id" : req.params._id },function(err, selling) {
        if (err)
            res.json({ message: 'Selling Info NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(selling,null,5));
    });
}
router.findSellingInfo = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var keywrod = req.params.keyword;
    var _filter1 = {
        $or:[
            {brand:{$regex:keywrod,$options:'$i'}},
            {series:{$regex:keywrod,$options:'$i'}},
            {name:{$regex:keywrod,$options:'$i'}},
            {color:{$regex:keywrod,$options:'$i'}},
            {article_number:{$regex:keywrod,$options:'$i'}},
        ]
    }
    Selling.find(_filter1).limit(5).sort({'selling_price':1}).exec(function (err,selling) {
        if(err)
            res.json({message: 'Sneakers Selling Info NOT Found!',errmsg: err});
        else
            res.send(JSON.stringify(selling,null,5));
    })
}

router.sortAllPrice = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    Selling.find().limit(10).sort({'selling_price':1}).exec(function (err,selling) {
        if(err)
            res.json({errmsg: err});
        else
            res.send(JSON.stringify(selling,null,5));
    })
}
router.findSellingSneakerInfoByPrice = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var keyword1 =req.params.keyword1;
    var keyword2 =req.params.keyword2;
    Selling.aggregate([{
        $lookup: {
            from: "sneakerdb",
            localField: "article_number",
            foreignField: "article_number",
            as: "Sneakers Info:"
        }
    },{
        $project:{
            "brand": 0,
            "series": 0,
            "name":0,
            "article_number":0
        }
    },{
        $match:{
            "selling_price":{
                $gte : keyword1, $lte : keyword2
            }
        }
    }],function (err,selling) {
        if(err)
            res.json({message: 'Selling Sneakers Info NOT Found!',errmsg: err});
        else
            res.send(JSON.stringify(selling, null, 5));
    });

}
router.incrementSellingAmount = (req, res) => {

    Selling.findById(req.params._id, function(err,selling) {
        if (err)
            res.json({ message: 'Selling Info NOT Found!', errmsg : err } );
        else {
            selling.upvotes += 1;
            selling.save(function (err) {
                if (err)
                    res.json({ message: 'Selling Amounts are NOT Added!', errmsg : err } );
                else
                    res.json({ message: 'Selling Amounts are Successfully Added!', data: selling });
            });
        }
    });
}
router.addSelling = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var selling = new Selling();

    selling.brand = req.body.brand;
    selling.series = req.body.series;
    selling.name = req.body.name;
    selling.size = req.body.size;
    selling.color = req.body.color;
    selling.article_number = req.body.article_number;
    selling.selling_price = req.body.selling_price;
    selling.account_name = req.body.account_name;

    selling.save(function(err) {
        if (err)
            res.json({ message: 'Selling Info NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Selling Info Successfully Added!', data: selling });
    });
}
router.deleteSelling = (req, res) => {

    Selling.findByIdAndRemove(req.params._id, function(err) {
        if (err)
            res.json({ message: 'Selling Info NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Selling Info Successfully Deleted!'});
    });
}

module.exports = router;