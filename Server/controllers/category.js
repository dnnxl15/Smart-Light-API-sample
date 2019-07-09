'use strict'
var Audit = require('../functions/audit');
var date = new Date();
const _ = require('lodash');
const { LightSchema, validateLight } = require('../models/light');


var controllerCategory = 
{

     /**
     * 
     * 
     * Get Categories for user 
     * 
     * 
     */
    getCategories: async function(req, res)
    {
        //get the User ID 
        var user_id_master = req.params.user_id_master;

        //Search categories for user
        await LightSchema.find({user_id_master:user_id_master}).distinct('category').exec((err, category) => {

            if(err) return res.status(500).send({message: "Error to get the documents"});

            if(!category) return res.status(404).send({message: 'Couldnt find the file'});

            //Save Audit  get Categories
            Audit.saveAudit("Select", "Light", date, user_id_master);

         
            return res.status(200).send(category);
        
          
        });
    },

    /**
     * 
     * 
     * Delete Category
     * 
     * 
     */
    deleteCategory: async function(req, res)
    {
        var  lightId = req.params.lightId;
        var user_id_master = null;

        await LightSchema.findOneAndUpdate(lightId, {category: '0'}, (err, LightUpdate) => {
            
            //get id user 
            user_id_master = LightUpdate.user_id_master;
                
            if(err) return res.status(500).send({message: "Error to update the documents"});

            if(!LightUpdate) return res.status(404).send({message: 'Couldnt update the file'});
            

            //Audit Delete Category
            Audit.saveAudit("Delete", "Lights", date, user_id_master);

            
         //light update
            LightUpdate.n;
            LightUpdate.nModified;

            return res.status(200).send("Category Deleted");
        });
    },
    
    

};

module.exports = controllerCategory;