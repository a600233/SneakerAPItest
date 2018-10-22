let Sneaker = require('../models/sneaker');
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
router.findAllSneaker = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Sneaker.find(function(err, sneaker) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(sneaker,null,5));
    });
}

router.findSpecificSneakerInfo = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var keywrod = req.params.keywrod;
    var _filter1 = {
        $or:[
            {brand:{$regex:keywrod,$options:'$i'}},
            {series:{$regex:keywrod,$options:'$i'}},
            {name:{$regex:keywrod,$options:'$i'}},
            {color:{$regex:keywrod,$options:'$i'}},
            {article_number:{$regex:keywrod,$options:'$i'}},
        ]
    }
    Sneaker.find(_filter1).limit(5).exec(function (err,sneaker) {
        if(err)
            res.json({message: 'Sneaker Info NOT Found!',errmsg: err});
        else
            res.send(JSON.stringify(sneaker,null,5));
    })
}
router.findSneakerIsSelling = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    Sneaker.aggregate([{
        $lookup: {
            from: "sellingdb",
            localField: "article_number",
            foreignField: "article_number",
            as: "Sneakers are selling:"
        }
    }],function (err,sneaker) {
        if(err)
            res.json({errmsg: err});
        else
            res.send(JSON.stringify(sneaker, null, 5));
    });

}
router.addSneaker = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var sneaker = new Sneaker();

    sneaker.brand = req.body.brand;
    sneaker.series = req.body.series;
    sneaker.name = req.body.name;
    sneaker.color = req.body.color;
    sneaker.original_price = req.body.original_price;
    sneaker.article_number = req.body.article_number;
    sneaker.release_date = req.body.release_date;

    sneaker.save(function(err) {
        if (err)
            res.json({ message: 'Sneaker Info NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Sneaker Info Successfully Added!', data: sneaker });
    });
}
router.deleteSneaker = (req, res) => {

    Sneaker.findByIdAndRemove(req.params.article_number, function(err) {
        if (err)
            res.json({ message: 'Sneaker Info NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Sneaker Info Successfully Deleted!'});
    });
}

module.exports = router;