const router = require('express').Router();
let Lead = require('../models/lead.model');
const CsvParser = require("json2csv").Parser;

router.route('/').get((req, res) => {
  Lead.find()
    .then(leads => res.end(JSON.stringify({"success" : true, "code" : 200, "data" : leads})))
    .catch(err => res.end(JSON.stringify({"success" : false, "code" : 400, "message" : err})));
});

router.route('/admin').get((req, res) => {
  Lead.find().lean()
    .then(leads => {
      const csvFields = ["name", "email", "message"];
      const csvParser = new CsvParser({ csvFields });
      const csvData = csvParser.parse(leads);
  
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
  
      res.status(200).end(csvData);
    
    })
    .catch(err => res.end(JSON.stringify({"success" : false, "code" : 400, "message" : err})));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message

  const newLead = new Lead({name, email, message});

  newLead.save()
    .then(() => res.end(JSON.stringify({"success" : true, "code" : 200, "message" : "Lead Added Successfully"})))
    .catch(err => res.end(JSON.stringify({"success" : false, "code" : 400, "message" : err})));
});

module.exports = router;