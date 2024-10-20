/**
 * The frontend configuration data.
 */
// MODULE'S VARS
const NS = 'Velotek_Front_Dto_Config';

// MODULE'S CLASSES
/**
 * @memberOf Velotek_Front_Dto_Config
 */
class Dto {
    /**
     * The UUID for a browser profile.
     * @type {string}
     */
    frontUuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Velotek_Front_Dto_Config {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Velotek_Front_Dto_Config.Dto} [data]
         * @return {Velotek_Front_Dto_Config.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.frontUuid = cast.string(data?.frontUuid);
            return res;
        };
    }
}
