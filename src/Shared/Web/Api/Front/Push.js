/**
 * Call the back to push a message to the given front.
 */

// MODULE'S CLASSES
/**
 * @memberOf Velotek_Shared_Web_Api_Front_Push
 */
class Request {
    /**
     * The UUID of the subscribed front.
     * @type {string}
     */
    uuid;
}

/**
 * @memberOf Velotek_Shared_Web_Api_Front_Push
 */
class Response {
    /** @type {boolean} */
    success;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Velotek_Shared_Web_Api_Front_Push {
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
         * @param {Velotek_Shared_Web_Api_Front_Push.Request} [data]
         * @return {Velotek_Shared_Web_Api_Front_Push.Request}
         */
        this.createReq = function (data) {
            // Create a new DTO
            const res = new Request();
            // Cast known attributes
            res.uuid = cast.string(data?.uuid);
            return res;
        };

        /**
         * @param {Velotek_Shared_Web_Api_Front_Push.Response} [data]
         * @returns {Velotek_Shared_Web_Api_Front_Push.Response}
         */
        this.createRes = function (data) {
            // Create a new DTO
            const res = new Response();
            // Cast known attributes
            res.success = cast.boolean(data?.success);
            return res;
        };
    }
}
