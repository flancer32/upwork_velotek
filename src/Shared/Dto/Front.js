/**
 * The structure for all fronts with subscriptions data.
 */
// MODULE'S VARS
const NS = 'Velotek_Shared_Dto_Front';

// MODULE'S CLASSES
/**
 * @memberOf Velotek_Shared_Dto_Front
 */
class Dto {
    /**
     * The ID on the back for the front.
     * @type {number}
     */
    frontId;

    /**
     * The UUID for a browser profile.
     * @type {string}
     */
    frontUuid;

    /**
     * @type {boolean}
     */
    hasSubscription;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Velotek_Shared_Dto_Front {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Velotek_Shared_Dto_Front.Dto} [data]
         * @return {Velotek_Shared_Dto_Front.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.frontId = cast.int(data?.frontId);
            res.frontUuid = cast.string(data?.frontUuid);
            res.hasSubscription = cast.boolean(data?.hasSubscription);
            return res;
        };
    }
}
