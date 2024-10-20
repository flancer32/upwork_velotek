/**
 * List all registered fronts with subscription flag.
 */

// MODULE'S CLASSES
/**
 * @memberOf Velotek_Shared_Web_Api_Front_List
 */
class Request {
}

/**
 * @memberOf Velotek_Shared_Web_Api_Front_List
 */
class Response {
    /** @type {Velotek_Shared_Dto_Front.Dto[]} */
    fronts;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Velotek_Shared_Web_Api_Front_List {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Velotek_Shared_Dto_Front} dtoFront
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Velotek_Shared_Dto_Front$: dtoFront,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Velotek_Shared_Web_Api_Front_List.Request} [data]
         * @return {Velotek_Shared_Web_Api_Front_List.Request}
         */
        this.createReq = function (data) {
            // Create a new DTO
            const res = new Request();
            // Cast known attributes
            return res;
        };

        /**
         * @param {Velotek_Shared_Web_Api_Front_List.Response} [data]
         * @returns {Velotek_Shared_Web_Api_Front_List.Response}
         */
        this.createRes = function (data) {
            // Create a new DTO
            const res = new Response();
            // Cast known attributes
            res.fronts = cast.arrayOfObj(data?.fronts, dtoFront.createDto);
            return res;
        };
    }
}
