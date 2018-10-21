let Selling = require('../models/selling');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/sellingdb');

let db = mongoose.connection;
var mongodbUri ='mongodb://a600233:cs748596123@ds225703.mlab.com:25703/sellingdb';
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
router.findBrand = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var keywrod1 = req.params.brand;
    var _filter1 = {
        $or:[
            {brand:{$regex:keywrod1,$options:'$i'}}
        ]
    }
    Selling.find(_filter1).limit(5).exec(function (err,selling) {
        if(err)
            res.json({message: 'Brand Info NOT Found!',errmsg: err});
        else
            res.send(JSON.stringify(selling,null,5));
    })
}
router.findName = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var keywrod2 = req.params.name;
    var _filter2 = {
        $or:[
            {name:{$regex:keywrod2,$options:'$i'}},
        ]
    }

    Selling.find(_filter2).limit(10).sort({'selling_price':1}).exec(function (err,selling) {
        if(err)
            res.json({message: 'Name Info NOT Found!',errmsg: err});
        else
            res.send(JSON.stringify(selling,null,5));
    })
}
router.findSeries = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var keywrod3 = req.params.series;
    var _filter3 = {
        $or:[
            {series:{$regex:keywrod3,$options:'$i'}},
        ]
    }

    Selling.find(_filter3).limit(10).sort({'selling_price':1}).exec(function (err,selling) {
        if(err)
            res.json({message: 'Series Info NOT Found!',errmsg: err});
        else
            res.send(JSON.stringify(selling,null,5));
    })
}
router.findColor = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var keywrod4 = req.params.color;
    var _filter4 = {
        $or:[
            {color:{$regex:keywrod4,$options:'$i'}},
        ]
    }

    Selling.find(_filter4).limit(10).sort({'selling_price':1}).exec(function (err,selling) {
        if(err)
            res.json({message: 'Colors NOT Found!',errmsg: err});
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
router.addSelling = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var selling = new Selling();

    selling.brand = req.body.brand;
    selling.series = req.body.series;
    selling.name = req.body.name;
    selling.size = req.body.size;
    selling.color = req.body.color;
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