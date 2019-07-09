'use strict'

const _ = require('lodash');
const { AuditSchema, validateAudit }= require('../models/audit');


var auditFunction = 
{
    saveAudit: function(action, table_name, date, user_id)
    {
       
        
        var audit = new AuditSchema({
            action: action,
            table_name: table_name,
            date: date,
            user_id: user_id
        });
        
        
        audit.save((err, AuditStored) =>
        {
            if(!err){
                console.log(AuditStored);
            }else{
                console.log('error => '+err);
            }
        });
    },
};

module.exports = auditFunction;