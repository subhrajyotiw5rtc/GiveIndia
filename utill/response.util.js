const logger = require('./logger.util');

class DemoProjectResponseUtil {

	/**
		Sends success reponse to client

		@param response object
		@param success boolean
		@param message string
		@param response_code string
		@param data object
		@param httpStatus number
	**/
	send(response, success, message, response_code, data = {}, httpStatus = 0) {
		if(!isNaN(httpStatus) && httpStatus > 0) response.status(httpStatus);
		
		const payload = {
			success,
			message,
			response_code,
			data,
		}
		payload.timestamp = new Date().getTime();
		response.json(payload);
		response.end();
	}
}


module.exports = new DemoProjectResponseUtil()