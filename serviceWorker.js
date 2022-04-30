console.log("SW Registered -- SW Thread")

const htmlIndexUrl = '/' /* The root of this domain */
const outsideAsset = 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
/* SW can consume from any resource but only serve on it's scope */

const assetsToBeCached = [htmlIndexUrl, 'styles.css', "app.js", "sw-register.js", outsideAsset]

/* I do have a local cache and you can cache all your resources */

self.addEventListener('install', function (event) {
  event.waitUntil( //Dont kill SW until done
    caches.open("assets").then(function (cache) {
      cache.addAll(assetsToBeCached)
    })
  )
})


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Even if the response is in the cache, we fetch it
        // and update the cache for future usage
        const fetchPromise = fetch(event.request).then(
          networkResponse => {
            caches.open("assets").then(cache => {
              cache.put(event.request, networkResponse.clone())
              return networkResponse
            })
          })
        // We use the currently cached version if it's there
        return response || fetchPromise // cached or a network fetch
      })
  )
})