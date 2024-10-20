/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Velotek_Back_Defaults {

    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;
    /** @type {TeqFw_Web_Api_Back_Defaults} */
    MOD_WEB_API;

    /** @type {Velotek_Shared_Defaults} */
    SHARED;

    constructor(
        {
            TeqFw_Web_Back_Defaults$: MOD_WEB,
            TeqFw_Web_Api_Back_Defaults$: MOD_WEB_API,
            Velotek_Shared_Defaults$: SHARED,
        }
    ) {
        this.MOD_WEB = MOD_WEB;
        this.MOD_WEB_API = MOD_WEB_API;
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
