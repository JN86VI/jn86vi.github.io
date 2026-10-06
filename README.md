# JN86VI website

Static GitHub Pages website for JN86VI, with 25 app presentations in eight
languages: English, Hungarian, German, Spanish, French, Brazilian Portuguese,
Polish and Italian.

Content authority: the current JN86 App Portfolio and Roadmap, Design Guide
and each app’s canonical Functional Specification in the separate JN86 repo.
The 2026-10-06 owner request sets public statuses: Ott e! is Coming soon;
the other 24 apps are In the works. Only Coming soon apps are featured.
No app is presented as released. No public release date is published.

`assets/portfolio-v2.js` contains names, statuses and all eight translations.
Cards, detail pages and the home showcase use this same data. There is no
per-app highlight list and no English fallback for app descriptions.
`assets/app-detail.js` updates every detail page with the selected language.
`scripts/build-details.py` generates the static pages from one shared template,
including useful English HTML for search engines and visitors without JavaScript.
Existing Unit Converter, Ott e! and Dialer URLs remain valid.

After changing app copy, regenerate pages with `python3 scripts/build-details.py`.
Serve the root directory with a static HTTP server. There is no bundler or
external application dependency. Run `tests/validate-site.cjs` using Node with
Playwright available; set `BASE_URL` to the preview or live URL and optionally
`BROWSER_PATH` to an installed Chrome/Chromium executable. `STATIC_ONLY=1`
runs data, source and local-link checks without a browser. `OUTPUT_DIR` can
save the browser validation report and screenshots outside the repository.

Privacy policy content is independent of public app presentations and is
not generated or edited by this workflow.
