// 하루결 서비스워커: 앱 파일을 기기에 저장해 오프라인에서도 열리게 합니다.
// 앱을 수정해 배포할 때는 아래 버전 번호를 올려 주세요(캐시 갱신).
const CACHE = "harugyeol-v1";
const SHELL = ["./", "./index.html", "./config.js", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) { // 폰트·라이브러리: 네트워크 우선, 실패 시 캐시
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; }).catch(() => caches.match(req)));
    return;
  }
  // 앱 파일: 네트워크 우선(새 버전 반영), 실패 시 캐시(오프라인)
  e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; }).catch(() => caches.match(req).then(m => m || caches.match("./index.html"))));
});
