'use strict'

const { ReportSchema, validateReport } = require('../models/report');
var Audit = require('../functions/audit');
var date = new Date();

var controller =
{
     /**
     * 
     * 
     * save report
     * 
     * 
     */

    saveReport: async function(req, res)
    {

        //variable for use by the audit
        var user_id = null


        const { error } = validateReport(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        var report = new ReportSchema();
        var params = req.body;
        report.name = params.name;
        report.description = params.description;
        report.date = params.date;
        report.light_id = params.light_id;
        report.user_id = params.user_id;
        report.status = true;


        await report.save((err, ReportStored) =>
        {
            user_id = params.user_id;
            if(err) return res.status(500).send({message: "Error to save the document"});

            if(!ReportStored) return res.status(404).send({message: 'Couldnt save the file'});
             
            //Save Audit  create report 
            Audit.saveAudit("Create", "Report", date, user_id);

            return res.status(200).send({Report: ReportStored});
        });
    },

     /**
     * 
     * 
     * get report for report ID
     * 
     * 
     */
    getReport: async function(req, res)
    {
        var ReportId = req.params.id;
        var user_id = null;
        
        if(ReportId == null) return res.status(404).send({message: 'The Report doesnt exists'});

        await ReportSchema.findById(ReportId, (err, ReportStored) => {

            user_id = ReportStored.user_id;

            if(err) return res.status(500).send({message: "Error to get the document"});

            if(!ReportStored) return res.status(404).send({message: 'Couldnt find the file'});
            
            //Select report  for id
            Audit.saveAudit("Select", "Report", date, user_id);

            return res.status(200).send({Report:ReportStored});
        });
    },

     /**
     * 
     * 
     * get all reports 
     * 
     * 
     */

    getReports: async function(req, res)
    {
        var user_id = null;
        await ReportSchema.find({}).sort('name').exec((err, Reports) => {

            user_id = Reports[0].user_id;
        
            if(err) return res.status(500).send({message: "Error to get the documents"});

            if(!Reports) return res.status(404).send({message: 'Couldnt find the file'});

            //Select report  for id
            Audit.saveAudit("Select", "Report", date, user_id);

            return res.status(200).send({Reports});
        });
    },

     /**
     * 
     * 
     * Update report
     * 
     * 
     */

    updateReport: async function(req, res)
    {
        var user_id = null;
        var ReportId = req.params.id;
        var update = req.body;

        await ReportSchema.findByIdAndUpdate(ReportId, update, (err, ReportUpdate) => {
            if(err) return res.status(500).send({message: "Error to update the documents"});

            if(!ReportUpdate) return res.status(404).send({message: 'Couldnt update the file'});

            user_id = ReportUpdate.user_id;

            //Audit get light
            Audit.saveAudit("Update", "Reports", date, user_id);

            return res.status(200).send({message: "Updated Report"});
        });
    },


     /**
     * 
     * 
     * delete report
     * 
     * 
     */
    deleteReport: async function(req, res)
    {
        var ReportId = req.params.id;
        var user_id = null;

        await ReportSchema.findByIdAndUpdate(ReportId,  {status: false}, (err, ReportUpdate) =>
        {
            if(err) return res.status(500).send({message: "Error to delete the documents"});

            if(!ReportUpdate) return res.status(404).send({message: 'Couldnt delete the file'});
             
            user_id = ReportUpdate.user_id;
            //Audit get light
            Audit.saveAudit("Delete", "Reports", date, user_id);

            //Report update
            ReportUpdate.n;
            ReportUpdate.nModified

            return res.status(200).send({message: "Report Deleted "});
        });
    },
};

module.exports = controller;