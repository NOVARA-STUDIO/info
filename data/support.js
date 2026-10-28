/* Дані сторінки «Підтримати». Тексти кнопок і описи лежать в i18n/<мова>/support.js за id. */
Novara.data.support = {
  currency: "₴",
  goal: { current: 12400, target: 30000 },   // приклад: замініть на справжні цифри
  amounts: [100, 300, 500, 1000],
  // url: порожній = підказка «Посилання скоро буде тут». Можна писати {amount}: підставиться обрана сума
  methods: [
    { id: "monobank", url: "" },
    { id: "patreon", url: "" },
    { id: "bmc", url: "" }
  ],
  // УВАГА: приклад. Замініть на справжні реквізити. Мітки (label) беруться з i18n за id
  requisites: [
    { id: "recipient", value: "NOVARA STUDIO" },
    { id: "iban", value: "UA00 0000 0000 0000 0000 0000 00000" },
    { id: "purpose", value: { uk: "Добровільна пожертва на статутну діяльність", en: "Voluntary donation for statutory activities" } },
    { id: "usdt", value: { uk: "ваша-адреса-гаманця", en: "your-wallet-address" } }
  ],
  contactEmail: "support@novara.studio"
};
