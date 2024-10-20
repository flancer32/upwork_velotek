/**
 * The client app (process the subscriptions).
 * @implements {TeqFw_Web_Front_Api_App}
 */
export default class Velotek_Front_App {
    /**
     * @param {Velotek_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Shared_Logger_Base} loggerBase
     * @param {TeqFw_Core_Shared_Logger_Transport_Console} logTrn
     * @param {TeqFw_Web_Front_Mod_Config} modCfg
     * @param {Velotek_Front_Mod_Front} modFront
     * @param {TeqFw_Web_Push_Front_Mod_Subscription} modSubscript
     * @param {Velotek_Front_Store_Local_App_Config} localCfg
     */
    constructor(
        {
            Velotek_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$: logger,
            TeqFw_Core_Shared_Logger_Base$: loggerBase,
            TeqFw_Core_Shared_Logger_Transport_Console$: logTrn,
            TeqFw_Web_Front_Mod_Config$: modCfg,
            Velotek_Front_Mod_Front$: modFront,
            TeqFw_Web_Push_Front_Mod_Subscription$: modSubscript,
            Velotek_Front_Store_Local_App_Config$: localCfg,
        }
    ) {
        // VARS
        /** @type {HTMLButtonElement} */
        let elBtn;

        // INSTANCE METHODS
        this.init = async function (fn) {
            // FUNCS
            async function initFrontUuid() {
                const dto = localCfg.get();
                if (!dto.frontUuid) {
                    dto.frontUuid = self.crypto.randomUUID();
                    localCfg.set(dto);
                    logger.info(`New UUID is generated for current front: ${dto.frontUuid}`);
                } else {
                    logger.info(`There is UUID for current front: ${dto.frontUuid}`);
                }
                await modCfg.init();
            }

            // MAIN
            // init console logger
            // logTrn.enableLogs();
            loggerBase.setTransport(logTrn);
            // generate front UUID if not exist
            await initFrontUuid();
            // pin HTML elements
            elBtn = document.getElementById(DEF.CSS_ID_BTN);
            // disable button if WebPush is not available
            const canSubscribe = await modSubscript.canSubscribe();
            elBtn.disabled = !canSubscribe;

            return true;
        };

        this.mount = function (cssSelector) {
            // FUNCS
            async function handleButtonClick() {
                const uuid = localCfg.get().frontUuid;
                const frontId = await modFront.create({uuid});
                const success = await modSubscript.subscribe(frontId);
                if (success) alert('Done.');
            }

            // MAIN
            elBtn.addEventListener('click', handleButtonClick);
        };

        this.reinstall = function (cssSelector) {
            // is not used
        };
    }


}
