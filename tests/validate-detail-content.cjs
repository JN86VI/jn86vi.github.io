/* Content rendering and source coverage. Semantic source review is recorded separately. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const work = path.join(root, 'docs/details-restoration-20261012');
const data = JSON.parse(fs.readFileSync(path.join(root, 'assets/app-details.json')));
const coverage = JSON.parse(fs.readFileSync(path.join(work, 'coverage.json')));
const portfolio = JSON.parse(fs.readFileSync(path.join(work, '..', 'w7-portfolio', 'catalog.json')));
assert.deepEqual(Object.keys(data.apps).sort(), portfolio.apps.map(a => a.id).sort(), 'Complete portfolio descriptions required');
assert.deepEqual(data.locales, ['en','hu','de','es','fr','pt-BR','pl','it']);
const ids = process.env.APP_ID ? [process.env.APP_ID] : Object.keys(data.apps);
const locales = process.env.LANGS ? process.env.LANGS.split(',') : data.locales;
const banned = /\b(?:v[12](?:\.\d+)?|roadmap|scope|contract|registry|implementation|work package|audit|future features)\b|munkacsomag|implementáció|későbbi ötlet|jövőbeli bővítés/i;
for (const id of ids) {
  const app = data.apps[id];
  assert(app, `Missing descriptions: ${id}`);
  const items = app.sections.flatMap(s => s.items);
  assert.equal(new Set(items.map(i => i.id)).size, items.length, `${id}: duplicate anchors`);
  assert.deepEqual(items.map(i => i.id).sort(), coverage[id].map(i => i.web_anchor).sort(), `${id}: unmapped function`);
  for (const section of app.sections) {
    for (const lang of locales) {
      assert(section.title[lang]?.trim(), `${id}/${lang}: section title`);
      if (section.intro) assert(section.intro[lang]?.trim(), `${id}/${lang}: introduction`);
      for (const item of section.items) {
        assert(item.title[lang]?.trim(), `${id}/${lang}/${item.id}: title`);
        assert(item.text[lang]?.trim().length >= 40, `${id}/${lang}/${item.id}: explanation`);
        assert(!banned.test(item.title[lang] + ' ' + item.text[lang]), `${id}/${lang}/${item.id}: internal/future terminology`);
        if (lang !== 'en' && locales.includes('en')) assert.notEqual(item.text[lang], item.text.en, `${id}/${lang}/${item.id}: untranslated text`);
      }
    }
  }
  const generated = spawnSync('python3', [path.join(root, 'scripts/build-details.py'), '--app', id, '--check'], {encoding:'utf8'});
  assert.equal(generated.status, 0, generated.stdout + generated.stderr);
}
if (!process.env.BASE_URL) {
  const baseline = JSON.parse(fs.readFileSync(path.join(work, 'baseline.json')));
  for (const [file, hash] of Object.entries(baseline.protected)) {
    const expected = baseline.authorized_updates?.[file]?.sha256 || hash;
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'), expected, `Protected content changed: ${file}`);
  }
}
if (process.env.STATIC_ONLY === '1') {
  console.log(`PASS: ${ids.length} descriptions; ${locales.length} languages; coverage, generated HTML and protected files`);
  process.exit(0);
}
(async () => {
  const {chromium} = require('playwright');
  const browser = await chromium.launch({headless:true, executablePath:process.env.BROWSER_PATH || '/usr/bin/google-chrome'});
  const page = await browser.newPage();
  const errors = [];
  const base = process.env.BASE_URL || 'http://127.0.0.1:8766/';
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => {if (r.url().startsWith(base) && r.status() >= 400) errors.push(`${r.status()}: ${r.url()}`);});
  try {
    for (const id of ids) {
      let states = 0;
      for (const width of [320,390,1440]) {
        await page.setViewportSize({width, height:1000});
        const response = await page.goto(`${base}apps/${id}.html`);
        assert.equal(response.status(), 200);
        for (const lang of locales) {
          await page.selectOption('#languageSelect', lang);
          await page.waitForFunction(l => document.documentElement.lang === l, lang);
          const issues = await page.evaluate(([id,lang]) => {
            const issues = [];
            const expected = appDetails.apps[id];
            const labels = appDetails.labels[lang];
            const same = (selector,value) => {if (document.querySelector(selector)?.textContent !== value) issues.push(selector);};
            same('[data-content-heading]', labels.heading);
            for (const section of expected.sections) {
              const node = document.querySelector(`[data-content-section="${section.id}"]`);
              if (!node) {issues.push(section.id);continue;}
              if (node.querySelector('[data-content-section-title]').textContent !== section.title[lang]) issues.push(section.id + '/title');
              if (section.intro && node.querySelector('[data-content-intro]').textContent !== section.intro[lang]) issues.push(section.id + '/intro');
              for (const item of section.items) {
                const article = document.getElementById(item.id);
                if (article?.querySelector('[data-content-item-title]')?.textContent !== item.title[lang]) issues.push(item.id + '/title');
                if (article?.querySelector('[data-content-item-text]')?.textContent !== item.text[lang]) issues.push(item.id + '/text');
                if (item.units && article.querySelector('.detail-units').textContent !== labels.units + ' ' + item.units.join(', ')) issues.push(item.id + '/units');
              }
            }
            if (document.documentElement.scrollWidth > innerWidth + 1) issues.push('horizontal overflow');
            if (document.querySelectorAll('h1').length !== 1) issues.push('heading hierarchy');
            return issues;
          }, [id,lang]);
          assert.deepEqual(issues, [], `${id}/${lang}/${width}`);
          const text = await page.locator('.app-content').innerText();
          assert(!banned.test(text), `${id}/${lang}: public terminology`);
          if (width === 390 && lang === 'hu' && process.env.OUTPUT_DIR) {
            fs.mkdirSync(process.env.OUTPUT_DIR,{recursive:true});
            await page.screenshot({path:path.join(process.env.OUTPUT_DIR,`${id}.png`),fullPage:true});
          }
          states++;
        }
      }
      const first = page.locator('.detail-section').first();
      await first.locator('summary').focus();
      await page.keyboard.press('Enter');
      assert.equal(await first.getAttribute('open'),null);
      await page.selectOption('#languageSelect', locales[0]);
      assert.equal(await first.getAttribute('open'),null,'Language change must preserve collapsed state');
      await first.locator('summary').focus();
      await page.keyboard.press('Space');
      assert.notEqual(await first.getAttribute('open'),null);
      const links = await page.locator('main a[href]').evaluateAll(els => els.map(e => e.href));
      for (const url of links.filter(u => u.startsWith(base))) assert.equal((await page.request.get(url)).status(),200,url);
      assert.deepEqual(errors, []);
      const report = {app:id,status:'PASS',languages:locales,widths:[320,390,1440],rendered_states:states,sections:data.apps[id].sections.length,feature_descriptions:data.apps[id].sections.flatMap(s=>s.items).length,coverage_rows:coverage[id].length,links_checked:links.length,keyboard_and_language_state:'PASS',errors:[],base_url:base};
      const reportDirectory = process.env.REPORT_DIR || (!process.env.BASE_URL ? work : null);
      if (reportDirectory) {
        fs.mkdirSync(reportDirectory,{recursive:true});
        fs.writeFileSync(path.join(reportDirectory,`${id}-validation.json`),JSON.stringify(report,null,2)+'\n');
      }
      console.log(JSON.stringify(report));
    }
  } finally {await browser.close();}
})().catch(e => {console.error(e);process.exit(1);});
