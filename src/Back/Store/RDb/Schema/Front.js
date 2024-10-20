/**
 * Persistent DTO with metadata for the RDB entity: Front.
 * @namespace Velotek_Back_Store_RDb_Schema_Front
 */
// MODULE'S VARS
/**
 * Path to the entity in the plugin's DEM.
 * @type {string}
 */
const ENTITY = '/front';

/**
 * @memberOf Velotek_Back_Store_RDb_Schema_Front
 * @type {Object}
 */
const ATTR = {
    DATE_CREATED: 'date_created',
    ID: 'id',
    UUID: 'uuid',
};
Object.freeze(ATTR);

// MODULE'S CLASSES
/**
 * @memberOf Velotek_Back_Store_RDb_Schema_Front
 */
class Dto {
    /**
     * Date when the entity was created.
     * @type {Date}
     */
    date_created;
    /**
     * User's ID.
     * @type {number}
     */
    id;
    /**
     * The UUID for the front.
     * @type {string}
     */
    uuid;
}

// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Db_Back_RDb_Meta_IEntity
 */
export default class Velotek_Back_Store_RDb_Schema_Front {
    /**
     * @param {Velotek_Back_Defaults} DEF
     * @param {TeqFw_Db_Back_RDb_Schema_EntityBase} base
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            Velotek_Back_Defaults$: DEF,
            TeqFw_Db_Back_RDb_Schema_EntityBase$: base,
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * Creates a new DTO object.
         * @param {Velotek_Back_Store_RDb_Schema_Front.Dto} [data]
         * @return {Velotek_Back_Store_RDb_Schema_Front.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date_created = cast.date(data?.date_created);
            res.id = cast.int(data?.id);
            res.uuid = cast.string(data?.uuid);
            return res;
        };

        /**
         * Documentation-only code.
         * The real implementation is in `TeqFw_Db_Back_RDb_Schema_EntityBase`.
         * @return {typeof Velotek_Back_Store_RDb_Schema_Front.ATTR}
         */
        this.getAttributes = function () {};

        // MAIN
        return base.create(this,
            `${DEF.SHARED.NAME}${ENTITY}`,
            ATTR,
            [ATTR.ID],
            Dto
        );
    }
}
