# Afwerking: iconen, Fair & Open Tech, taal en vindbaarheid

De iconenset, de manifesten, de FairTech-pagina, de Mastodon-verificatie en de
taalinstellingen staan er al. Dit plan sluit de resterende gaten zodat het geheel
sluitend is.

## 1. Vindbaarheid van Fair & Open Tech

- Link in het hoofdmenu (desktop én mobiel) en in de voettekst bij de andere
  informatiepagina's, in de drie talen.
- De pagina staat al in de sitemap; de links maken haar ook voor bezoekers
  bereikbaar.

## 2. Adres van de sitemap gelijktrekken

- `robots.txt` verwijst voortaan naar `https://maximilien.brussels/sitemap.xml`,
  gelijk aan de adressen die de sitemap zelf publiceert.

## 3. Zoekmachine- en deelgegevens afwerken

- Gestructureerde gegevens op de FairTech-pagina: de pagina zelf plus de
  vereniging met adres (Schipperijkaai 2 / Quai des Péniches 2, 1000 Brussel).
- Het Mastodon-profiel toevoegen aan de bestaande gestructureerde gegevens van de
  hele site, zodat de link naar het profiel ook machinaal leesbaar is.
- De taalaanduiding (`content-language`) meegeven vanaf de server, niet pas in de
  browser, zodat crawlers ze meteen zien.

## 4. Perskit bijwerken

- De downloadlijst op de perspagina verwijst nog naar het oude `favicon.png`.
  Die wordt vervangen door het nieuwe doorzichtige embleem
  (`favicon.svg` + `taskbar-512.png`).

## 5. Nakijken

- Bouw en typecontrole, en de pagina's `/nl/fairtech`, `/fr/fairtech`,
  `/en/fairtech`, `/fairtech`, `robots.txt` en `sitemap.xml` opvragen.
- Controleren dat de taal van het adres (`/en`, `/nl`, `/fr`) altijd wint van de
  bewaarde voorkeur, en dat de bewaarde keuze onder `user_preferred_language`
  behouden blijft.

## Technische details

- `src/components/NavHeader.tsx` en `src/components/SiteFooter.tsx`: link via
  `pathFor("fairtech", lang)` met `LocalLink`.
- `public/robots.txt`: `Sitemap:`-regel corrigeren naar het hoofddomein.
- `src/pages/fairtech.tsx`: JSON-LD meegeven via de route (`src/routes/$lang.$.tsx`
  `localizedHead(..., { jsonLd: [...] })`), naar het patroon van de homepagina.
- `src/lib/seo-jsonld.ts`: `sameAs` uitbreiden met
  `https://mastodon-belgium.be/@Maximilien`.
- `src/lib/routes-i18n.ts` (`localizedHead`): `http-equiv`/`name`-tag voor
  `content-language` per taal toevoegen naast de bestaande `og:locale`.
- `src/pages/press.tsx`: iconenregel in de downloadlijst bijwerken.
