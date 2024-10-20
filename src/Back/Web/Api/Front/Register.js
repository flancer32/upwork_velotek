/**
 * Register a new front (save UUID into the backend database).
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Velotek_Back_Web_Api_Front_Register {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Velotek_Shared_Web_Api_Front_Register} endpoint
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Velotek_Back_Store_RDb_Schema_Front} rdbFront
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Velotek_Shared_Web_Api_Front_Register$: endpoint,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Velotek_Back_Store_RDb_Schema_Front$: rdbFront,
        }
    ) {
        // VARS
        const A_FRONT = rdbFront.getAttributes();


        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Velotek_Shared_Web_Api_Front_Register.Request|Object} req
         * @param {Velotek_Shared_Web_Api_Front_Register.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const rs = endpoint.createRes();
            const trx = await conn.startTransaction();
            try {
                const uuid = req.uuid;
                // get front by UUID
                /** @type {Velotek_Back_Store_RDb_Schema_Front.Dto} */
                const found = await crud.readOne(trx, rdbFront, {[A_FRONT.UUID]: uuid});
                if (!found) {
                    const dto = rdbFront.createDto();
                    dto.uuid = uuid;
                    const {[A_FRONT.ID]: id} = await crud.create(trx, rdbFront, dto);
                    rs.frontId = id;
                } else {
                    rs.frontId = found.id;
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
