import { IPages, Locale } from "@/src/types";
import "server-only";

const dictionaries: {
  [key in Locale]: () => Promise<IPages>;
} = {
  en: () =>
    import("../../../public/dictionaries/en.json").then(
      (module) => module.default
    ),
  uk: () =>
    import("../../../public/dictionaries/uk.json").then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
