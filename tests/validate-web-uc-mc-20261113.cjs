/* Targeted publication checks. Requires the repo's existing Playwright runtime. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const {chromium} = require('playwright');
const root = path.resolve(__dirname, '..');
const base = process.env.BASE_URL || 'http://127.0.0.1:8793/';
const output = process.env.OUTPUT_DIR;
const baseline = '1e8a4b2f69911d693dc778c68c273e22b91a2b37';
const langs = ['en','hu','de','es','fr','pt-BR','pl','it'];
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const before = file => execFileSync('git',['-C',root,'show',`${baseline}:${file}`],{encoding:'utf8',maxBuffer:8e6});
const details = JSON.parse(read('assets/app-details.json'));
const policy = JSON.parse(read('assets/privacy-material-calculator.json'));
const oldPolicy = JSON.parse(before('assets/privacy-material-calculator.json'));
const oldDetails = JSON.parse(before('assets/app-details.json'));
const mc = details.apps['material-calculator'];
const campaign = read('assets/uc-holiday.js');
const deadline = Date.parse('2027-01-05T00:00:00Z');
const report = {base, languages:langs, source:'PASS', rendering:0, timing:[], screenshots:[]};
if (output) fs.mkdirSync(output,{recursive:true});

assert.deepEqual(policy.locales, langs);
assert.deepEqual(policy.links, oldPolicy.links, 'Keep all existing provider links');
assert.deepEqual(policy.sections.filter(s=>s.id!=='files').map(s=>s.id),oldPolicy.sections.map(s=>s.id),'Stable privacy anchors');
const changedPolicyKeys = new Set(['status','updated','localText','storedTitle','storedText','deleteText','backupTitle','backupText']);
for (const lang of langs) {
  for (const [key,value] of Object.entries(oldPolicy.copy[lang])) {
    if (!changedPolicyKeys.has(key)) assert.equal(policy.copy[lang][key],value,`${lang}/${key}: preserve original privacy claims`);
  }
  for (const [key,value] of Object.entries(policy.copy[lang])) {
    assert(value.trim(),`${lang}/${key}`);
    if (lang !== 'en') assert.notEqual(value,policy.copy.en[key],`${lang}/${key}: untranslated`);
    assert(!/TODO|PLACEHOLDER|\{\{/.test(value),`${lang}/${key}: placeholder`);
  }
}
for (const [id,value] of Object.entries(oldDetails.apps)) {
  if (id !== 'material-calculator') assert.deepEqual(details.apps[id],value,`Unchanged app: ${id}`);
}
const items = mc.sections.flatMap(s=>s.items);
for (const id of ['mat-paint','mat-wallpaper','mat-wallpaper-strips','mat-floor-tile','mat-tile','mat-concrete','mat-garden','mat-soil','mat-gravel','mat-project-save','mat-project-edit','mat-transfer','mat-project-totals','mat-shopping','mat-pdf','mat-backup','mat-presets','mat-egg']) {
  assert(items.some(i=>i.id===id),`Missing feature: ${id}`);
}
for (const item of items) for (const lang of langs) {
  assert(item.title[lang] && item.text[lang]?.length > 40,`${item.id}/${lang}`);
  if (lang !== 'en') assert.notEqual(item.text[lang],item.text.en);
}
const campaignCopy = campaign.slice(campaign.indexOf('const copy ='),campaign.indexOf('let timer;'));
assert(!/[$€£¥₹₽₩]|\b(?:USD|EUR|HUF|GBP|PLN|BRL)\b|\d\s*%/i.test(campaignCopy),'No numeric price, currency or discount percentage');
assert(campaign.includes('2027-01-05T00:00:00Z'),'UTC deadline');
assert.match(read('apps/unit-converter.html'),/id="uc-holiday" hidden/,'Hidden before script execution');
function portfolio(source) {
  const sandbox={apps:[],L:langs,URL,document:{getElementById:()=>({value:'en'})},setLanguage:()=>{}};
  vm.runInNewContext(source,sandbox);
  return JSON.parse(JSON.stringify(sandbox.apps));
}
const apps=portfolio(read('assets/portfolio-v2.js'));
const oldApps=portfolio(before('assets/portfolio-v2.js'));
for (const app of apps) {
  const old=oldApps.find(a=>a.id===app.id);
  if(app.id!=='material-calculator') assert.deepEqual(app,old,app.id);
  else {
    assert.equal(app.status,old.status,'No invented publication status');
    assert.equal(app.playUrl,null,'No invented MC store URL');
    assert.equal(app.showDevelopmentStatus,false);
  }
}
for (const file of ['app-ads.txt','sitemap.xml','robots.txt','privacy.css','app-pages.json'].map(f=>['privacy.css','app-pages.json'].includes(f)?'assets/'+f:f)) {
  assert.equal(read(file),before(file),`Preserved: ${file}`);
}
const tracked = execFileSync('git',['-C',root,'ls-tree','-r','--name-only',baseline],{encoding:'utf8'}).trim().split('\n');
for(const file of tracked.filter(f=>/^(?:apps|privacy)\/.*\.html$/.test(f) && !['apps/unit-converter.html','apps/material-calculator.html','privacy/material-calculator.html'].includes(f))) {
  assert.equal(read(file),before(file),`Unrelated page: ${file}`);
}

(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'/usr/bin/google-chrome'});
  const errors=[];
  async function attach(page) {
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  }
  try {
    if (process.env.TIMING_ONLY !== '1') {
      const context=await browser.newContext();
      const page=await context.newPage(); await attach(page);
      await page.clock.install({time:new Date('2026-11-13T12:00:00Z')});
      for(const colorScheme of ['dark','light']) {
        await page.emulateMedia({colorScheme,reducedMotion:'reduce'});
        for(const width of [320,768,1440]) {
          await page.setViewportSize({width,height:1000});
          for(const route of ['apps/unit-converter.html','apps/material-calculator.html','privacy/material-calculator.html']) {
            assert.equal((await page.goto(base+route)).status(),200);
            for(const lang of langs) {
              await page.selectOption('#languageSelect',lang);
              assert.equal(await page.locator('html').getAttribute('lang'),lang);
              assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route}/${width}/${lang}: overflow`);
              assert.equal(await page.locator('h1').count(),1);
              if(route==='apps/unit-converter.html') {
                assert(await page.locator('#uc-holiday').isVisible());
                assert(await page.locator('#uc-holiday h2').innerText());
                assert.equal(await page.locator('#uc-holiday a').getAttribute('href'),apps.find(a=>a.id==='unit-converter').playUrl);
                assert.equal(await page.locator('#uc-holiday a').innerText(),await page.evaluate(l=>ui[l].play_cta,lang));
              } else if(route==='apps/material-calculator.html') {
                for(const item of items) {
                  assert.equal(await page.locator(`#${item.id} [data-content-item-title]`).textContent(),item.title[lang]);
                  assert.equal(await page.locator(`#${item.id} [data-content-item-text]`).textContent(),item.text[lang]);
                }
                assert(!(await page.locator('[data-app-status]').isVisible()));
                assert(!(await page.locator('[data-app-stage]').isVisible()));
                assert(!(await page.locator('[data-content-notice]').isVisible()));
                assert(!(await page.locator('[data-app-availability]').isVisible()));
                assert(!(await page.locator('main').innerText()).match(/UI-\d|FUNC-|fejlesztés alatt|hamarosan|planned|in development|coming soon/i));
              } else {
                for(const field of await page.locator('[data-p]').evaluateAll(els=>els.map(el=>({key:el.dataset.p,text:el.textContent})))) {
                  assert.equal(field.text,policy.copy[lang][field.key],`${lang}/${field.key}`);
                }
                for(const section of policy.sections) {
                  assert.equal(await page.locator(`.policy-toc a[href="#${section.id}"]`).textContent(),policy.copy[lang][section.title]);
                  assert.equal(await page.locator(`#${section.id} h2`).textContent(),policy.copy[lang][section.title]);
                }
              }
              report.rendering++;
            }
          }
        }
      }
      await page.goto(base+'apps.html');
      for(const lang of langs) {
        await page.selectOption('#languageSelect',lang);
        assert.deepEqual(await page.locator('[data-app="material-calculator"] .badge').allTextContents(),await page.evaluate(l=>[ui[l].status_creating,ui[l].status_plan],lang));
        assert.equal(await page.locator('[data-app="unit-converter"] .badge.released').count(),1);
      }
      await page.goto(base+'apps/material-calculator.html');
      const first=page.locator('.detail-section').first();
      await first.locator('summary').focus(); await page.keyboard.press('Enter');
      assert.equal(await first.getAttribute('open'),null);
      await page.selectOption('#languageSelect','hu');
      assert.equal(await first.getAttribute('open'),null);
      await first.locator('summary').focus(); await page.keyboard.press('Enter');
      assert.notEqual(await first.getAttribute('open'),null);
      await page.goto(base+'privacy/material-calculator.html');
      await page.selectOption('#languageSelect','hu');
      await page.locator('.policy-toc a[href="#files"]').focus(); await page.keyboard.press('Enter');
      assert(page.url().endsWith('#files'));
      assert(await page.locator('#files').evaluate(el=>el.getBoundingClientRect().top>=0&&el.getBoundingClientRect().top<innerHeight));
      if(output) {
        for(const [name,route,width,anchor] of [
          ['uc-mobile','apps/unit-converter.html',390,'#uc-holiday'],
          ['mc-mobile','apps/material-calculator.html',320,'#mat-features'],
          ['mc-tablet-projects','apps/material-calculator.html',768,'#mat-project-save'],
          ['privacy-desktop','privacy/material-calculator.html',1440,'.policy-toc'],
          ['privacy-mobile-files','privacy/material-calculator.html',390,'#files']
        ]) {
          await page.setViewportSize({width,height:1000});
          await page.goto(base+route); await page.selectOption('#languageSelect','hu');
          // section ids are data attributes on the existing native details elements.
          const target=anchor==='#mat-features'?'[data-content-section="mat-features"]':anchor;
          await page.locator(target).scrollIntoViewIfNeeded();
          const file=path.join(output,name+'.png'); await page.screenshot({path:file});report.screenshots.push(file);
        }
      }
      await context.close();
    }
    for(const timezoneId of ['UTC','Europe/Budapest','America/Los_Angeles','Pacific/Kiritimati']) {
      const context=await browser.newContext({timezoneId});
      const page=await context.newPage(); await attach(page);
      await page.clock.install({time:new Date('2026-11-13T00:00:00Z')});
      for(const [label,time,visible] of [['publication','2026-11-13T00:00:00Z',true],['before','2027-01-04T23:59:59.999Z',true],['exact','2027-01-05T00:00:00Z',false],['after','2027-01-05T00:00:00.001Z',false]]) {
        await page.clock.setFixedTime(new Date(time));
        await page.goto(base+'apps/unit-converter.html');
        for(const lang of langs) {
          await page.selectOption('#languageSelect',lang);
          assert.equal(await page.locator('#uc-holiday').isVisible(),visible,`${timezoneId}/${label}/${lang}`);
        }
        await page.reload(); assert.equal(await page.locator('#uc-holiday').isVisible(),visible,`${timezoneId}/${label}: reload`);
        report.timing.push({timezoneId,case:label,languages:8,reload:true,result:'PASS'});
      }
      await context.close();
      // An open page crosses the deadline without navigation or a language change.
      const liveContext=await browser.newContext({timezoneId});
      const openPage=await liveContext.newPage(); await attach(openPage);
      await openPage.clock.install({time:new Date(deadline-1000)});
      await openPage.clock.pauseAt(new Date(deadline-1000));
      await openPage.goto(base+'apps/unit-converter.html');
      assert(await openPage.locator('#uc-holiday').isVisible());
      await openPage.clock.runFor(999);assert(await openPage.locator('#uc-holiday').isVisible());
      await openPage.clock.runFor(1);assert(!(await openPage.locator('#uc-holiday').isVisible()));
      // Simulate a suspended/background page returning with a changed wall clock.
      await openPage.clock.setFixedTime(new Date(deadline-5000));
      await openPage.reload();assert(await openPage.locator('#uc-holiday').isVisible());
      await openPage.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
      assert(!(await openPage.locator('#uc-holiday').isVisible()));
      await openPage.clock.setFixedTime(new Date(deadline+1));
      await openPage.evaluate(()=>window.dispatchEvent(new Event('pageshow')));
      assert(!(await openPage.locator('#uc-holiday').isVisible()));
      await openPage.evaluate(()=>document.dispatchEvent(new Event('visibilitychange')));
      assert(!(await openPage.locator('#uc-holiday').isVisible()));
      report.timing.push({timezoneId,case:'open page exact deadline + cached/background resume',result:'PASS'});
      await liveContext.close();
    }
    const noScript=await browser.newContext({javaScriptEnabled:false});
    const nsPage=await noScript.newPage();await nsPage.goto(base+'apps/unit-converter.html');
    assert(!(await nsPage.locator('#uc-holiday').isVisible()),'No-JS never advertises an expired offer');
    await nsPage.goto(base+'apps/material-calculator.html');
    assert((await nsPage.locator('main').innerText()).includes('Save calculations in projects'));
    assert(!(await nsPage.locator('main').innerText()).match(/In the works|Planned|being created|Coming soon/));
    await noScript.close();
    assert.deepEqual(errors,[],'Browser errors');
    report.status='PASS';report.noJavaScript='PASS';
    if(output)fs.writeFileSync(path.join(output,'checks.json'),JSON.stringify(report,null,2)+'\n');
    console.log(JSON.stringify(report,null,2));
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
