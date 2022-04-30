console.log("SW Registered -- SW Thread")

const htmlIndexUrl = '/' /* The root of this domain */
const outsideAsset = 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
/* SW can consume from any resource but only serve on it's scope */

const assets = [htmlIndexUrl, 'styles.css', "app.js", "sw-register.js", outsideAsset]

/* I do have a local cache and you can cache all your resources */

self.addEventListener('install', function (event) {
  caches.open("assets").then(function (cache) {
    cache.addAll(assets)
  })
})