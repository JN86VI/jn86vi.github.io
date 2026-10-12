# JN86VI website

Static GitHub Pages website for JN86VI, with 25 app presentations in eight
languages: English, Hungarian, German, Spanish, French, Brazilian Portuguese,
Polish and Italian.

Content authority: the current JN86 App Portfolio and Roadmap, Design Guide
and each app’s canonical Functional Specification in the separate JN86 repo.
The owner requests of 2026-10-06 and 2026-10-12 set public statuses:
Unit Converter and Ott e! are Coming soon; the other 23 apps are In the works.
Only Coming soon apps are featured.
Currently no app has a verified public production release. Ott e!'s closed
Google Play test is not a public release. No release date is published.
The separate product stage distinguishes the two apps in development from
the other 23 planned apps. This stage does not change the public lifecycle
badge or imply production availability. Unit Converter's active internal
Play test is described explicitly on its detail and privacy pages.

`assets/portfolio-v2.js` contains names, statuses and all eight translations.
Cards, detail pages and the home showcase use this same data. There is no
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
only `released`, and currently displays a localized empty state. The full
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
`assets/app-pages.json` and its generated data retain the existing privacy
content and availability notices. The privacy renderer remains separate.
`privacy/unit-converter.html` remains a separate legal source, updated once
under W7/G06 for active UMP/Ads/Billing. Ott e! privacy bytes are preserved.
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
