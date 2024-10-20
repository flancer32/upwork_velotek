/**
 * Call the back to push a message to the given front.
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Velotek_Back_Web_Api_Front_Push {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Velotek_Shared_Web_Api_Front_Push} endpoint
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {TeqFw_Web_Push_Back_RDb_Schema_Subscript} rdbSubscript
     * @param {Velotek_Back_Store_RDb_Schema_Front} rdbFront
     * @param {TeqFw_Web_Push_Back_Act_Subscript_SendMsg} actSendMsg
     * @param {Velotek_Shared_Dto_Front} dtoFront
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Velotek_Shared_Web_Api_Front_Push$: endpoint,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            TeqFw_Web_Push_Back_RDb_Schema_Subscript$: rdbSubscript,
            Velotek_Back_Store_RDb_Schema_Front$: rdbFront,
            TeqFw_Web_Push_Back_Act_Subscript_SendMsg$: actSendMsg,
            Velotek_Shared_Dto_Front$: dtoFront,
        }
    ) {
        // VARS
        const A_FRONT = rdbFront.getAttributes();


        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Velotek_Shared_Web_Api_Front_Push.Request|Object} req
         * @param {Velotek_Shared_Web_Api_Front_Push.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const rs = endpoint.createRes();
            const trx = await conn.startTransaction();
            try {
                const uuid = req.uuid;
                /** @type {Velotek_Back_Store_RDb_Schema_Front.Dto} */
                const front = await crud.readOne(trx, rdbFront, {[A_FRONT.UUID]: uuid});
                if (front) {
                    /** @type {TeqFw_Web_Push_Back_RDb_Schema_Subscript.Dto} */
                    const subs = await crud.readOne(trx, rdbSubscript, front.id);
                    if (subs) {
                        const {subscriptId, code} = await actSendMsg({
                            trx,
                            title: 'Velotek VIP Club',
                            body: 'Get loads of crazy offers and discounts with just one tap of your finger!',
                            frontId: subs.front_ref,
                        });
                        if (subscriptId) rs.success = true;
                    }
                }
                await trx.commit();
                Object.assign(res, rs); // compose the API response after the RDB commit
                logger.info(`Response: ${JSON.stringify(res)}`);
            } catch (error) {
                logger.error(error);
                await trx.rollback();
            }
        };
    }


}
