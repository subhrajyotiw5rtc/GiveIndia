const _ = require('lodash'),
	dict = {
		'EQ_DB_CONN_400'		: 'Could not connect to database',
		'GI_CUST_ADD_200'		: 'Added customer data successfully',
		'GI_CUS_SER_ID_404'		: 'Error in Adding customer record',
		'GI_CUST_GET_200'		: 'Fetched customer record successfully',
		'GI_CUS_GET_SER_ID_404'	: 'Error in fetching customers',
		'GI_ACC_ADD_200'        : 'Account has been added successfully.',
		'GI_ACC_ADD_ID_404'     : 'Error while adding Account.',
		'GI_ACC_TRANS_200'      : 'Money transfer has been made successfully.',
		'GI_ACC_TRANS_ID_404'   : 'Error while doing transcation.',
		'GI_ACC_GET_200'        : 'Fetched accont details successfully.',
		'GI_ACC_GET_ID_404'     : 'Error while fetching accounts.',
		'GI_ACC_TRANS_MIS_404'  : 'Wrong account info or no such accounts are present.',
		'GI_ACC_TRANS_SAME_404' : 'Same user balance transcation is not available.',
		'GI_ACC_TRANS_EXCEED_404': 'Basic savings type account should not exceed than 50,000.',
		'GI_ACC_TRANS_INF_404'  : 'Insufficient funds to transfer',
		
		'desc': -1,
		'asc': 1,
	};

module.exports = {
	i18n: (key, ...params) => {
		let value = dict[key];
		_.each(params, (p, i) => {
			value = _.replace(value, new RegExp(`\\{${i}\\}`), p);
		});
		return value;
	},
};
