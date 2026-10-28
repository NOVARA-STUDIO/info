# NOVARA STUDIO™: статичний сайт (UA / EN)

Відкрийте `index.html` у браузері або завантажте папку на будь-який хостинг. Збирати нічого не потрібно.
Один файл замість папки: `python3 tools/bundle.py` створить `dist/index.html`.

## Структура: кожна сторінка має свої файли
```
index.html                  каркас: шапка, місце під сторінку, футер, підключення скриптів
data/
  config.js                 мови, склад меню
  projects.js               ПРОЄКТИ (тут додаються нові)
  team.js                   команда
  support.js                сума, мета збору, способи оплати, реквізити
i18n/
  uk/  common.js home.js projects.js support.js     тексти українською
  en/  common.js home.js projects.js support.js     тексти англійською
css/
  base.css                  кольори, типографіка, шапка, футер, кнопки
  background.css            анімований фон
  pages/ home.css projects.css support.css
js/
  core/ i18n.js router.js layout.js ui.js background.js logo.js
  pages/ home.js projects.js support.js            одна сторінка = один файл
  main.js                   запуск
```

## Як додати проєкт
Відкрийте `data/projects.js`, скопіюйте останній блок `{ ... }`, вставте після нього через кому і змініть поля.
Тексти можна писати рядком або `{"uk": "...", "en": "..."}`. Категорія: `apps`, `sites`, `ai`, `games`, `branding`, `physical`.
Кожен проєкт має власне посилання `index.html#projects/<id>`.

## Як додати мову (наприклад, німецьку)
1. Скопіюйте `i18n/en` у `i18n/de`, у кожному файлі замініть `"en"` на `"de"` і переведіть тексти.
2. У `index.html` додайте 4 рядки `<script src="i18n/de/....js">`.
3. У `data/config.js` додайте `{ code: "de", label: "DEU", locale: "de-DE" }` у `languages`.
Дані проєктів: допишіть `"de": "..."` там, де є `{"uk", "en"}`. Де перекладу немає, показується українська.

## Як додати сторінку
1. `js/pages/<id>.js`: модуль `Novara.pages.<id> = { html(), mount(), route(sub), unmount(), title() }` (див. `home.js`).
2. Стилі в `css/pages/<id>.css`, тексти в `i18n/<мова>/<id>.js`, підключіть їх в `index.html`.
3. Додайте `<id>` у `nav` в `data/config.js` і назву в `common.nav.<id>` в обох мовах.

## Підтримка
Суми, мета збору, посилання на оплату й реквізити: `data/support.js` (у `url` можна писати `{amount}`).
Тексти й питання-відповіді: `i18n/<мова>/support.js`. Реквізити в прикладі вигадані, замініть їх.

## Мова
Вибір мови зберігається в браузері. Для нового відвідувача мова береться з налаштувань браузера (укр/англ), інакше українська.
