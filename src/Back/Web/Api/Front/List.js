/**
 * List all registered fronts.
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Velotek_Back_Web_Api_Front_List {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Velotek_Shared_Web_Api_Front_List} endpoint
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {TeqFw_Web_Push_Back_RDb_Schema_Subscript} rdbSubscript
     * @param {Velotek_Back_Store_RDb_Schema_Front} rdbFront
     * @param {Velotek_Shared_Dto_Front} dtoFront
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Velotek_Shared_Web_Api_Front_List$: endpoint,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            TeqFw_Web_Push_Back_RDb_Schema_Subscript$: rdbSubscript,
            Velotek_Back_Store_RDb_Schema_Front$: rdbFront,
            Velotek_Shared_Dto_Front$: dtoFront,
        }
    ) {
        // VARS
        const A_FRONT = rdbFront.getAttributes();


        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Velotek_Shared_Web_Api_Front_List.Request|Object} req
         * @param {Velotek_Shared_Web_Api_Front_List.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const rs = endpoint.createRes();
            const trx = await conn.startTransaction();
            try {
                rs.fronts = [];
                /** @type {Velotek_Back_Store_RDb_Schema_Front.Dto[]} */
                const fronts = await crud.readSet(trx, rdbFront);
                /** @type {TeqFw_Web_Push_Back_RDb_Schema_Subscript.Dto[]} */
                const subs = await crud.readSet(trx, rdbSubscript);
                await trx.commit();
                // map subscriptions
                const map = {};
                for (const one of subs) map[one.front_ref] = one;
                for (const front of fronts) {
                    const dto = dtoFront.createDto();
                    dto.frontId = front.id;
                    dto.frontUuid = front.uuid;
                    dto.hasSubscription = Boolean(map[front.id]);
                    rs.fronts.push(dto);
                }
                Object.assign(res, rs); // compose the API response after the RDB commit
                logger.info(`Response: ${JSON.stringify(res)}`);
            } catch (error) {
                logger.error(error);
                await trx.rollback();
            }
        };
    }


}
