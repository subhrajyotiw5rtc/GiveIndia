const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let customer = new Schema({
	Name:{ type: String},
	Mobile: { type: String},
	Age: { type: Number},
	city: { type: String}

},{
	timestamps: { 
		createdAt: 'CreatedAt', 
		updatedAt: 'UpdatedAt' 
	},
    collection: 'customer'
})

module.exports = customer;