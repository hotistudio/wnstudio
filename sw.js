// wnstudio sw.js - updated: 1775480145
const CACHE = 'wnstudio-1775480145';
const CORE = ['/wnstudio/', '/wnstudio/index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 캐시 우선, 백그라운드 갱신 — Safari 재다운로드 창 방지
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // 네비게이션(페이지 로드) 요청은 캐시만 사용
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
    return;
  }
  // 그 외 리소스: 캐시 우선, 백그라운드 갱신
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(res => {
          if (res && res.status === 200) cache.put(e.request, res.clone());
          return res;
        }).catch(() => null);
        return cached || fetchPromise;
      })
    )
  );
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
