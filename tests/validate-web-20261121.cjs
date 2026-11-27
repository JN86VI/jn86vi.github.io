/* UC campaign and Mini Games policy checks for a static preview or Pages. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');

const root = path.resolve(__dirname, '..');
const base = process.env.BASE_URL || 'http://127.0.0.1:8766/';
const output = process.env.OUTPUT_DIR;
const policy = require('../assets/privacy-mini-games.json');
const pages = require('../assets/app-pages.json').apps['mini-games'];
const games = require('../assets/app-details.json').apps['mini-games'].sections[0].items
  .filter(item => item.id !== 'mg-saved');
const locales = ['en', 'hu', 'de', 'es', 'fr', 'pt-BR', 'pl', 'it'];
const widths = [320, 768, 1440];
const offerRoutes = ['index.html', 'apps/unit-converter.html'];
const policyRoute = 'privacy/mini-games.html';
const deadline = Date.parse('2027-01-05T00:00:00Z');
const campaignDay = new Date('2026-11-21T12:00:00Z');
const soon = ['fraction-calculator', 'material-calculator', 'mini-games'];
const playUrl = 'https://play.google.com/store/apps/details?id=hu.jn86.unitconverter';
const activation = /(?:tap|click) (?:the )?(?:about )?(?:logo|icon).{0,35}(?:seven|7) (?:times|taps)|about logo|névjegy logój|(?:siebenmal|siete veces|sept fois|sete vezes|siedem razy|sette volte).{0,24}(?:logo|ico[nn]|symbol|znak)|data-content-item="[^"]+-egg"|id="uc-dedication"/iu;
const price = /[$€£¥₹₽₩]|\b(?:USD|EUR|HUF|GBP|PLN|BRL)\b|\d\s*%/i;
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

assert.deepEqual(policy.locales, locales);
assert.equal(games.length,11);
assert.equal(games[0].id,'mg-2248');
assert.equal(pages.planned,false);
assert(!pages.closedTesting);
for (const dir of ['apps','help']) {
  for (const file of fs.readdirSync(path.join(root, dir)).filter(name=>name.endsWith('.html'))) {
    assert(!activation.test(read(`${dir}/${file}`)), `Public activation in ${dir}/${file}`);
  }
}
for (const file of ['assets/app-details.json','assets/app-details-data.js','assets/app-pages.json',
  'assets/app-pages-data.js','assets/portfolio-v2.js','about.html','help.html','index.html']) {
  assert(!activation.test(read(file)), `Public activation in ${file}`);
}
for (const route of offerRoutes) {
  assert.match(read(route), /id="uc-holiday" hidden/);
  assert.equal((read(route).match(/uc-holiday\.js/g) || []).length, 1);
}
assert.match(read('privacy.html'), /href="privacy\/mini-games\.html"/);
assert.match(read('apps/mini-games.html'), /href="\.\.\/privacy\/mini-games\.html"/);

async function visit(page, route) {
  const response = await page.goto(new URL(route,base).href);
  assert.equal(response?.status(),200,route);
}

async function language(page, lang) {
  await page.locator('#languageSelect').selectOption(lang);
  assert.equal(await page.locator('html').getAttribute('lang'),lang);
}

async function noOverflow(page, label) {
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), label);
}

(async () => {
  const browser = await chromium.launch({headless:true, executablePath:process.env.BROWSER_PATH || '/usr/bin/google-chrome'});
  const errors = [];
  let responsiveStates = 0;
  let timingStates = 0;
  async function newPage(options) {
    const page = await browser.newPage(options);
    page.on('pageerror', error=>errors.push(error.message));
    page.on('response', response=>{
      if(response.url().startsWith(base) && response.status() >= 400) {
        errors.push(`${response.status()} ${response.url()}`);
      }
    });
    return page;
  }
  try {
    const page = await newPage();
    await page.clock.setFixedTime(campaignDay);
    for (const width of widths) {
      await page.setViewportSize({width, height:900});
      const campaignCopy = new Map();
      for (const route of offerRoutes) {
        await visit(page, route);
        const notice = page.locator('#uc-holiday');
        const isHome = route === 'index.html';
        for (const lang of locales) {
          await language(page,lang);
          assert(await notice.isVisible(), `${route}/${width}/${lang}: active notice`);
          const heading = await notice.locator('h2').innerText();
          const detail = await notice.locator('p').innerText();
          assert(heading && detail.includes('Unit Converter') && detail.includes('2027'));
          assert(!price.test(detail), `${route}/${lang}: price`);
          assert.equal(await page.getByRole('complementary',{name:heading}).count(),1);
          assert.equal(await notice.locator('.uc-holiday-icon').getAttribute('aria-hidden'),'true');
          assert(await notice.locator('.uc-holiday-icon').isVisible());
          const link = notice.getByRole('link',{name:/Unit Converter/});
          assert.equal(await link.getAttribute('href'),isHome ? 'apps/unit-converter.html#uc-holiday' : playUrl);
          await link.focus();
          assert(await link.evaluate(node=>node===document.activeElement));
          if (isHome) {
            campaignCopy.set(lang,[heading,detail]);
            assert.deepEqual(await page.locator('#homeShowcase .showcase-card').evaluateAll(
              cards=>cards.map(card=>card.dataset.app)),soon);
          } else {
            assert.deepEqual([heading,detail],campaignCopy.get(lang),`${lang}: copy parity`);
          }
          await noOverflow(page,`${route}/${width}/${lang}: overflow`);
          responsiveStates++;
        }
      }
      assert.equal(new Set([...campaignCopy.values()].map(([heading])=>heading)).size,8);

      await visit(page,policyRoute);
      for (const lang of locales) {
        await language(page,lang);
        const copy = policy.copy[lang];
        const fields = await page.locator('[data-p]').evaluateAll(nodes=>nodes.map(node=>[node.dataset.p,node.textContent]));
        assert.deepEqual([...new Set(fields.map(([key])=>key))].sort(),Object.keys(copy).sort());
        for (const [key,text] of fields) assert.equal(text,copy[key],`${lang}/${key}`);
        for (const section of policy.sections) {
          const item = page.locator(`.policy-toc a[href="#${section.id}"]`);
          assert.equal(await item.innerText(),copy[section.title]);
          assert.equal(await page.locator(`#${section.id} h2`).innerText(),copy[section.title]);
        }
        for (const link of policy.links) assert.equal(await page.locator(`[data-p="${link.key}"]`).getAttribute('href'),link.href);
        assert((await page.locator('.policy-meta').innerText()).endsWith('hu.jn86.minigames'));
        await noOverflow(page,`${policyRoute}/${width}/${lang}: overflow`);
        responsiveStates++;
      }
      await page.locator('.policy-toc a[href="#backup"]').press('Enter');
      assert(page.url().endsWith('#backup'),'Keyboard contents navigation');
      await page.locator('[data-p="back"]').click();
      assert(page.url().endsWith('/apps/mini-games.html'));
      for (const lang of locales) {
        await language(page,lang);
        assert.equal(await page.locator('[data-app-status].soon').textContent(),await page.evaluate(()=>ui[document.documentElement.lang].status_soon));
        assert.equal(await page.locator('[data-app-availability]').innerText(),pages.copy[lang].reviewNotice);
        assert(await page.locator('[data-content-notice]').isHidden());
        assert.equal(await page.locator('[data-app-play] a').count(),0);
        assert(!/\b2048\b/.test(await page.locator('main').innerText()));
        for (const game of games) {
          const article = page.locator(`#${game.id}`);
          assert.equal(await article.locator('h3').innerText(),game.title[lang]);
          assert.equal(await article.locator('p').innerText(),game.text[lang]);
        }
        assert.match(await page.locator('#mg-2248 p').innerText(),/2 \+ 2 \+ 4 → 8/);
        await noOverflow(page,`Mini Games detail/${width}/${lang}`);
        responsiveStates++;
      }
      await visit(page,'index.html');
      await page.locator('#homeShowcase [data-app="mini-games"]').click();
      assert(page.url().endsWith('/apps/mini-games.html'));
    }
    await visit(page,'index.html');
    await language(page,'hu');
    await page.locator('#uc-holiday a').press('Enter');
    assert(page.url().endsWith('/apps/unit-converter.html#uc-holiday'));
    assert.equal(await page.locator('html').getAttribute('lang'),'hu');
    await visit(page,'apps/fraction-calculator.html');
    assert.equal(await page.locator('#uc-holiday, [data-app-play] a').count(),0);
    if (output) {
      fs.mkdirSync(output,{recursive:true});
      for (const [route,width,file] of [
        ['index.html',390,'home-mobile'], ['index.html',1440,'home-desktop'],
        ['apps/unit-converter.html',768,'uc-tablet'], [policyRoute,390,'mini-games-privacy-mobile']
      ]) {
        await page.setViewportSize({width,height:900});
        await visit(page,route);
        await page.locator(route===policyRoute ? '.policy-toc' : route==='index.html' ? '#homeShowcase' : '#uc-holiday')
          .screenshot({path:path.join(output,file+'.png')});
      }
    }
    await page.close();

    for (const timezoneId of ['Europe/Budapest','America/Los_Angeles','Pacific/Auckland']) {
      for (const route of offerRoutes) {
        const tab = await newPage({timezoneId});
        const before = new Date(deadline-1000);
        await tab.clock.install({time:new Date(deadline-5000)});
        await tab.clock.pauseAt(before);
        await visit(tab,route);
        const notice = tab.locator('#uc-holiday');
        assert(await notice.isVisible(),`${route}/${timezoneId}: before deadline`);
        await tab.clock.runFor(999);
        assert(await notice.isVisible(),`${route}/${timezoneId}: last millisecond`);
        await tab.clock.runFor(1);
        assert(await notice.isHidden(),`${route}/${timezoneId}: open at deadline`);
        await tab.reload();
        assert(await notice.isHidden(),`${route}/${timezoneId}: load at deadline`);
        await tab.clock.runFor(1);
        await tab.reload();
        for (const lang of locales) {
          await language(tab,lang);
          assert(await notice.isHidden(),`${route}/${timezoneId}/${lang}: expired`);
        }
        await tab.clock.setSystemTime(before);
        await tab.reload();
        assert(await notice.isVisible());
        await tab.evaluate(()=>window.dispatchEvent(new Event('pagehide')));
        assert(await notice.isHidden());
        await tab.clock.setSystemTime(new Date(deadline+1000));
        await tab.evaluate(()=>window.dispatchEvent(new Event('pageshow')));
        assert(await notice.isHidden(),`${route}/${timezoneId}: resume after deadline`);
        timingStates++;
        await tab.close();
      }
    }
    const noScript = await newPage({javaScriptEnabled:false});
    for (const route of offerRoutes) {
      await visit(noScript,route);
      assert(await noScript.locator('#uc-holiday').isHidden(),`${route}: no JavaScript`);
      assert.equal(await noScript.locator('#uc-holiday').innerText(),'');
    }
    await visit(noScript,policyRoute);
    assert.equal(await noScript.locator('h1').innerText(),policy.copy.en.title);
    assert.equal(await noScript.locator('#backup p').innerText(),policy.copy.en.backupText);
    assert.equal(await noScript.locator('[data-p="diagnosticsStorage"]').innerText(),policy.copy.en.diagnosticsStorage);
    await visit(noScript,'apps/mini-games.html');
    assert.equal(await noScript.locator('[data-app-availability]').innerText(),pages.copy.en.reviewNotice);
    assert.equal(await noScript.locator('#mg-2248 p').innerText(),games[0].text.en);
    assert.equal(await noScript.locator('#mg-2248 #mg-2048').count(),1);
    assert.equal(await noScript.locator('link[rel="canonical"]').getAttribute('href'),'https://jn86vi.github.io/apps/mini-games.html');
    assert.equal(await noScript.locator('[data-app-play] a').count(),0);
    await visit(noScript,'index.html');
    assert.deepEqual(await noScript.locator('[data-app-count]').allTextContents(),['25','3','3','19']);
    assert.deepEqual(errors,[]);
    console.log(`PASS: ${responsiveStates} UC/MG viewport-language states, ${timingStates} route/timezone cutoff sequences, no-JS and keyboard checks, and spoiler scan`);
  } finally {
    await browser.close();
  }
})().catch(error=>{console.error(error);process.exit(1);});
