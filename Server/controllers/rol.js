'use strict'

const _ = require('lodash');
var Rol = require('../models/rol');


var controllerRol = 
{
    saveRol: async function(req, res)
    {
        var rol = new Rol( _.pick(req.body, [
            'rolName',
        ]));
        
        await rol.save((err, RolStored) =>
        {
            if(err) return res.status(500).send({message: "Error to save the document"});

            if(!RolStored) return res.status(404).send({message: 'Couldnt save the file'});

            return res.status(200).send( _.pick(rol, [
                '_id', 
                'rolName',
            ]));
        });
    },

    getRoles: async function(req, res)
    {
        await Rol.find({}).sort('year').exec((err, rol) => {

            if(err) return res.status(500).send({message: "Error to get the documents"});

            if(!rol) return res.status(404).send({message: 'Couldnt find the file'});

            return res.status(200).send({rol});
        });
    },
    
    getRolId: async function(req, res)
    {
        var rolId = req.params.id;

        if(rolId == null) return res.status(404).send({message: 'The Rol doesnt exists'});

        await Rol.findById(rolId, (err, RolStored) => {

            if(err) return res.status(500).send({message: "Error to get the document"});

            if(!RolStored) return res.status(404).send({message: 'Couldnt find the file'});

            return res.status(200).send({Rol:RolStored});
        });
    },

    updateRol: async function(req, res)
    {
        var rolId = req.params.id;
        var update = req.body;

        await Rol.findByIdAndUpdate(rolId, update, (err, RolUpdate) => {
            if(err) return res.status(500).send({message: "Error to update the documents"});

            if(!RolUpdate) return res.status(404).send({message: 'Couldnt update the file'});

            return res.status(200).send({Rol: RolUpdate});
        });
    },

    /*
    deleteCategory: function(req, res)
    {
        var categoryId = req.params.id;
        Category.findByIdAndDelete(categoryId, (err, CategoryRemoved) =>
        {
            if(err) return res.status(500).send({message: "Error to delete the documents"});

            if(!CategoryRemoved) return res.status(404).send({message: 'Couldnt delete the file'});

            return res.status(200).send({Category: CategoryRemoved});
        });
    },
*/
};

module.exports = controllerRol;