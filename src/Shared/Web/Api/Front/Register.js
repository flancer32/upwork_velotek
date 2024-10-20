/**
 * Register a new front (save UUID into the backend database).
 */

// MODULE'S CLASSES
/**
 * @memberOf Velotek_Shared_Web_Api_Front_Register
 */
class Request {
    /**
     * The front UUID to register on the backend.
     * @type {string}
     */
    uuid;
}

/**
 * @memberOf Velotek_Shared_Web_Api_Front_Register
 */
class Response {
    /** @type {number} */
    frontId;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Velotek_Shared_Web_Api_Front_Register {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Velotek_Shared_Web_Api_Front_Register.Request} [data]
         * @return {Velotek_Shared_Web_Api_Front_Register.Request}
         */
        this.createReq = function (data) {
            // Create a new DTO
            const res = new Request();
            // Cast known attributes
            res.uuid = cast.string(data?.uuid);
            return res;
        };

        /**
         * @param {Velotek_Shared_Web_Api_Front_Register.Response} [data]
         * @returns {Velotek_Shared_Web_Api_Front_Register.Response}
         */
        this.createRes = function (data) {
            // Create a new DTO
            const res = new Response();
            // Cast known attributes
            res.frontId = cast.int(data?.frontId);
            return res;
        };
    }
}
