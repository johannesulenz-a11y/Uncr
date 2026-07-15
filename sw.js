const CACHE_NAME = 'uncr-cache-v38';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([
        './index.html',
        './manifest.json',
        './icon-192.png',
        './icon-512.png',
        './icon-apple-touch.png',
        './icon-maskable.png'
      ]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isIndexHtml = url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');

  if (isIndexHtml) {
    e.respondWith(
      fetch(new Request(e.request, { cache: 'no-store' }))
        .then(resp => {
          if (resp.ok) caches.open(CACHE_NAME).then(c => c.put('./index.html', resp.clone()));
          return resp;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok) caches.open(CACHE_NAME).then(c => c.put(e.request, resp.clone()));
        return resp;
      });
    })
  );
});
