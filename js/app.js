if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then((reg)=>{console.log('app.js - service worker sw.js registered',reg)})
    .catch((err)=>{console.log('service worker NOT REGISTERED',err)})
}