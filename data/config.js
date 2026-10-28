/* Глобальні налаштування сайту */
window.Novara = window.Novara || {};
Novara.data = Novara.data || {};
Novara.config = {
  defaultLang: "uk",
  // Щоб додати мову: допишіть її сюди і скопіюйте папку i18n/uk у i18n/<код> (див. README)
  languages: [
    { code: "uk", label: "УКР", locale: "uk-UA" },
    { code: "en", label: "ENG", locale: "en-US" }
  ],
  // порядок і склад меню (кожен id має відповідати сторінці в js/pages/)
  nav: ["home", "projects", "support"]
};
