const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const History = require('./models/transactionHistory');
const env = require("dotenv")
mongoose.Promise = global.Promise
env.config()
mongoose.connect(`mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASSWORD}@cluster0.q2vxh.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,{useNewUrlParser: true,useUnifiedTopology: true});
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


  app.get('/', (req, res) => {
    res.render('home',{title:'Welcome | Internet Banking'});
  });
  
  app.get('/transactionHistory', (req, res) => {
    History.find()
      .then((histories) => {
        res.render('transactionHistory', { title: 'Listing Transactions', histories });
      })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
  
  });

  app.get('/transferMoney', (req, res) => {
    res.render('transferMoney',{title:'Transfer Money'});
  });

  app.get('/allUsers', (req, res) => {
    User.find({})
    .then((users) => {
      res.render('allUsers', { title: 'All Account Holders', users });
    })
  .catch(() => { res.send('Sorry! Something went wrong.'); });
  });
  
  
  
  app.post('/', (req, res) => {
        var balance = req.body.amount;
        var name1 = req.body.name1;
        var name2 = req.body.name2;
        const history = new History({
          Creditor: name1,
          Recipient: name2,
          Amount: balance
        });
        history.save();

        User.findOne({Username: name1 }, (err, user) => {
          if (err)
              console.log(err);
          else
              User.findOne({ Username: name2 }, (err, receipt) => {
                  if (err)
                    console.log(err);
                  else{                  
                    user.Balance -= Number(balance);
                    user.save();
                    console.log(user);
                    receipt.Balance += Number(balance);
                    receipt.save();
                    console.log(receipt);
                  }
                  })
                }) 
             
        res.redirect('transactionHistory');
  });
  


module.exports = app;

