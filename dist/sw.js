if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const l=e=>n(e,o),c={module:{uri:o},exports:t,require:l};i[o]=Promise.all(s.map((e=>c[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/howler-Bn_ZqINu.js",revision:null},{url:"assets/index-iTX9U7ez.css",revision:null},{url:"assets/index-ntL2spaZ.js",revision:null},{url:"index.html",revision:"072606cf6c97f725580c4bd02dbedb6e"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"./icon-192x192.png",revision:"b74e679580f0214e856bdf97fe835ee2"},{url:"./icon-256x256.png",revision:"6d292a852759a72e47f6f4863520f4cc"},{url:"./icon-384x384.png",revision:"5fdb8f5431ebcb75938fb8f9820c0eb1"},{url:"./icon-512x512.png",revision:"bdcd3917e487a1766dc018e20883e67e"},{url:"manifest.webmanifest",revision:"975855b684eeb24a1a51f9478ff1c683"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
