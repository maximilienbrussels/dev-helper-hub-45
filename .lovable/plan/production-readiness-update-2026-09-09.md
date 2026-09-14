# Production-readiness update

## Goal

Bring the public press hub, Field App, Manager portal, brand system, install experience, offline support, and production routing to one consistent release-ready state. Public claims will use the approved softened wording, and quotes will be attributed by role only.

## 1. Press & Media Hub

- Add two complete, publish-ready, trilingual press dossiers:
  - “La Ferme du Parc Maximilien launches a Fair & Open Tech Hub in Brussels.”
  - “Urban Agriculture Meets Digital Sovereignty: Modular Hardware & Zero-Tracking Technology.”
- Present each dossier as readable web content with publication date, summary, full release copy, copy action, and downloadable press file.
- Add separate role-attributed quotes from Farm Coordination and Technology Lead without inventing personal names.
- Expand the press contact area with `press@maximilien.brussels`, `contact@maximilien.brussels`, and Schipperijkaai 2, 1000 Brussels.
- Keep and verify direct downloads for vector lockups, emblem SVGs, icon packs, brand guidance, and high-resolution farm photography.
- Add a protected Manager page where authorized staff can create, edit, publish, unpublish, and order press releases; the public page reads published items with reliable built-in fallbacks.

## 2. Tasks, zones, and terrain operations

- Add persistent zones and tasks with clear permissions and audit history.
- Tasks support create/edit, assignee, zone, due date, priority, status, completion time, and filtering by zone, assignee, and state.
- Add a Field App task view optimized for quick daily work: assigned work, zone filters, completion, and offline-safe reads.
- Add Manager controls for task assignment and zone management.
- Connect the existing farm map data to the same zone records so task filters and terrain names do not diverge.
- Preserve the existing booking/check-in workflow as a separate operational flow.

## 3. “Meer” installation and profile repair

- Introduce one shared React install-state provider that captures `beforeinstallprompt`, tracks standalone/installed state, and exposes the native install action.
- Add a prominent “Applicatie installeren” action in “Meer”. When native installation is unavailable, show an installed badge or concise manual “Add to Home Screen” guidance appropriate to the device.
- Repair the profile card with safe fallbacks: “Medewerker”, the authenticated email when available, and “Team Maximilien”.
- Use a mobile-safe two-column layout, `min-w-0`, truncation, stable avatar sizing, and spacing so names and roles cannot overlap.

## 4. Universal brand synchronization

- Replace placeholder and legacy marks in Public, Field, Manager, assistant avatars, ticket/pass views, and structured data with the official Terracotta/Forest Green emblem family.
- Remove hard-coded external logo dependencies and use stable first-party assets.
- Preserve the corrected transparent browser/taskbar icons and role-specific opaque maskable icons from the prior update.
- Update the Press Kit’s displayed brand palette to the approved values: Terracotta `#D95D39`, Forest Green `#1E4D3B`, and Crème `#FBF9F5`.

## 5. Email architecture

- Migrate app emails from the custom mixed provider/queue setup to Lovable’s managed app-email flow; do not add email tables, queues, or scheduled dispatchers.
- Rebuild the registered email templates with responsive official-emblem headers, brand colors, plain-text-safe content, and fixed per-event recipients.
- Cover existing registration/auth, notifications, confirmations, orders/bookings, certificates, and press-inquiry acknowledgements without adding marketing email behavior.
- Wire each event directly to its fixed template with idempotency and graceful suppression/rate-limit handling.
- This section starts after the owned sender domain is connected and can send only after DNS verification.

## 6. PWA manifests and offline reliability

- Keep the public manifest at `/manifest.json` with Crème/Terracotta branding.
- Serve a field-specific manifest at `/field/manifest.json` while retaining compatibility with `/manifest.field.json`; set its identity, start URL, and scope to the real Field App paths.
- Correct the Manager manifest start URL so installed Manager shortcuts never open a missing `/portaal` page.
- Restrict field navigation caching to Field App pages and exclude authentication, API, OAuth, public, and Manager paths.
- Keep registration disabled in development and Lovable preview, preserve the `?sw=off` escape hatch, and verify offline behavior in a production-mode field build.

## 7. Production routes and SEO

- Add live-ready aliases for `/press`, `/field`, and `/admin` that route to the canonical public, Field, and authenticated Manager destinations without 404s; keep `/fairtech` localized correctly.
- Keep Field and Manager pages private and `noindex`; they must not appear in the public sitemap.
- Keep public Press and Fair & Open Tech pages in the sitemap in all supported languages.
- Remove generated “today” sitemap dates and emit `<lastmod>` only from authoritative page-specific timestamps; validate news dates before output.
- Serve restrictive crawler rules on Field/Manager hosts while preserving the public site’s sitemap and public crawl rules.

## Verification

- Validate database migrations, permissions, and audit logging for tasks, zones, and press releases.
- Test create → assign → filter → complete in both Field and Manager views.
- Test press publishing and public visibility in NL/FR/EN.
- Test the “Meer” profile card and install states at phone width, including native prompt, standalone, and manual fallback states.
- Verify every manifest, icon, scope, service-worker cache rule, route alias, robots response, and sitemap entry.
- Check public, Field, Manager, and Press pages for runtime errors and broken assets before completion.

## Technical details

- Follow the existing TanStack route, Neon server-function, permission, and audit patterns.
- Add schema changes as new Neon migrations; do not rewrite existing migrations.
- Keep authenticated data calls out of public route loaders.
- Use the existing design-system controls and semantic color tokens; replace remaining hard-coded legacy brand values in touched views.
- The public sitemap includes public content only; `/field` and `/admin` are route aliases, not indexable destinations.

## Dependency

Email templates can be prepared only after a sender domain owned by the organization is connected. Email delivery begins after that domain is verified; all non-email work is independent.
