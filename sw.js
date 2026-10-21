// Reçoit les notifications de rappel (repas manquants) et ouvre le journal au toucher.
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('push', function(e){
  var d={}; try{ d=e.data.json(); }catch(x){ d={title:'🍽️ Ton journal',body:e.data?e.data.text():''}; }
  e.waitUntil(self.registration.showNotification(d.title||'Programme Ornella',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',data:{url:d.url||'./'}}));
});
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var url=(e.notification.data&&e.notification.data.url)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUninstalled:false}).then(function(list){
    for(var i=0;i<list.length;i++){ if('focus' in list[i]){ list[i].postMessage({goJournal:true}); return list[i].focus(); } }
    return self.clients.openWindow(url);
  }));
});
