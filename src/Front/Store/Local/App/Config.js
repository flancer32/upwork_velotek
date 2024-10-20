/**
 * The frontend storage for the application configuration.
 */
export default class Velotek_Front_Store_Local_App_Config {
    /**
     * @param {Velotek_Front_Defaults} DEF
     * @param {Velotek_Front_Dto_Config} dtoConfig
     */
    constructor(
        {
            Velotek_Front_Defaults$: DEF,
            Velotek_Front_Dto_Config$: dtoConfig,
        }
    ) {
        // VARS
        const KEY = `${DEF.SHARED.NAME}/app/cfg`;

        // INSTANCE METHODS

        this.clear = function () {
            self.window.localStorage.removeItem(KEY);
        };

        /**
         * Get current configuration from the local storage.
         * @return {Velotek_Front_Dto_Config.Dto}
         */
        this.get = function () {
            const stored = self.window.localStorage.getItem(KEY);
            const obj = JSON.parse(stored);
            return dtoConfig.createDto(obj);
        };

        /**
         * Get the key for the `localStorage`.
         * @return {string}
         */
        this.key = () => KEY;

        /**
         * Save current configuration into the local storage.
         * @param {Velotek_Front_Dto_Config.Dto} data
         */
        this.set = function (data) {
            self.window.localStorage.setItem(KEY, JSON.stringify(data));
        };

    }
}
