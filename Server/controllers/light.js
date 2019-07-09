'use strict'

const _ = require('lodash');
var Audit = require('../functions/audit');
var date = new Date();
const { LightSchema, validateLight } = require('../models/light');

var controllerLight = 
{

    /**
     * 
     * 
     * register Light - save Light
     * 
     * 
     */
    saveLight: async function(req, res)
    {
        //Get the user id to use in the audit
        var user_id_master = req.body.user_id_master;

        //validate Light
        const { error } = validateLight(req.body); 

        
        if (error) return res.status(400).send(error.details[0].message);

        //Insert data to the lights scheme
        var light = new LightSchema( _.pick(req.body, [
            'name',
            'electric_consumption',
            'color',
            'capacity',
            'life_time',
            'type',
            'lightType',
            'category',
            'user_id_master',
            'status'
        ]));
        
        //Save in the database 
        await light.save((err, LightStored) =>
        {
            if(err) return res.status(500).send({message: "Error to save the document => "+err});
 
            if(!LightStored) return res.status(404).send({message: 'Couldnt save the file => '+err});

            //Save Audit  create light
            Audit.saveAudit("Create", "Lights", date, user_id_master);
            
            //Send information when everything is correct
            return res.status(200).send( _.pick(light, [
                '_id', 
                'name',
                'electric_consumption',
                'color',
                'capacity',
                'life_time',
                'type',
                'lightType',
                'category',
                'user_id_master',
                'status'
            ]));
        });
    },

    /*getLights: function(req, res)
    {
        LightSchema.find({}).sort('year').exec((err, lights) => {

            var user_id = lights.user_id;

            console.log(user_id);
            if(err) return res.status(500).send({message: "Error to get the documents"});
            if(!lights) return res.status(404).send({message: 'Couldnt find the file'});
            return res.status(200).send({lights});
          
            
        });
    },
    
    getLightId: function(req, res)
    {
        var lightId = req.params.id;

        if(lightId == null) return res.status(404).send({message: 'The Light doesnt exists'});

        LightSchema.findById(lightId, (err, LightStored) => {

            console.log(lightId);
            if(err) return res.status(500).send({message: "Error to get the document"});

            if(!LightStored) return res.status(404).send({message: 'Couldnt find the file'});

            return res.status(200).send({Light:LightStored});

        
         
        });
    },*/

    /**
     * 
     * 
     * Get Light for id user
     * 
     * 
     */
    getLightUserId: async function(req, res){

        //Get the user id to use in the audit
        var user_id_master = req.params.user_id_master;

        //error if user id is null
        if(user_id_master == null) return res.status(404).send({message: 'The Light doesnt exists'});

        //search lights for usario id and get data 
        await LightSchema.find({user_id_master: user_id_master}, (err, LightStored) => {
            
            if(err) return res.status(500).send({message: "Error to get the document"});
            if(!LightStored) return res.status(404).send({message: 'Couldnt find the file'});

            //Audit get light
            Audit.saveAudit("Get", "Lights", date, user_id_master);

            //return information of user lights
            return res.status(200).send({Light:LightStored});
        });
    },


    /**
     * 
     * 
     * Update light
     * 
     * 
     */
    updateLight: async function(req, res)
    {
        var user_id_master = null;
        var LightId = req.params.id;
        var update = req.body;

        await LightSchema.findByIdAndUpdate(LightId, update, (err, LightUpdate) => {
            if(err) return res.status(500).send({message: "Error to update the documents"});
            
            if(!LightUpdate) return res.status(404).send({message: 'Couldnt update the file'});

            //get id user 
            user_id_master = LightUpdate.user_id_master;

            //Audit get light
            Audit.saveAudit("Update", "Lights", date, user_id_master);

            return res.status(200).send({message: "Updated light"});
        });
    },

    
    /**
     * 
     * 
     * Delete Light
     * 
     * 
     */
    deleteLight: async function(req, res)
    {
        //get light id
        var LightId = req.params.id;
        var user_id_master = null;
        //update light to set the status to false
        await LightSchema.findByIdAndUpdate(LightId, {status: false}, (err, LightUpdate) =>
        {
             //get id user 
             user_id_master = LightUpdate.user_id_master;
                
             
            if(err) return res.status(500).send({message: "Error to delete the documents"});

            if(!LightUpdate) return res.status(404).send({message: 'Couldnt delete the file'});
           
               
            //Audit get light
            Audit.saveAudit("Delete", "Lights", date, user_id_master);
            

            //light update
            LightUpdate.n;
            LightUpdate.nModified;

            return res.status(200).send("Light Deleted");
        });
    },

};

module.exports = controllerLight;