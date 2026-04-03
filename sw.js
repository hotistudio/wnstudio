const CACHE_NAME = 'hopil-studio-v1';
const ASSETS = [
  '/wnstudio/',
  '/wnstudio/index.html',
  '/wnstudio/manifest.json',
  '/wnstudio/icon-192.png',
  '/wnstudio/icon-512.png',
];

// 설치: 핵심 파일 캐시
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS).catch(function() {});
    })
  );
  self.skipWaiting();
});

// 활성화: 오래된 캐시 삭제
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// fetch: 네트워크 우선, 실패 시 캐시
self.addEventListener('fetch', function(e) {
  // GET 요청만 처리
  if (e.request.method !== 'GET') return;
  // chrome-extension 등 무시
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    fetch(e.request)
      .then(function(res) {
        // 유효한 응답이면 캐시에도 저장
        if (res && res.status === 200) {
          var resClone = res.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, resClone);
          });
        }
        return res;
      })
      .catch(function() {
        // 오프라인이면 캐시에서
        return caches.match(e.request).then(function(cached) {
          return cached || new Response('오프라인 상태입니다.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        });
      })
  );
});
