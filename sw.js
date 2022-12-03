//console.log('service worker inside sw.js');

const cacheName = "app-shell-rsrs-v2";
const assests = [
    '/',
    'index.html',
    'js/app.js',
    'js/common.js',
    'js/materialize.min.js',
    'css/materialize.min.css',
    'css/styles.css',
    'img/icons/icon-144.png',
    'img/bw.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];



//install service worker
self.addEventListener('install', (e)=>{
    //console.log('service worker has been installed',e);
    e.waitUntil(
    caches.open(cacheName).then(cache =>{
        cache.addAll(assests);
    })
    );
});

//activate event
self.addEventListener('activate', (e) => {
    //console.log('service worker has been activated',e);
    e.waitUntil(
        caches.keys().then(keys => {
            console.log(keys);
        })
    );
    
});

//fetch event
self.addEventListener('fetch', (e) => {
    //console.log('service worker fetch event',e);
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || e.request;
        })
    );

    
});
