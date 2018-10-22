var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const selling = require("./routes/selling");
const account = require("./routes/account");
const order = require("./routes/order");
const sneaker = require("./routes/sneaker");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/selling', selling.findAll);
app.get('/selling/:_id', selling.findOneById);
app.get('/selling/info/:keyword', selling.findSellingInfo);
app.get('/selling/sort/:selling_price', selling.sortAllPrice);
app.post('/selling',selling.addSelling);
app.delete('/selling/:_id', selling.deleteSelling);
app.get('/selling/show/:keyword', selling.findSellingSneakerInfoByPrice);


app.get('/account',account.findAllAccount);
app.post('/account',account.addAccount);
app.delete('/account/:account_id', account.deleteAccount);
app.get('/account/:account_id',account.findOneByAccountId);
app.get('/account/an/:account_name',account.findAccountByAccountName);
app.get('/account/s_a/show',account.findSellingInfoByAccount);
app.get('/account/b_a/show',account.findBuyingInfoByAccount);

app.get('/order',order.findAllOrder);
app.post('/order',order.addOrder);
app.delete('/order/:_id', order.deleteOrder);
app.get('/order/:_id',order.findOrderById);
app.get('/order/b_n/:account_name',order.findOrderByBuyerName);
app.put('/order/:_id/amount',order.incrementAmounts);

app.get('/sneaker',sneaker.findAllSneaker);
app.post('/sneaker',sneaker.addSneaker);
app.delete('/sneaker/:_id', sneaker.deleteSneaker);
app.get('/sneaker/s_s/:keyword1', sneaker.findSneakerIsSelling);
app.get('/sneaker/find/:keyword',sneaker.findSpecificSneakerInfo);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;