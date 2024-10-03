import entities from './entities.json';

type availableLanguages = 'en' | 'ru';

// const language = (navigator.language?.split('-')[0] ?? 'ru') as availableLanguages;
const language = 'ru';

// type Dict = Record<string, Record<availableLanguages, string>>;
interface Dict {
  [key: string | availableLanguages]: string | Dict;
}

type Numerals = 'singular' | 'few' | 'many';
type Numeral = Record<Numerals, { [k in availableLanguages]: string }>;
type NumeralOptional = Record<Numerals, { [k in availableLanguages]?: string }>;
type UniteNumeral = { 'unite': { [k in availableLanguages]?: string } };
type NumeralAll = Numeral
  | UniteNumeral & { [k in Numerals]?: never }
  | UniteNumeral & NumeralOptional;
type NumeralDict = Record<string, NumeralAll>;

const entitiesDict: Record<string, Dict | NumeralDict> = entities;

export function t(...codes: string[]): string {
  try {
    let entityMap: Dict | string = entitiesDict as Dict;

    for (const key of codes) {
      if (entityMap && typeof entityMap === 'object' && !Array.isArray(entityMap)) {
        entityMap = entityMap[key];
      } else {
        return codes.join('.'); // Path is invalid
      }
    }

    if (!entityMap || typeof entityMap !== 'object' || Array.isArray(entityMap)) {
      return codes.join('.');
    }

    const translation = entityMap[language];
    return translation !== undefined ? translation as string : codes.join('.');

  } catch (e) {
    console.error(e);
    return codes.join('.');
  }
}


export function tn(num: number, ...codes: string[]) {
  function uniteSafe(entity: NumeralAll, numeral: Numerals) {
    if (!(language in entity[numeral]!)) {
      return (entity as UniteNumeral).unite[language];
    }

    return entity[numeral]![language];
  }

  try {
    let entityMap: Dict | string = entitiesDict as Dict;

    for (const key of codes) {
      if (entityMap && typeof entityMap === 'object' && !Array.isArray(entityMap)) {
        entityMap = entityMap[key];
      } else {
        return codes.join('.'); // Path is invalid
      }
    }

    if (!entityMap || typeof entityMap !== 'object' || Array.isArray(entityMap)) {
      return codes.join('.');
    }

    const entity = entityMap as NumeralAll

    if (!('many' in entity)) { // Only unite presents
      return entity.unite[language];
    }

    const db100 = num % 100;
    if (11 <= db100 && db100 <= 100) return uniteSafe(entity, 'many');

    const db10 = num % 10;
    if (db10 == 1) return uniteSafe(entity, 'singular');

    if (2 <= db10 && db10 <= 4) return uniteSafe(entity, 'few');

    return uniteSafe(entity, 'many');
  } catch (e) {
    console.error(e);
    return codes.join('.');
  }
}
