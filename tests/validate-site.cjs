/* Validate public portfolio data, generated routes, localization and browser UX.
 * Run against a static preview or the deployed website using BASE_URL.
 * Playwright is only a test dependency; the site itself has none.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const locales = ['en', 'hu', 'de', 'es', 'fr', 'pt-BR', 'pl', 'it'];
const names = ['Unit Converter','Ott e!','Age & Date Toolkit','Stopwatch & Multi Timer',
  'Fraction Calculator','Last Done','Material Calculator','Bubble Level & Inclinometer',
  'Ruler & Protractor','Sound Meter','Compass & Altimeter','GPS Speedometer',
  'Device Info & Diagnostics','Image Resizer & Compressor','Voice Recorder',
  'Tuner & Metronome','Electrical Toolkit','Ham Tools / Radio RF Toolkit','Mini Games',
  'Inventory / ReadyStock','Workout / Training','Meal Planner — „Mit főzzek?”',
  'Work Manager','Lottery Filter','Dialer'];
const jargon = /\b(?:V[12](?:\.[\w.]+)?|scope|ownership|domain owner|requirement|contract|wave|W[01]|implementation|release scope)\b/i;
const oldDate = /2027|janu(?:ary|ár|ar|ier|ary)?\s*2027/i;
const appSource = fs.readFileSync(path.join(root, 'assets/portfolio-v2.js'), 'utf8');
const sandbox = {apps: [], L: locales, URL, document: {getElementById: () => ({value:'en'})}, setLanguage: () => {}};
vm.runInNewContext(appSource, sandbox);
const apps = JSON.parse(JSON.stringify(sandbox.apps));
assert.deepEqual(apps.map(a => a.name), names);
assert.equal(new Set(apps.map(a => a.id)).size, 25);
const soonApps = apps.filter(a => a.status === 'soon');
const releasedApps = apps.filter(a => a.status === 'released');
const iconInventory = JSON.parse(fs.readFileSync(path.join(root,'assets/icon-inventory.json'),'utf8')).apps;
assert.deepEqual(iconInventory.map(a=>a.app_id),apps.map(a=>a.id));
assert.equal(new Set(iconInventory.map(a=>a.sha256)).size,25,'Each app has its own icon');
for(const [i,record] of iconInventory.entries()) {
  assert.equal(record.name,apps[i].name);
  const iconUrl=new URL(apps[i].icon,'https://local.test/');
  assert.equal(iconUrl.origin,'https://local.test');
  assert.equal(record.web_asset,decodeURIComponent(iconUrl.pathname.slice(1)));
  if(iconUrl.searchParams.has('v'))assert.equal(iconUrl.searchParams.get('v'),record.sha256.slice(0,12));
  assert(record.canonical_source.startsWith('Assets/Icons/') && !record.canonical_source.startsWith('Assets/Icons/Common/'));
  const data=fs.readFileSync(path.join(root,record.web_asset));
  assert.equal(crypto.createHash('sha256').update(data).digest('hex'),record.sha256,record.app_id);
  assert.equal(data.readUInt32BE(16),record.width);
  assert.equal(data.readUInt32BE(20),record.height);
  assert.equal(record.width,record.height);
  if(process.env.JN86_ICON_SOURCE_ROOT) {
    const source=fs.readFileSync(path.join(process.env.JN86_ICON_SOURCE_ROOT,record.canonical_source));
    assert(data.equals(source),`Canonical icon bytes differ: ${record.app_id}`);
  }
}
// This is the official documentation's real, publicly available Maps listing.
// It is used only as a URI/rendering fixture, never as a JN86 portfolio URL.
const fixturePlayUrl = 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps';
assert(sandbox.isPlayStoreUrl(fixturePlayUrl));
for(const invalid of [null,'','https://play.google.com/apps/testing/hu.jn86.otte',
  'http://play.google.com/store/apps/details?id=com.google.android.apps.maps',
  'https://play.google.com.evil.test/store/apps/details?id=com.google.android.apps.maps',
  'https://user:password@play.google.com/store/apps/details?id=com.google.android.apps.maps',
  fixturePlayUrl+'&url=https://evil.test',fixturePlayUrl+'&id=other.package',
  'https://play.google.com/store/apps/details?id=', 'javascript:alert(1)']) {
  assert.equal(sandbox.isPlayStoreUrl(invalid),false,`Unsafe/non-listing URI: ${invalid}`);
}
for(const status of ['creating','soon']) assert.equal(sandbox.getPlayUrl({status,playUrl:fixturePlayUrl}),null);
assert.equal(sandbox.getPlayUrl({status:'released',playUrl:null}),null);
assert.equal(sandbox.getPlayUrl({status:'released',playUrl:fixturePlayUrl}),fixturePlayUrl);
for (const app of apps) {
  assert.deepEqual(Object.keys(app.copy).sort(), [...locales].sort());
  for (const lang of locales) {
    const copy = app.copy[lang];
    assert(copy.summary && copy.overview && copy.features.length === 4);
    assert(!jargon.test(JSON.stringify(copy)), `${app.id}/${lang}: internal terminology`);
    assert(!oldDate.test(JSON.stringify(copy)), `${app.id}/${lang}: obsolete date`);
    if (lang !== 'en') assert.notEqual(copy.summary, app.copy.en.summary);
  }
  assert(['creating','soon','released'].includes(app.status));
  assert(app.playUrl===null || sandbox.isPlayStoreUrl(app.playUrl));
}
const generated = spawnSync('python3', [path.join(root,'scripts/build-details.py'), '--check'], {encoding:'utf8'});
assert.equal(generated.status, 0, generated.stdout + generated.stderr);

function htmlFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes:true}).flatMap(e => {
    if (e.name.startsWith('.') || e.name === 'node_modules') return [];
    const full = path.join(directory,e.name);
    return e.isDirectory() ? htmlFiles(full) : e.name.endsWith('.html') ? [full] : [];
  });
}
const html = htmlFiles(root);
let localLinks = 0;
for (const file of html) {
  const source = fs.readFileSync(file,'utf8');
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:[a-z][\w+.-]*:|\/\/|#)/i.test(value)) continue;
    const url = new URL(value, 'https://local.test/' + path.relative(root,file));
    const target = path.join(root,decodeURIComponent(url.pathname));
    assert(fs.existsSync(target), `Broken local link: ${path.relative(root,file)} -> ${value}`);
    if (url.hash && target.endsWith('.html')) {
      const id = decodeURIComponent(url.hash.slice(1));
      assert(fs.readFileSync(target,'utf8').includes(`id="${id}"`), `Missing anchor: ${value}`);
    }
    localLinks++;
  }
}
for (const file of fs.readdirSync(path.join(root,'assets')).filter(f=>f.endsWith('.js'))) {
  const syntax = spawnSync(process.execPath,['--check',path.join(root,'assets',file)],{encoding:'utf8'});
  assert.equal(syntax.status,0,syntax.stderr);
}
console.log(`PASS: 25 canonical icons, 200 complete translations, three statuses, Play URI guards, templates, JS syntax, ${localLinks} local links`);
if (process.env.STATIC_ONLY === '1') process.exit(0);

(async()=>{
  const {chromium} = require('playwright');
  const base = process.env.BASE_URL || 'http://127.0.0.1:8766/';
  const output = process.env.OUTPUT_DIR;
  const browser = await chromium.launch({headless:true, ...(process.env.BROWSER_PATH ? {executablePath:process.env.BROWSER_PATH} : {})});
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => {if (r.status() >= 400 && r.url().startsWith(base)) errors.push(`${r.status()}: ${r.url()}`);});
  const routes = ['index.html','apps.html','released.html',...apps.map(a=>`apps/${a.id}.html`)];
  // Shared navigation/style consumers receive a focused regression check as well.
  const otherRoutes = ['about.html','support.html','contact.html','privacy.html','help.html',
    'help/ott-e.html','help/unit-converter.html','privacy/ott-e.html','privacy/unit-converter.html','404.html'];
  let states = 0;
  const renderedLinks = new Set();
  try {
    for (const width of [320,390,1440]) {
      await page.setViewportSize({width,height:1000});
      for (const route of [...routes,...otherRoutes]) {
        const response = await page.goto(new URL(route,base).href,{waitUntil:'networkidle'});
        assert.equal(response.status(),200,route);
        const app = apps.find(a=>route === `apps/${a.id}.html`);
        const selector = await page.locator('#languageSelect,#detailLanguage,#privacyLanguage').count();
        for (const lang of selector ? locales : ['en']) {
          if (selector) await page.locator('#languageSelect,#detailLanguage,#privacyLanguage').selectOption(lang);
          if (selector) assert.equal(await page.locator('html').getAttribute('lang'),lang,`${route}: lang`);
          // Request off-screen images in the test; keep production lazy loading.
          await page.locator('img[loading="lazy"]').evaluateAll(els=>els.forEach(image=>image.loading='eager'));
          try {
            await page.waitForFunction(()=>[...document.images].every(image=>image.complete && image.naturalWidth>0),{},{timeout:5000});
          } catch {
            const broken=await page.evaluate(()=>[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>({src:i.src,complete:i.complete,width:i.naturalWidth})));
            throw new Error(`${route}/${lang}/${width}: image loading failed: ${JSON.stringify(broken)}`);
          }
          const overflow = await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth+1);
          assert(!overflow,`${route}/${lang}/${width}: horizontal overflow`);
          if (routes.includes(route)) {
            const issues = await page.evaluate(()=>{
              const bad=[];
              for(const el of document.querySelectorAll('[data-i18n]')) {
                if(!ui[document.documentElement.lang][el.dataset.i18n]) bad.push(el.dataset.i18n);
              }
              for(const el of document.querySelectorAll('[data-i18n-aria]')) {
                const expected=ui[document.documentElement.lang][el.dataset.i18nAria];
                if(!expected || el.getAttribute('aria-label')!==expected)bad.push(el.dataset.i18nAria);
              }
              for(const el of document.querySelectorAll('main a,main button,select')) {
                if(!el.textContent.trim() && !el.getAttribute('aria-label')) bad.push('unlabelled control');
              }
              if(document.querySelectorAll('h1').length!==1)bad.push('h1 count');
              return bad;
            });
            assert.deepEqual(issues,[],`${route}/${lang}: localization/accessibility`);
            const body = await page.locator('main').innerText();
            assert(!jargon.test(body),`${route}/${lang}: visible internal terminology`);
            assert(!oldDate.test(body),`${route}/${lang}: obsolete date`);
          }
          if (route==='apps.html') {
            assert.deepEqual(await page.locator('.app-card h2').allTextContents(), names);
            assert.equal(await page.locator('.app-card .more').count(),25);
            assert.deepEqual(await page.locator('.app-card.featured h2').allTextContents(),soonApps.map(a=>a.name));
            for (const a of apps) {
              const card = page.locator(`.app-card[data-app="${a.id}"]`);
              assert.equal(await card.locator('p').innerText(),a.copy[lang].summary);
              assert.equal(await card.locator('.badge').textContent(),await page.evaluate(([l,status])=>ui[l]['status_'+status],[lang,a.status]));
              assert.equal(await card.locator('.app-icon').getAttribute('src'),a.icon);
              assert.equal(await card.locator('.app-icon').getAttribute('alt'),'');
              assert.equal(await card.locator('.play-link').count(),sandbox.getPlayUrl(a)?1:0);
            }
          }
          if (route==='index.html') {
            assert.deepEqual(await page.locator('.showcase-card strong').allTextContents(),soonApps.map(a=>a.name));
            assert.equal(await page.locator('[data-app-count="soon"]').innerText(),String(soonApps.length));
            assert.equal(await page.locator('[data-app-count="creating"]').innerText(),String(apps.filter(a=>a.status==='creating').length));
            const entry=page.locator('a[href="released.html"]');
            assert.equal(await entry.count(),1);
            assert.equal(await entry.innerText(),await page.evaluate(l=>ui[l].released_apps,lang));
          }
          if (route==='released.html') {
            assert.equal(await page.locator('.app-card').count(),releasedApps.length);
            assert.deepEqual(await page.locator('.app-card h2').allTextContents(),releasedApps.map(a=>a.name));
            assert.equal(await page.locator('#releasedEmpty').isVisible(),releasedApps.length===0);
            if(!releasedApps.length) {
              assert.equal(await page.locator('[data-i18n="released_empty"]').innerText(),await page.evaluate(l=>ui[l].released_empty,lang));
              assert.equal(await page.locator('.play-link').count(),0);
            }
            assert.equal(await page.title(),await page.evaluate(l=>`${ui[l].released_apps} — JN86`,lang));
          }
          if (app) {
            assert.equal(await page.locator('h1').innerText(),app.name);
            assert.equal(await page.locator('[data-app-summary]').innerText(),app.copy[lang].summary);
            assert.equal(await page.locator('[data-app-overview]').innerText(),app.copy[lang].overview);
            assert.deepEqual(await page.locator('[data-app-features] li').allTextContents(),app.copy[lang].features);
            assert.equal(await page.locator('[data-app-status]').textContent(),await page.evaluate(([l,status])=>ui[l]['status_'+status],[lang,app.status]));
            assert.equal(await page.locator('[data-app-availability]').textContent(),await page.evaluate(([l,status])=>ui[l][appAvailabilityKey(status)],[lang,app.status]));
            assert.equal(await page.locator('meta[name="description"]').getAttribute('content'),app.copy[lang].summary);
            assert((await page.title()).includes(await page.evaluate(l=>ui[l].detail_title,lang)));
            assert.equal(await page.locator('[data-i18n="back_apps"]').getAttribute('href'),'../apps.html');
            assert.equal(await page.locator('.detail-icon').getAttribute('src'),'../'+app.icon);
            assert.equal(await page.locator('.detail-icon').getAttribute('alt'),'');
            assert.equal(await page.locator('[data-app-play] .play-link').count(),sandbox.getPlayUrl(app)?1:0);
          }
          const iconSizes=await page.locator('.app-icon,.detail-icon,.showcase-card img').evaluateAll(els=>els.map(el=>({width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height,naturalWidth:el.naturalWidth,naturalHeight:el.naturalHeight,fit:getComputedStyle(el).objectFit})));
          for(const size of iconSizes) {
            assert(size.naturalWidth>0 && size.naturalWidth===size.naturalHeight);
            assert(Math.abs(size.width-size.height)<0.1,'Icon distortion');
            assert.equal(size.fit,'contain');
          }
          if (width===320 && ['index.html','apps.html','released.html','apps/ott-e.html'].includes(route)) {
            const menu=page.locator('.menu-toggle');
            await menu.click();
            assert.equal(await menu.getAttribute('aria-expanded'),'true');
            assert(await page.locator('.mobile-nav').isVisible());
            assert.equal(await menu.getAttribute('aria-label'),await page.evaluate(l=>ui[l].close_menu,lang));
            await page.keyboard.press('Escape');
            assert.equal(await menu.getAttribute('aria-expanded'),'false');
            assert(await menu.evaluate(el=>el===document.activeElement));
            assert.equal(await menu.getAttribute('aria-label'),await page.evaluate(l=>ui[l].open_menu,lang));
          }
          for (const link of await page.locator('a[href]').evaluateAll(els=>els.map(e=>e.href))) {
            if(link.startsWith(base)) renderedLinks.add(link);
          }
          states++;
        }
      }
      console.log(`PASS: ${width}px, ${states} page/language states checked`);
    }
    for (const url of renderedLinks) {
      const response=await page.request.get(url);
      assert.equal(response.status(),200,`Rendered link: ${url}`);
    }
    // Follow every card and back link with persisted locale; check browser Back too.
    for(const lang of locales) {
      await page.goto(new URL('index.html',base).href);
      await page.locator('#languageSelect').selectOption(lang);
      await page.locator('a[href="released.html"]').click();
      assert.equal(await page.locator('html').getAttribute('lang'),lang);
      assert.equal(await page.locator('.app-card').count(),releasedApps.length);
      if(!releasedApps.length)await page.locator('#releasedEmpty a').click();
      await page.goto(new URL('apps.html',base).href);
      await page.locator('#languageSelect').selectOption(lang);
      for(const app of apps) {
        await page.locator(`.app-card[data-app="${app.id}"] .more`).click();
        assert.equal(await page.locator('h1').innerText(),app.name);
        assert.equal(await page.locator('html').getAttribute('lang'),lang);
        await page.locator('[data-i18n="back_apps"]').click();
        assert.equal(await page.locator('.app-card').count(),25);
        assert.equal(await page.locator('#languageSelect').inputValue(),lang);
      }
      await page.locator('.app-card[data-app="ott-e"] .more').click();
      await page.goBack();
      assert.equal(await page.locator('.app-card').count(),25);
    }
    // A later status change alone must update the featured set.
    await page.goto(new URL('index.html',base).href);
    await page.evaluate(()=>{apps.find(a=>a.id==='unit-converter').status='soon';setLanguage('hu');});
    assert.equal(await page.locator('.showcase-card').count(),2);
    assert.equal(await page.locator('[data-app-count="soon"]').innerText(),'2');
    // Simulate the lifecycle only in isolated browser memory. No fixture is saved.
    let lifecycleStates=0;
    for(const width of [320,1440]) {
      await page.setViewportSize({width,height:1000});
      await page.goto(new URL('released.html',base).href);
      for(const lang of locales) {
        for(const [status,url] of [['creating',fixturePlayUrl],['soon',fixturePlayUrl],['released',null],['released',fixturePlayUrl]]) {
          await page.evaluate(({status,url,lang})=>{const app=apps.find(a=>a.id==='ott-e');app.status=status;app.playUrl=url;setLanguage(lang);},{status,url,lang});
          assert.equal(await page.locator('.app-card').count(),status==='released'?1:0);
          assert.equal(await page.locator('#releasedEmpty').isVisible(),status!=='released');
          assert.equal(await page.locator('.play-link').count(),status==='released'&&url?1:0);
          if(status==='released') {
            assert.equal(await page.locator('.badge').textContent(),await page.evaluate(l=>ui[l].status_released,lang));
            if(url)assert.equal(await page.locator('.play-link').getAttribute('href'),url);
          }
          assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1));
          lifecycleStates++;
        }
      }
    }
    await page.goto(new URL('index.html',base).href);
    await page.evaluate(()=>{apps.find(a=>a.id==='ott-e').status='released';setLanguage('hu');});
    assert.equal(await page.locator('.showcase-card').count(),0,'Released app must leave Coming soon');
    assert(await page.locator('#homeShowcase').isHidden());
    for(const lang of locales) {
      await page.goto(new URL('apps/ott-e.html',base).href);
      await page.evaluate(({lang,url})=>{const app=apps.find(a=>a.id==='ott-e');app.status='released';app.playUrl=url;setLanguage(lang);},{lang,url:fixturePlayUrl});
      assert.equal(await page.locator('[data-app-status]').textContent(),await page.evaluate(l=>ui[l].status_released,lang));
      assert.equal(await page.locator('[data-app-availability]').textContent(),await page.evaluate(l=>ui[l].availability_released,lang));
      assert.equal(await page.locator('[data-app-play] .play-link').getAttribute('href'),fixturePlayUrl);
      lifecycleStates++;
    }
    assert.deepEqual(errors,[],'Browser errors or failed HTTP requests');
    if(output) {
      fs.mkdirSync(output,{recursive:true});
      for(const [route,width,file] of [['index.html',1440,'home-desktop'],['index.html',390,'home-mobile'],['apps.html',390,'apps-mobile'],['released.html',1440,'released-desktop'],['released.html',320,'released-mobile'],['apps/dialer.html',1440,'dialer-detail'],['apps/ott-e.html',1440,'ott-detail-desktop'],['apps/meal-planner.html',320,'meal-detail-mobile']]) {
        await page.setViewportSize({width,height:1000});
        await page.goto(new URL(route,base).href);
        await page.locator('#languageSelect').selectOption('hu');
        await page.screenshot({path:path.join(output,file+'.png'),fullPage:true});
      }
      fs.writeFileSync(path.join(output,'validation.json'),JSON.stringify({base,apps:25,canonicalIcons:25,translations:200,states,lifecycleStates,releasedApps:releasedApps.length,localLinks,renderedLinks:renderedLinks.size,navigationPairs:200,widths:[320,390,1440],errors},null,2));
    }
    console.log(`PASS: ${states} browser states, ${lifecycleStates} lifecycle states, 25 icons, ${renderedLinks.size} rendered links, 200 card/back pairs, locale and keyboard checks`);
  } finally {await browser.close();}
})().catch(e=>{console.error(e.stack);process.exit(1);});
