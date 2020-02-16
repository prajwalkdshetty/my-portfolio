import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEng from "./en/translations.json";
import translationDe from "./de/translations.json";
i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: "en",
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false
    },

    resources: {
      en: {
        translations: translationEng
      },
      de: {
        translations: translationDe
      }
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations"
  });

export default i18n;