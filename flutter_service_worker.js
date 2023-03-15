'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "404.html": "0a27a4163254fc8fce870c8cc3a3f94f",
"assets/AssetManifest.json": "2e26fb9a2ad55d691f38f880945a21e7",
"assets/assets/3D_model/google_dev.glb": "22f00a7c01906168dac12d94033dd1ef",
"assets/assets/3D_model/my_model.glb": "2b1ea8471da5583796d9cc4d915f4e71",
"assets/assets/fonts/Inter%255Bwght%255D.ttf": "e2f7fc531940d6f3281cd0f9d831b59e",
"assets/assets/fonts/Inter-Italic%255Bwght%255D.ttf": "7fcf3bea146ff3f5625ef9aa83c5c403",
"assets/assets/fonts/Lato-Hairline.ttf": "a2e8f8eef2ec2047a32e2d6a152a0311",
"assets/assets/fonts/Lato-Light.ttf": "90e1d3559ac52f7f0f77a86e1bfd632d",
"assets/assets/fonts/Lato-Regular.ttf": "3b9b99039cc0a98dd50c3cbfac57ccb2",
"assets/assets/fonts/Lato-Thin.ttf": "eb1635403cd764912ca1e0af78735797",
"assets/assets/fonts/MaShanZheng-Regular.ttf": "dca1fc11a8c2b012170b0de12c13d788",
"assets/assets/fonts/SpaceGrotesk-Regular.otf": "51b003038cc263b9ae4114bc4f3f4ebf",
"assets/assets/images/assassins.jpeg": "e073e3b7550c42f914a15d54048f34f4",
"assets/assets/images/gold_trophy.png": "38aa0a3ab924287d9cf86330c15b8ba5",
"assets/assets/images/google_dev.jpg": "a01272ac0bbb5411449f385ff3925abe",
"assets/assets/images/hoop.jpg": "f2e051573007486964d520d8c7baa559",
"assets/assets/images/my_3D_avatar.png": "6b3e1fbb4aafc98271da5fe3a9805c81",
"assets/assets/images/photography.jpg": "3390c72c9cdb6e6508a4e5e85e195224",
"assets/assets/images/sign.jpg": "204ed6dee10d6a979704c1cf3209bb7f",
"assets/assets/images/swimming.jpg": "5f87cac725a79e40470bef2924c765d2",
"assets/assets%255Cfonts%255CMaShanZheng-Regular.ttf": "dca1fc11a8c2b012170b0de12c13d788",
"assets/assets%255Cfonts%255CSpaceGrotesk-Regular.otf": "51b003038cc263b9ae4114bc4f3f4ebf",
"assets/FontManifest.json": "286bee9a5c83479062f296aa623cf415",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "cdc2aa468b15839a9114f18f535e5db7",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d1722d5cf2c7855862f68edb85e31f88",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "613e4cc1af0eb5148b8ce409ad35446d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dd3c4233029270506ecc994d67785a37",
"assets/packages/model_viewer_plus/assets/model-viewer.min.js": "5648e58354cbcc4aba485a7da101b7f0",
"assets/packages/model_viewer_plus/assets/template.html": "ce0bee852c97830372cf5bac6796cae6",
"assets/shaders/ink_sparkle.frag": "2b23c253cdb2d01c5f5d0ed945aad77c",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "33c2b499155bc6394bf03145923657b7",
"/": "33c2b499155bc6394bf03145923657b7",
"main.dart.js": "f2d26b9020eebd1ffc7485e336f8724b",
"manifest.json": "f6de20b1a7688166c643043567942484",
"version.json": "7252567a56d6fe5d1583b71562be67ac"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
