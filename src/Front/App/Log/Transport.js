/**
 * Logging transport implementation to send logs to logs aggregator.
 * Send logs to log monitoring server.
 *
 * @implements TeqFw_Core_Shared_Api_Logger_Transport
 */
export default class Velotek_Front_App_Log_Transport {
    /**
     * @param {Velotek_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Logger_Transport_Console} transConsole
     */
    constructor(
        {
            Velotek_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Logger_Transport_Console$: transConsole,
        }
    ) {
        // VARS
        const CHANNEL = 'velotek';

        // FUNCS
        /**
         * Convert date as UTC to MM/DD HH:MM:SS.MMM.
         * @param {Date} [date]
         * @return {string}
         */
        function dateTimeLog(date) {
            if ((date === undefined) || (date === null)) date = new Date();
            const m = `${date.getUTCMonth() + 1}`.padStart(2, '0');
            const d = `${date.getUTCDate()}`.padStart(2, '0');
            const h = `${date.getUTCHours()}`.padStart(2, '0');
            const i = `${date.getUTCMinutes()}`.padStart(2, '0');
            const s = `${date.getUTCSeconds()}`.padStart(2, '0');
            const ms = `${date.getUTCMilliseconds()}`.padStart(3, '0');
            return `${m}/${d} ${h}:${i}:${s}.${ms}`;
        }

        // VARS
        let _canSendLogs = false;
        /** @type {string} */
        let _uuid;
        let URL = DEF.SHARED.LOGS_AGG_URL + CHANNEL;

        // MAIN

        // INSTANCE METHODS
        this.disableLogs = function () {
            _canSendLogs = false;
        };

        this.enableLogs = function () {
            _canSendLogs = true;
        };

        this.isLogsMonitorOn = () => _canSendLogs;

        /**
         * @param {TeqFw_Core_Shared_Dto_Log.Dto} dto
         */
        this.log = function (dto) {
            if (_canSendLogs)
                try {
                    if (URL) {
                        // const date = dateTimeForLog(dto.date); - the console has own timestamp
                        const type = dto.isError ? 'ERROR' : 'INFO';
                        const uuid = (_uuid) ? _uuid.substring(0, 8) : '--------';
                        const time = dateTimeLog();
                        const msg = `${time}: ${uuid} ${type} ${dto.source}: ${dto.message}`;
                        navigator.sendBeacon(URL, msg);
                    } else this.disableLogs();
                } catch (e) {
                    console.error(e);
                    _canSendLogs = false;
                }
            // duplicate to console
            transConsole.log(dto);
        };

        this.setUuid = function (uuid) {
            _uuid = uuid;
        };

        this.setChannel = function (channel) {
            URL = DEF.SHARED.LOGS_AGG_URL + CHANNEL;
        };
    }
}
