const V='vesh-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||r.mode!=='navigate')return;
 e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(ch=>ch.put(r,c));return res}).catch(()=>caches.match(r).then(m=>m||caches.match(self.registration.scope))))});
