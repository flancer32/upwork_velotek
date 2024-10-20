/**
 * The admin app to send messages.
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
            Velotek_Front_Store_Local_App_Config$: localCfg,
        }
    ) {
        // VARS
        /** @type {Velotek_Shared_Dto_Front.Dto[]} */
        const subscriptions = [];
        /** @type {HTMLDivElement} */
        let elList;

        // INSTANCE METHODS
        this.init = async function (fn) {
            // FUNCS
            // MAIN
            // init console logger
            loggerBase.setTransport(logTrn);
            // load frontend configuration (from the back or local storage)
            await modCfg.init();
            // pin HTML elements
            elList = document.getElementById(DEF.CSS_ID_LIST);
            //
            const loaded = await modFront.list();
            subscriptions.push(...loaded);

            return true;
        };

        this.mount = function (cssSelector) {
            // FUNCS
            async function runScript(frontUuid) {
                const success = await modFront.push({frontUuid});
                if (success) if (success) alert('Done.');
            }

            function createButton(frontUuid) {
                const button = document.createElement('button');
                button.textContent = 'Push';
                button.onclick = () => runScript(frontUuid);
                return button;
            }

            // MAIN
            elList.innerHTML = ''; // Clear the container
            subscriptions.forEach(front => {
                const frontElement = document.createElement('div');
                frontElement.textContent = `${front.frontUuid} `;
                const button = createButton(front.frontUuid);
                frontElement.appendChild(button);
                elList.appendChild(frontElement);
            });

        };

        this.reinstall = function (cssSelector) {
            // is not used
        };
    }


}
