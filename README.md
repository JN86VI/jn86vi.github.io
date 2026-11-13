# JN86VI website

Static GitHub Pages website for JN86VI, with 25 app presentations in eight
languages: English, Hungarian, German, Spanish, French, Brazilian Portuguese,
Polish and Italian.

Content authority: the current JN86 App Portfolio and Roadmap, Design Guide
and each app’s canonical Functional Specification in the separate JN86 repo.
The owner updates through 2026-11-10 set public statuses:
Ott e! and Unit Converter are Available; Fraction Calculator and Age & Date
Toolkit are Coming soon; the other 21 apps are In the works.
Only Coming soon apps are featured.
Ott e!'s public production listing was verified without a tester account on
2026-11-02: [Ott e! on Google Play](https://play.google.com/store/apps/details?id=hu.jn86.otte).
Its closed test has ended according to the owner's publication update.
Unit Converter's public listing was verified without cookies or a signed-in
account on 2026-11-10: [Unit Converter on Google Play](https://play.google.com/store/apps/details?id=hu.jn86.unitconverter).
This owner update supersedes the older UC development status in the JN86
Portfolio. The owner's 2026-11-10 correction confirms that FC and ADT are in
closed testing and Coming soon, superseding their older planned statuses in
the Portfolio. Neither has a public Play installation link.
No release date is promised for the remaining apps.
The separate product-stage field distinguishes the four implemented apps from
the other 21 planned apps. It is hidden for released apps and does not override
the public lifecycle badge or establish production availability.
The owner's 2026-11-13 instruction sets MC public descriptions to the approved
final functionality. Its `showDevelopmentStatus: false` omits development
badges and notices on the detail page and portfolio card without marking it
released or adding an unverified Play link. Internal catalog totals are unchanged.

`assets/portfolio-v2.js` contains names, statuses and all eight translations.
Cards, detail pages, the home showcase, all four home counters and the Contact
page's released-app Play links use this same data. The current counters are
25 portfolio apps = 2 released + 2 coming soon + 21 in the works. There is no
per-app highlight list and no English fallback for app descriptions.
`assets/app-detail.js` updates every detail page with the selected language.
`scripts/build-details.py` generates the static pages from one shared template,
including useful English HTML for search engines and visitors without JavaScript.
Existing Unit Converter, Ott e! and Dialer URLs remain valid.

Each app uses its own approved icon from JN86 `Assets/Icons`. The source-to-web
mapping, SHA-256 hashes and copy actions are in `assets/icon-inventory.json`.
Icons are copied without redrawing or regenerating the canonical assets.

Public lifecycle: `creating` (In the works) → `soon` (Coming soon) → `released`
(Available). The home showcase includes only `soon`; `released.html` includes
only `released`, and currently lists Unit Converter and Ott e!. A localized empty state is used
when there are no released apps. The full
portfolio retains every app with its own current status.

To publish an app after its actual public production launch, set its status to
`released` and set the optional `playUrl` to its verified public Google Play
listing. Regenerate the pages. That same data activates the released catalog,
the Available badge, detail-page availability and Play links. A released app
without a URL is listed without a Play button. Creating/Coming soon apps do
not expose a Play button, even if a URL is supplied.

Verify the listing without a tester account before adding it. Use the
[official store-listing URL format](https://developer.android.com/distribute/marketing-tools/linking-to-google-play).
Do not derive a URL from a package name, use opt-in/internal-test URLs, or
mark an app released from asset/build/test readiness alone. URL syntax checks
reject non-Play origins, testing paths, credentials and redirects; they do
not establish public production availability. Keep `playUrl: null` when no
verified public URL is available.

After changing app copy, regenerate pages with `python3 scripts/build-details.py`.
Serve the root directory with a static HTTP server. There is no bundler or
external application dependency. Run `tests/validate-site.cjs` using Node with
Playwright available; set `BASE_URL` to the preview or live URL and optionally
`BROWSER_PATH` to an installed Chrome/Chromium executable. `STATIC_ONLY=1`
runs data, source and local-link checks without a browser. `OUTPUT_DIR` can
save the browser validation report and screenshots outside the repository.

`assets/app-details.json` supplies detailed, app-specific function explanations
in all eight languages. The generated `app-details-data.js`, scoped
`app-details.js` and `app-details.css` render the descriptions with native
expandable sections. The generator requires all 25 descriptions. Planned
pages identify their planned availability; descriptions must be checked
against actual implementations before launch.
Ott e!'s optional `safety` entry supplies its screen/device damage warning
in all eight languages. Released detail pages hide the testing notice.
The production Play CTA uses the existing shared component on the app detail,
full portfolio and released catalog pages. The home showcase remains Coming
soon only and links to the released catalog. Both released apps' help pages
reflect their public availability in all eight languages.
`assets/app-pages.json` and its generated data retain the existing privacy
content and availability notices. The privacy renderer remains separate.
`privacy/unit-converter.html`, `privacy/fraction-calculator.html` and
`privacy/ott-e.html` are separately maintained legal sources, excluded from
the planned-app generator. They share `assets/privacy.css` for their section
cards and top contents navigation. Each contents link reuses its section's
translated heading and points to a stable section ID. Preserve app-specific
legal text and external provider links when changing this presentation.
Fraction Calculator's approved 18+ audience and absence of age collection
are stated in its dedicated audience section; its package ID is quiet metadata.
`assets/privacy-age-date-toolkit.json` is the independent eight-language legal
source for `privacy/age-date-toolkit.html`. The generator embeds both complete
English HTML and all translations in that page, using the shared privacy CSS,
language selector and mobile menu. Regenerate it with
`python3 scripts/build-details.py --app age-date-toolkit`; `--check` verifies
source/output parity. ADT portfolio status and app-detail copy are separate
and do not supply this privacy policy.

`assets/privacy-material-calculator.json` uses the same dedicated renderer for
MC's approved V1 privacy policy, including local presets/settings, Android
backup, AdMob, UMP, Play Billing and external services. It identifies the final
`hu.jn86.materialcalculator` package. The owner's 2026-11-11 decision makes the
approved V1 behavior the policy authority; preview readiness is recorded in the
Android implementation report, not the public policy. Reconcile actual M2-B
differences through targeted policy updates before release. Regenerate with
`python3 scripts/build-details.py --app material-calculator`.
ADT's generated page remains unchanged.

The 2026-11-13 MC update follows the approved UI-39–44 / MC-FUNC-02 supplement:
manual project saving, material totals, shopping lists, PDF and complete backup.
`assets/privacy-material-calculator.json` also covers these data flows while
preserving Ads, UMP, Billing and external-service disclosures. Match the final
Android implementation and Play Data Safety declaration before app release.

UC's single holiday notice uses `assets/uc-holiday.js` and the existing detail
card style. It is visible from publication, describes the approved Play window,
and is hidden from `2027-01-05T00:00:00Z`, including open or resumed pages.
Initial HTML is hidden, so JavaScript-disabled visits cannot show a stale offer.
There are no numeric prices or percentage discounts. No scheduled commit is needed.
Run `tests/validate-web-uc-mc-20261113.cjs` against the local server or `BASE_URL`
for the eight-language, responsive, UTC boundary and no-JavaScript checks;
`OUTPUT_DIR` writes evidence outside the source tree.

The privacy catalog links to all 25 dedicated pages. Inventory, checkpoints
and the Hungarian closeout report are under `docs/w7-portfolio/`.
The validator checks full content localization on every app/privacy route,
in addition to portfolio, icons, navigation, links and lifecycle behavior.

The 2026-10-12 description coverage, source pins, per-app checkpoints and
validation evidence are under `docs/details-restoration-20261012/`. Run
`tests/validate-detail-content.cjs` for all 25 descriptions in eight languages
at three widths. It also checks native section keyboard behavior, localization
without changing expanded state, full function-to-section mapping and
protected website files. `REPORT_DIR` saves per-app reports from a live run.
