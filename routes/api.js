/*
 * Serve JSON to our AngularJS client
 */
var nforce = require('nforce');

var org = nforce.createConnection({
  clientId: '3MVG9rFJvQRVOvk6_n2pzKrRV2ru3BmcagvHlDKWKl_OD1G3Xyq5rRn4DVeeOdLlSC.NfxFjiG2iq6qLwBUGz',
  clientSecret: '8222817255741332338',
  redirectUri: 'http://localhost:3000/oauth/_callback'
});

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var data = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ],

  "donorInfo": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ],

  "results": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ]
};

// GET

exports.search = function (req, res) {
  var input = req.params.searchInput;
  var args = input.split(" ");
  console.log('ARGUMENTS: ' + args);
  console.log(req.session.oauth);
  var results = [];
  var query = 'SELECT id, FirstName, LastName FROM Contact';
  if (args.length>0) {
    query += ' WHERE ';
    for (var i=0; i<args.length; i++) {
      query += 'FirstName LIKE \'' + args[i] + '%\' OR LastName LIKE \'' + args[i] + '%\' OR ';
    }
    query = query.slice(0, -4);
    console.log('QUERY: ' + query);
  }
  
  org.query(query, req.session.oauth, function(err, resp){
    if(!err && resp.records) {
      console.log(resp);
      res.json({
        results: resp.records
      });
    } else {
      res.json({ error: err },500)
    }
  });
};

exports.getDonorInfo = function (req, res) {
  var id = req.params.id;
  console.log('CONTACT ID FOR DONOR INFO: ' + id);
  var query = "SELECT Account.Name, FirstName, LastName, Email, Phone, MailingStreet, MailingCity, MailingState, MailingPostalCode, MailingCountry, ";
      query += "MobilePhone, HomePhone, OtherPhone, Title, Birthdate, frc__AverageAmount__c, frc__Donor__c, ";
      query += "frc__FirstCloseDate__c, frc__LargestAmount__c, frc__LastCloseDate__c, frc__LastOppAmount__c, ";
      query += "frc__Last_Donation_Date__c, frc__NumberOfClosedOpps__c, frc__OppAmountLastNDays__c, frc__OppAmountLastYear__c, ";
      query += "frc__OppAmountThisYear__c, frc__Soft_Credit_Total__c, frc__TotalOppAmount__c, frc__Household_Name__c, ";
      query += "frc__Engagement_Level__c, frc__First_Donation_Date__c, frc__First_Engagement_Level_Date__c ";
      query += "FROM Contact WHERE id='" + id + "'";
  org.query(query, req.session.oauth, function(err, resp){
    if(!err && resp.records) {
      console.log(resp);
      res.json({
        info: resp.records
      });
    } else {
      res.json({ error: err },500)
    }
  });
};


exports.getDonorSocial = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      posts: data.posts
    });
  } else {
    res.json(false);
  }
};

exports.getDonorToDos = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      items: data.posts
    });
  } else {
    res.json(false);
  }
};

exports.getDonorTimeline = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      timeline: data.posts
    });
  } else {
    res.json(false);
  }
};