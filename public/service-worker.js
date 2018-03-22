/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "bundle.js",
    "revision": "57318bc7ad7bc47ec6d48d7d8f343afe"
  },
  {
    "url": "images/android-chrome-192x192.png",
    "revision": "6c821d0f174b8e85b59de3d7ea00179a"
  },
  {
    "url": "images/android-chrome-512x512.png",
    "revision": "97df89489d23ba73f43e58e969070e63"
  },
  {
    "url": "images/apple-touch-icon.png",
    "revision": "d64e2829936b68c7b669e132e025b440"
  },
  {
    "url": "images/browserconfig.xml",
    "revision": "61bfd064535af0c276bb63b3fd579733"
  },
  {
    "url": "images/favicon-16x16.png",
    "revision": "a58226d1e28079813daae580263af987"
  },
  {
    "url": "images/favicon-32x32.png",
    "revision": "44aab39bab7594619a61089befe4aa88"
  },
  {
    "url": "images/favicon.ico",
    "revision": "27900d91ef20cdd4a5b50fa6c63ed912"
  },
  {
    "url": "images/icon.png",
    "revision": "2195a59fd52f4add0a6011f9264d2e03"
  },
  {
    "url": "images/mstile-144x144.png",
    "revision": "23e66a95463604e0ac2b0cf768ae1b56"
  },
  {
    "url": "images/mstile-150x150.png",
    "revision": "f6d2a8ec987f97b163a2f3def3877aac"
  },
  {
    "url": "images/mstile-310x150.png",
    "revision": "1d4aa78e990d3bacc6fff1cb382f118b"
  },
  {
    "url": "images/mstile-310x310.png",
    "revision": "a8643f2ad790dc4a536c067b0f23b9ae"
  },
  {
    "url": "images/mstile-70x70.png",
    "revision": "5a362bbb8c816e29ac730c5162d1dd5d"
  },
  {
    "url": "images/news.svg",
    "revision": "d30f33dea7b6905f8ac6f921a7a10258"
  },
  {
    "url": "images/safari-pinned-tab.svg",
    "revision": "044896d77a3033aff1ef8604c2eeadb0"
  },
  {
    "url": "index.html",
    "revision": "ff2e3672ff1f4e6a6814cdcbf85248e4"
  },
  {
    "url": "manifest.json",
    "revision": "ca5cee8a63c8671327d0b7e9722b50a0"
  },
  {
    "url": "mdl/bower.json",
    "revision": "cc4bf2ff0f566bc1bfff69eadc6af3ab"
  },
  {
    "url": "mdl/material.css",
    "revision": "06f1e256dfe14286eb1dd63abe2953bb"
  },
  {
    "url": "mdl/material.js",
    "revision": "60f3ee61721d5bbac709fad9c239f2ac"
  },
  {
    "url": "mdl/material.min.css",
    "revision": "9ab85b48144d24908b4e455c2afb648c"
  },
  {
    "url": "mdl/material.min.js",
    "revision": "713af0c6ce93dbbce2f00bf0a98d0541"
  },
  {
    "url": "mdl/package.json",
    "revision": "cb803da073bc3d675e069517d21ec131"
  },
  {
    "url": "style.css",
    "revision": "140d9605506247a0cb27c865ba7ffc1b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
