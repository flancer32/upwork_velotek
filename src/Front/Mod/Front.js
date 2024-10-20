/**
 * Model to handle front related events.
 */
export default class Velotek_Front_Mod_Front {
    /**
     * @param {TeqFw_Web_Api_Front_Web_Connect} connApi
     * @param {Velotek_Shared_Web_Api_Front_List} apiList
     * @param {Velotek_Shared_Web_Api_Front_Push} apiPush
     * @param {Velotek_Shared_Web_Api_Front_Register} apiRegister
     */
    constructor(
        {
            TeqFw_Web_Api_Front_Web_Connect$: connApi,
            Velotek_Shared_Web_Api_Front_List$: apiList,
            Velotek_Shared_Web_Api_Front_Push$: apiPush,
            Velotek_Shared_Web_Api_Front_Register$: apiRegister,
        }
    ) {
        // INSTANCE METHODS

        /**
         * Register new front on the back.
         * @param {Object} params
         * @param {String} params.uuid
         * @return {Promise<number>}
         */
        this.create = async function ({uuid}) {
            const req = apiRegister.createReq();
            req.uuid = uuid;
            /** @type {Velotek_Shared_Web_Api_Front_Register.Response} */
            const rs = await connApi.send(req, apiRegister);
            return rs?.frontId;
        };

        /**
         * Get all registered fronts from the back.
         * @return {Promise<Velotek_Shared_Dto_Front.Dto[]>}
         */
        this.list = async function () {
            const req = apiRegister.createReq();
            /** @type {Velotek_Shared_Web_Api_Front_List.Response} */
            const rs = await connApi.send(req, apiList);
            return rs?.fronts;
        };

        /**
         * Push a message to the given front.
         * @return {Promise<boolean>}
         */
        this.push = async function ({frontUuid}) {
            const req = apiPush.createReq();
            req.uuid = frontUuid;
            /** @type {Velotek_Shared_Web_Api_Front_Push.Response} */
            const rs = await connApi.send(req, apiPush);
            return rs?.success;
        };

    }
}
