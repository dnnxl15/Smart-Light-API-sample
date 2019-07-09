'use strict'

const _ = require('lodash');
const { AuditSchema, validateAudit }= require('../models/audit');


var auditController = 
{
    saveAudit: async function(action, table_name, date, user_id)
    {
        const { error } = validateAudit(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        var audit = new AuditSchema({
            action: action,
            table_name: table_name,
            date: date,
            user_id: user_id
        });
        
        
        await audit.save((err, AuditStored) =>
        {
            if(!err){
                console.log(AuditStored);
            }else{
                console.log('error');
            }
        });
    },
    /*
    getLights: function(req, res)
    {
        Light.find({}).sort('year').exec((err, lights) => {
            var status =lights[0].status; 
            if(err) return res.status(500).send({message: "Error to get the documents"});

            if(!lights) return res.status(404).send({message: 'Couldnt find the file'});

            if(status == true){
                console.log(status);
                return res.status(200).send({lights});
            }else{
                return res.status(200).send("No hay luces");
            }
            
        });
    },
    
    getLightId: function(req, res)
    {
        var lightId = req.params.id;

        if(lightId == null) return res.status(404).send({message: 'The Light doesnt exists'});

        Light.findById(lightId, (err, LightStored) => {

            var status =LightStored.status; 
            if(err) return res.status(500).send({message: "Error to get the document"});

            if(!LightStored) return res.status(404).send({message: 'Couldnt find the file'});

            if(status == true){
                console.log(status);
                return res.status(200).send({Light:LightStored});
            }else{
                return res.status(200).send("No hay luces");
            }
         
        });
    },

    updateLight: function(req, res)
    {
        var LightId = req.params.id;
        var update = req.body;

        Light.findByIdAndUpdate(LightId, update, (err, LightUpdate) => {
            if(err) return res.status(500).send({message: "Error to update the documents"});

            if(!LightUpdate) return res.status(404).send({message: 'Couldnt update the file'});

            return res.status(200).send({Light: LightUpdate});
        });
    },

    
    deleteLight: function(req, res)
    {
        var LightId = req.params.id;
        Light.findByIdAndUpdate(LightId, {status: false}, (err, LightUpdate) =>
        {
            if(err) return res.status(500).send({message: "Error to delete the documents"});

            if(!LightUpdate) return res.status(404).send({message: 'Couldnt delete the file'});
            LightUpdate.n;
            LightUpdate.nModified;
            return res.status(200).send("Light Deleted");
        });
    },
*/
};

module.exports = auditController;