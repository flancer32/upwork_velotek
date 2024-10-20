/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Velotek_Front_Defaults {

    CSS_ID_BTN = 'subscriptBtn';
    CSS_ID_LIST = 'frontsContainer';

    /** @type {Velotek_Shared_Defaults} */
    SHARED;


    /**
     * @param {Velotek_Shared_Defaults} SHARED
     */
    constructor(
        {
            Velotek_Shared_Defaults$: SHARED
        }
    ) {
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
