/**
* CreatedBy   : Dinesh
* CreatedTime : 07 Jan 2022
* ModifiedBy  : Dinesh
* ModifiedDate: 12 Jan 2023
* Description : This file contains all endpoints for application
 */

module.exports = class 	endpoints {

	//Common Endpoints
	ENDPOINT_METRICS = "/metrics"
	ENDPOINT_SUM = "/sum"

	// Perkpal endpoint of the REST service
	ENDPOINT_BASE_URL = "/api/rest/perkpal/perkpal/dataaccess";

	/* INJECT_ENDPOINT_FOR_DIFFERENT_MODULES */
	ENDPOINT_MODULE_USER = "/1.0.0/user"
	ENDPOINT_MODULE_TENANT = "/1.0.0/tenant"
	ENDPOINT_MODULE_SYNCINTERAL = "/1.0.0/syncinteral"
	ENDPOINT_MODULE_SYNCFILE = "/1.0.0/syncfile"
	ENDPOINT_MODULE_SMTENANT = "/1.0.0/smtenant"
	ENDPOINT_MODULE_SETTINGS = "/1.0.0/settings"
	ENDPOINT_MODULE_EDI = "/1.0.0/edi"
	ENDPOINT_MODULE_MERCHANT = "/1.0.0/merchant"
	ENDPOINT_MODULE_LOCATION = "/1.0.0/location"
	ENDPOINT_MODULE_GUEST = "/1.0.0/guest"
	ENDPOINT_MODULE_BOOKING = "/1.0.0/booking"
	ENDPOINT_MODULE_GLOBAL = "/1.0.0/global"

	// Endpoint versions for the REST Service
	ENDPOINT_VERSION_1 = "/v1";
	ENDPOINT_VERSION_2 = "/v2";

	/* INJECT_ENDPOINT_FOR_DIFFERENT_TABLES */

	ENDPOINT_USER = "/user";
	ENDPOINT_USERS = "/users";
	ENDPOINT_ONE_USER = "/user/:userid";
	
};