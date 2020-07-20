const _ = require('lodash'),
	logger = require('./logger.util'),
	{ i18n } = require('./i18n.util');

module.exports = {
	setError: (errorCode) => {
		const error = new Error(i18n(errorCode));
		_.set(error, 'code', errorCode)

		logger.log(error.stack, 'error');

		return error;
	}
};

