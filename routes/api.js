var helpers = require('../util/helpers'),
    ga = require('googleanalytics'),
    globals = require('../globals'),
    fs = require('fs');

/**
 * POST
 * sets the account info
 */
exports.account = function(req,res) {
  //test login
  var gaConfig = {
    user: req.body.account_id,
    password: req.body.password
  };

  GA = new ga.GA(gaConfig);
  var data = {
    account_id: gaConfig.user,
    password: gaConfig.password,
    profile: req.body.profile_id
  };
  GA.login(function(err, token) {
    if (err) {
      return res.json({error:'invalid login'});
    } else {
      //save it
      fs.writeFile('./private/account.json', JSON.stringify(data),'utf-8', function(err){
        console.log(err);
      });
      return res.json({error:''});
    }
  });
};
/**
 * GET checks if GA account is valid
 */
exports.verify = function(req,res) {
  if (!fs.existsSync('./private/account.json')) {
    return res.json({error:'invalid login'});
  }
  var str = fs.readFileSync('./private/account.json', 'utf8'),
      config = JSON.parse(str),
      gaConfig = {user:config.account_id, password: config.password},
      GA = new ga.GA(gaConfig);

  GA.login(function(err, token) {
    if (err) {
      return res.json({error:'invalid login'});
    } else {
      return res.json({on: globals.on});
    }
  });
};





