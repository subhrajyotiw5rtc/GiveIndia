const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let customer = new Schema({
	CustomerID: { type: Schema.Types.Mixed},
	type:{ type: String, enum : ['Savings','Current', 'BasicSavings'], default: 'Savings'},
	balance: { type: Number}

},{
	timestamps: { 
		createdAt: 'CreatedAt', 
		updatedAt: 'UpdatedAt' 
	},
    collection: 'account'
})

module.exports = customer;