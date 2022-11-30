//console.log('service worker inside sw.js');

const cacheName = "app-shell-rsrs";
const assests = [
    '/',
    'index.html',
    'js/app.js',
    'js/common.js',
    'js/materialize.min.js',
    'css/materialize.min.css',
    'css/styles.css',
    'img/icons/icon-144.png',
    'img/pkcontacts.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

caches.open(cacheName).then(cache =>{
    cache.addAll(assests);
})

//install service worker
self.addEventListener('install', (e)=>{
    console.log('service worker has been installed',e);
});

//activate event
self.addEventListener('activate', (e)=>{
    console.log('service worker has been activated',e);
});

//fetch event
self.addEventListener('fetch', (e)=>{
    console.log('service worker fetch event',e);
});
