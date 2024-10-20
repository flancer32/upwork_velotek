/**
 * Service worker to provide minimal PWA capabilities (installation only).
 */
'use strict';
// MODULE'S IMPORT
import {bypassCache as bypassWeb, getFromCacheOrFetchAndCache} from './web/@teqfw/web/js/sw/fetch.mjs';
import {bypassCache as bypassWebApi} from './web/@teqfw/web-api/js/sw/fetch.mjs';

// VARS
// Cache store name to save static resources
const CACHE_STATIC = 'static-cache-v1';
const UUID = `sw-${self.crypto.randomUUID()}`; // UUID for every runtime instance

// FUNCS
/**
 * The log function for this Service Worker.
 * @param msg
 */
const log = function (msg) {
    console.log(`${UUID}: ${msg}`);
};

/**
 * Return static resource from cache (if exists) or fetch from network.
 * @param {FetchEvent} event
 */
function onFetch(event) {
    // don't cache if any bypasses exist.
    const request = event.request;
    const bypass = bypassWeb(request) || bypassWebApi(request);
    if (bypass === false) {
        const useCache = async () => {
            const cache = await self.caches.open(CACHE_STATIC);
            return await getFromCacheOrFetchAndCache(request, cache);
        };
        event.respondWith(useCache());
    } else log(`SW bypass: ${request.url}`);
}

/**
 * Event listener for current application. Just display notification to user.
 * @param event
 */
function onPush(event) {
    if (event.data) {
        const json = event.data.json();
        const opts = {
            body: json.body,
            icon: '/img/favicon-180.png',
        };
        const promiseChain = self.registration.showNotification(json.title, opts);
        event.waitUntil(promiseChain);
    }
}

// MAIN
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', onFetch);
self.addEventListener('push', onPush);
