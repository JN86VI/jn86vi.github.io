# JN86VI website

Static GitHub Pages website for JN86VI, with 25 app presentations in eight
languages: English, Hungarian, German, Spanish, French, Brazilian Portuguese,
Polish and Italian.

Content authority: the current JN86 App Portfolio and Roadmap, Design Guide
and each app’s canonical Functional Specification in the separate JN86 repo.
The 2026-10-06 owner request sets public statuses: Ott e! is Coming soon;
the other 24 apps are In the works. Only Coming soon apps are featured.
Currently no app has a verified public production release. Ott e!'s closed
Google Play test is not a public release. No release date is published.

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

Privacy policy content is independent of public app presentations and is
not generated or edited by this workflow.
