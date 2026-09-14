# Project roadmap

## 3-tier architectuur
- [x] Publieke site (maximilien.brussels) — eigen shell, geen admin-code in de bundel
- [x] Desktop manager (maximilien.site) — eigen shell + portaalroutes
- [x] Mobiele veld-app (maximilien.app) — eigen shell + /veld-routes
- [x] Modusdetectie: VITE_APP_MODE > hostname > ?mode= > localStorage (SSR-veilig)
- [x] Kruislinks per domein (getPublicUrl / getAdminUrl / getFieldUrl)

## Mobiele veld PWA (maximilien.app)
- [x] manifest.field.json + iconen (192/512/maskable) en apple-touch-icon
- [x] Service worker (vite-plugin-pwa, alleen bij VITE_APP_MODE=field), bewaakte registratie
- [x] Offline-melding in de shell
- [x] Bottomnav: Vandaag, Aanvragen, Scanner (midden), Diensten, Meer
- [x] Vandaag: dagplanning met check-in
- [x] Aanvragen: actieve aanvragen/orders
- [x] Scanner: continue stream, zaklamp, 6-teken fallback, auto-reset 2 s, print
- [x] Diensten: gestroomlijnde lijst
- [x] Meer: profiel, taalkeuze, beheer openen, afmelden
- [x] Geen horizontaal scrollen op 412 px, touchdoelen >= 56 px
- [x] Veld-modus blijft bewaard bij doorsturen naar /auth (preview/dev)
- [ ] Volledige test ingelogd (vereist databank-verbinding)
- [ ] Installatietest op een echte Samsung-telefoon (na publicatie op maximilien.app)

## Unified backend & auth
- [x] DATABASE_URL (Neon PostgreSQL)
- [x] Brevo API-sleutel en afzender (inlogcodes, transactionele mail)
- [x] Authmails verplicht via dezelfde Brevo-route als contactmail
- [x] Callbackdomein per aanvraag geborgd voor maximilien.site en maximilien.app
- [x] Exacte Brevo-status en unieke berichtreferentie in serverlogboek
- [ ] Scaleway S3-sleutels (mediabibliotheek)
- [ ] Stripe-sleutels (webshop, giften)
- [ ] OAuth-secrets: Google, GitHub, Mastodon, Bluesky
- [ ] PICKUP_QR_SECRET (ondertekening afhaal-QR)
- [ ] Passkeys (WebAuthn) end-to-end testen

## Google-toestemmingen (afgehandeld)
- [x] Aanmelden met Google vraagt enkel openid/e-mail/profiel
- [x] Agenda-toestemming enkel via de koppelknop in Synchronisatie (`?calendar=1`, offline)
- [x] Tokens worden alleen bewaard wanneer agenda-toegang is gegeven

## Mobiel ontwerp veld-app (afgehandeld)
- [x] Gedeelde bouwstenen `src/components/veld/field-ui.tsx`
- [x] Vandaag, Aanvragen, Diensten, Meer op de nieuwe stijl
- [x] Verfijnde onderbalk met zwevende scanknop

## Veld-app afwerking (afgehandeld)
- [x] "Openen in de veld-app" in het accountmenu van het beheer
- [x] Veldtabbladen verborgen volgens rechten van de medewerker
- [x] Discreet installatie-icoon in de voettekst i.p.v. het opdringerige venster
- [x] Losse shells (publiek/beheer/veld) lazy geladen; routes apart gesplitst

## Juridische infrastructuur (afgehandeld)
- [x] Node vastgezet op 22.x voor stabiele builds
- [x] Cookieverklaring (/cookies) — geen trackers, geen banner
- [x] Status & infrastructuur (/status) — domeinen, mailgate, dataopslag
- [x] Taalloze adressen: /cookies, /status, /impressum, /pers
- [x] Voettekst: cookies, wettelijke vermeldingen en status
- [x] Privacybeleid vermeldt geïsoleerde mailgate send.maximilien.site
- [x] Nieuwe pagina's in de sitemap
## Perspagina afwerking
- [x] Fout op de perspagina herstellen
- [x] Hoofdmenu en blok Logo met naam toevoegen
- [x] Downloadlabels vertalen in NL/FR/EN
- [x] Indeling van kerncijfers, logo’s, iconen en kleuren verfijnen
- [x] /nl/pers, /fr/presse en /en/press visueel en functioneel controleren

## App-iconen en PWA-assets
- [x] Transparante terracotta favicons, Apple-touch- en desktopiconen herbouwen
- [x] Publieke, veld- en beheericonen met correcte maskable achtergrond en veilige zone
- [x] Alle drie manifesten en browserverwijzingen controleren

## Productierijp platform
- [ ] Pershub aanvullen met twee publiceerklare dossiers, downloads, rolcitaten en contactgegevens
- [ ] Takenmotor bouwen met aanmaken, toewijzen, afronden en zonefiltering in veld-app en beheer
- [ ] Terreinzones koppelen aan taken en beheerbaar maken
- [ ] Persberichten en site-instellingen vanuit het beheer bedienbaar maken
- [ ] Verouderde en tijdelijke logo’s in publiek, veld, beheer, passen en assistent vervangen
- [ ] E-mailtemplates naar de officiële huisstijl en beheerde verzending overzetten (wacht op afzenderdomein)
- [ ] Publiek, veld en beheer voorzien van correcte manifesten, scopes en offlinegedrag
- [ ] Productieroutes, noindex-regels, robots en sitemap corrigeren en controleren

## Veld-app — Meer
- [ ] Native installatievraag centraal bewaren en via “Applicatie installeren” openen
- [ ] Reeds geïnstalleerde status en handmatige installatie-instructie tonen
- [ ] Profiel- en teamkaart herstellen met veilige standaardwaarden en kleine-schermindeling
