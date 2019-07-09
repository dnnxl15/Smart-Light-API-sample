'use strict'

const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const { UserSchema, validateUser }= require('../models/user');
const bcrypt = require('bcrypt');
var fs = require('fs');
var Audit = require('../functions/audit');
var date = new Date();

var controller =
{
    home: function(req, res)
    {
        return res.status(200).send({
            message: 'I am home'
        });
    },

    test: function(req, res)
    {
        return res.status(200).send({
            message: 'I am method or action test of the controller'
        });
    },

    saveUser: async function (req, res) 
    {
        const { error } = validateUser(req.body); 
        if (error) return res.status(400).send(error.details[0].message);

        var user = new UserSchema( _.pick(req.body, ['name', 'lastName', 'username', 'mail', 'password', 'phone', 'role' ]));

        // Validation
                
        let findUser = await UserSchema.findOne({mail: user.mail});
        if(findUser) return res.status(400).send('User already registered.');

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save((err, UserStored) =>
        {
            if(err) return res.status(500).send({message: "Error to save the document"});
            //Get the user id to use in the audit
            var user_id_master = UserStored._id;

            //Save Audit  create user
            Audit.saveAudit("Create", "Users", date, user_id_master);

            if(!UserStored) return res.status(404).send({message: 'Couldnt save the file'});
        });
        const token = user.generateAuthToken();//config.get('jwtPrivateKey'));
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'mail']));
    },

    getUserId: async function(req, res)
    {
        let nickname = "joel2000";
        var id = ""; 
        await UserSchema.findOne({username: nickname}, '_id').exec(function (err, user) {
            if(err) return res.status(500).send({message: "Error to save the document"});

            if(!user) return res.status(404).send({message: 'Couldnt save the file'});

            id = user._id;
            console.log(id);
        });
        console.log(id);
    },

    getUser: async function(req, res)
    {
        var UserId = req.params.id;

        if(UserId == null) return res.status(404).send({message: 'The User doesnt exists'});

        await UserSchema.findById(UserId, (err, UserStored) => {

            if(err) return res.status(500).send({message: "Error to get the document"});

            if(!UserStored) return res.status(404).send({message: 'Couldnt find the file'});

            //Save Audit  create user
            Audit.saveAudit("Select", "Users", date, UserId);

            return res.status(200).send(_.pick(UserStored, ['_id', 'name', 'mail']));
        }).select('-password');
    },

    getUsers: async function(req, res)
    {
        await UserSchema.find({}).sort('year').exec((err, users) => {

            if(err) return res.status(500).send({message: "Error to get the documents"});

            if(!users) return res.status(404).send({message: 'Couldnt find the file'});

            //Get the user id to use in the audit
            var user_id_master = users[0]._id;

            //Create Audit  
            Audit.saveAudit("Select", "Users", date, user_id_master);
            return res.status(200).send({users});
        });
    },

    updateUser: async function(req, res)
    {
        var UserId = req.params.id;
        var update = req.body;

        await UserSchema.findByIdAndUpdate(UserId, update, (err, UserUpdate) => {
            if(err) return res.status(500).send({message: "Error to update the documents"});

            if(!UserUpdate) return res.status(404).send({message: 'Couldnt update the file'});
            
            //Create Audit  
            Audit.saveAudit("Update", "Users", date, UserId);

            return res.status(200).send({message: "Updated User"});
        });
    },

    deleteUser: async function(req, res)
    {
        var UserId = req.params.id;
        await UserSchema.findByIdAndDelete(UserId, (err, UserRemoved) =>
        {
            if(err) return res.status(500).send({message: "Error to delete the documents"});

            if(!UserRemoved) return res.status(404).send({message: 'Couldnt delete the file'});

             //Create Audit  
            Audit.saveAudit("Delete", "Users", date, UserId);

            return res.status(200).send({message: "Deleted User"});
        });
    },

    uploadImage: async function(req, res)
    {
        var UserId = req.params.id;
        var fileName = 'Doesnt upload the image';
        if(req.files)  
        {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif')
            {
                await UserSchema.findByIdAndUpdate(UserId, {image: fileName}, (err, UserUpdated) => {
                    if(err) return res.status(500).send({message: 'The image didnt upload'});
    
                    if(!UserUpdated) return res.status(404).send({message: 'The image doesnt exits and the image havent been assigned'});
                    
                     //Create Audit  
                    Audit.saveAudit("Update Image", "Users", date, UserId);

                    return res.status(200).send({
                        project: fileName
                   });
               });
            }
            else
            {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: "The extension is not valid"});
                });
            }
        }
        else
        {
            return res.status(200).send({
                message: fileName
            });
        }
    },

    fetchImage: async function(req, res)
    {
        var usernamm = req.params.username;
        var imageId = "";
        await UserSchema.findOne({ username: usernamm}).exec(function (err, user) {
            if(err) return res.status(500).send({message: "Error to save the document"});

            if(!user) return res.status(404).send({message: 'Couldnt save the file'});

            imageId = user.image;
            return res.sendFile(imageId, {root: './uploads'}); 
        });
    }
};

module.exports = controller;