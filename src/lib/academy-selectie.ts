import { shuffle } from "./academy-shuffle";

/** Minimale vraagvorm die de selectie nodig heeft. */
export type SelectieVraag = {
  id: string;
  module: number | null;
  doelgroep: string | null;
  variant_groep: string | null;
  verplicht: boolean;
  moeilijkheid: number | null;
};

export type SelectieOpties = {
  /** "kids" = één ronde, "16plus" = drie rondes. */
  doelgroep: "kids" | "16plus";
  /** Totaal aantal vragen in de test. */
  aantal: number;
};

/** Aantal rondes per spoor: kinderen doen één doorloop, 16+ drie rondes. */
export function aantalRondes(doelgroep: "kids" | "16plus"): number {
  return doelgroep === "kids" ? 1 : 3;
}

/** Houdt hoogstens één vraag per variantgroep over binnen dezelfde ronde. */
function zonderDubbeleVarianten<T extends SelectieVraag>(rijen: T[]): T[] {
  const gezien = new Set<string>();
  const uit: T[] = [];
  for (const v of rijen) {
    const groep = v.variant_groep?.trim();
    if (groep) {
      if (gezien.has(groep)) continue;
      gezien.add(groep);
    }
    uit.push(v);
  }
  return uit;
}

/**
 * Kiest de vragen voor één examenpoging.
 *
 * - enkel vragen van het gekozen spoor (of "beide");
 * - verplichte vragen komen altijd mee;
 * - hoogstens één vraag per variantgroep per ronde;
 * - de rest wordt willekeurig getrokken uit de voorraad, oplopend in
 *   moeilijkheid per ronde bij het 16+-spoor.
 */
export function kiesVragen<T extends SelectieVraag>(alle: T[], opties: SelectieOpties): T[] {
  const spoor = alle.filter((v) => {
    const d = v.doelgroep ?? "beide";
    return d === opties.doelgroep || d === "beide";
  });
  const pool = spoor.length >= Math.min(3, opties.aantal) ? spoor : alle;
  const rondes = aantalRondes(opties.doelgroep);

  if (rondes === 1) {
    const kandidaten = zonderDubbeleVarianten([
      ...shuffle(pool.filter((v) => v.verplicht)),
      ...shuffle(pool.filter((v) => !v.verplicht)),
    ]);
    return kandidaten.slice(0, opties.aantal).map((v, i) => ({ ...v, module: 1, _pos: i }) as T);
  }

  const perRonde = Math.max(1, Math.round(opties.aantal / rondes));
  const gekozen: T[] = [];
  const gebruikt = new Set<string>();

  for (const m of [1, 2, 3]) {
    const vanRonde = pool.filter((v) => (v.module ?? 1) === m && !gebruikt.has(v.id));
    const kandidaten = zonderDubbeleVarianten([
      ...shuffle(vanRonde.filter((v) => v.verplicht)),
      ...shuffle(vanRonde.filter((v) => !v.verplicht)),
    ]).slice(0, perRonde);
    for (const v of kandidaten) gebruikt.add(v.id);
    gekozen.push(...kandidaten.map((v) => ({ ...v, module: m }) as T));
  }

  // Rondes die te weinig eigen vragen hebben, aanvullen uit de rest.
  if (gekozen.length < opties.aantal) {
    const rest = zonderDubbeleVarianten(shuffle(pool.filter((v) => !gebruikt.has(v.id))));
    for (const v of rest) {
      if (gekozen.length >= opties.aantal) break;
      const telPerRonde = [1, 2, 3].map((m) => gekozen.filter((g) => g.module === m).length);
      const magerste = (telPerRonde.indexOf(Math.min(...telPerRonde)) + 1) as 1 | 2 | 3;
      gebruikt.add(v.id);
      gekozen.push({ ...v, module: magerste } as T);
    }
  }

  // Binnen elke ronde willekeurige volgorde, rondes blijven 1 -> 2 -> 3.
  const uit: T[] = [];
  for (const m of [1, 2, 3]) uit.push(...shuffle(gekozen.filter((v) => v.module === m)));
  return uit;
}
