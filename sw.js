//console.log('service worker inside sw.js');

const cacheName = "app-shell-rsrs-v4";
const dynamicCacheName = "dynamic-v1";
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
    'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    'pages/default.html'
];

//Cache size limit function
const limitCacheSize = (name,size) =>{
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name,size))
            }
        })
    })
};

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
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key => cashes.delete())
                )
        })
    );
    
});

//fetch event
self.addEventListener('fetch', (e) => {
    //console.log('service worker fetch event',e);
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || fetch(e.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(e.request.url, fetchRes.clone())
                    limitCacheSize(dynamicCacheName, 5);
                    return fetchRes;
                })
            });
        }).catch((e) => {
            if(e.request.url.indexOf('.html') > -1 ){
                return caches.match('pages/default.html');
            }
        })
    );

    
});
