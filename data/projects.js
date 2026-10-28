/* =====================================================================
   ПРОЄКТИ. Щоб додати проєкт: скопіюйте будь-який блок { ... }, вставте в кінець
   списку (не забудьте кому) і змініть поля.

   id          унікальний, латиницею, без пробілів (посилання #projects/id)
   category    apps | sites | ai | games | branding | physical (назви беруться з i18n).
               Власна назва теж працює: нова категорія сама зʼявиться у фільтрах
   Тексти (name, description, features, result, platform, size, rating) можна писати
   рядком (однаково для всіх мов) або {"uk": "...", "en": "..."}
   shape       s1 | s2 | s3 | s4 | s5   (проста форма для превʼю)
   colors      [колір фону, колір фігури]
   image       шлях до картинки, напр. "assets/projects/lumo.jpg". Порожній рядок = форма
   links       ["https://..."] або [{"label": {"uk":"…","en":"…"}, "url": "https://..."}].
               Порожній список = типові кнопки категорії
   caseStudy   (необовʼязково) шлях до PDF з кейсом
   ===================================================================== */
window.Novara = window.Novara || {};
Novara.data = Novara.data || {};
Novara.data.projects = [
  {
    "id": "air-defense-ops",
    "name": "Air Defense Ops",
    "category": "games",
    "year": 2026,
    "platform": "iOS, Android, Windows",
    "version": "0.25.3",
    "size": {
      "uk": "138 МБ",
      "en": "138 MB"
    },
    "rating": {
      "uk": "4,8 ★",
      "en": "4.8 ★"
    },
    "shape": "s2",
    "colors": [
      "#FFD23F",
      "#6C4BFF"
    ],
    "image": "",
    "description": {
      "uk": "Ви маєте захистити країну, відбиваючи повітряні атаки.",
      "en": "You must defend the country by repelling air attacks."
    },
    "features": [],
    "result": "",
    "tech": [
      "2D",
      "Strategy",
      "Godot"
    ],
    "links": [
      "https://novara-studio.itch.io/air-defense-ops"
    ]
  },
  {
    "id": "korma",
    "name": {
      "uk": "Корма",
      "en": "Korma"
    },
    "category": "apps",
    "year": 2025,
    "platform": {
      "uk": "iOS, Android, веб",
      "en": "iOS, Android, Web"
    },
    "version": "1.9",
    "size": {
      "uk": "44 МБ",
      "en": "44 MB"
    },
    "rating": {
      "uk": "4,6 ★",
      "en": "4.6 ★"
    },
    "shape": "s1",
    "colors": [
      "#B9F3D6",
      "#FF4B2B"
    ],
    "image": "",
    "description": {
      "uk": "Фінансовий застосунок для фрілансерів: рахунки, податки та нагадування в одному місці.",
      "en": "A finance app for freelancers: invoices, taxes and reminders in one place."
    },
    "features": {
      "uk": [
        "Виставлення рахунків за хвилину",
        "Автоматичний розрахунок податків",
        "Звіти для бухгалтера в один дотик"
      ],
      "en": [
        "Invoicing in a minute",
        "Automatic tax calculation",
        "Accountant reports in one tap"
      ]
    },
    "result": {
      "uk": "18 000 фрілансерів користуються щодня",
      "en": "18,000 freelancers use it every day"
    },
    "tech": [
      "React Native",
      "Node.js"
    ],
    "links": []
  },
  {
    "id": "nichna-karta",
    "name": {
      "uk": "Нічна карта",
      "en": "Night Map"
    },
    "category": "sites",
    "year": 2025,
    "platform": {
      "uk": "Веб",
      "en": "Web"
    },
    "version": "3.0",
    "size": "—",
    "rating": {
      "uk": "4,9 ★",
      "en": "4.9 ★"
    },
    "shape": "s1",
    "colors": [
      "#2A2250",
      "#FFD23F"
    ],
    "image": "",
    "description": {
      "uk": "Інтерактивна карта міста за звуками. Мешканці додають записи, а ви слухаєте місто з будь-якої точки.",
      "en": "An interactive city map built from sounds. Residents add recordings, and you listen to the city from anywhere."
    },
    "features": {
      "uk": [
        "Понад 3 000 звукових записів",
        "Фільтри за часом доби",
        "Додавання власних записів із телефону"
      ],
      "en": [
        "Over 3,000 sound recordings",
        "Filters by time of day",
        "Add your own recordings from your phone"
      ]
    },
    "result": {
      "uk": "Відзнака «Сайт року»",
      "en": "“Site of the Year” award"
    },
    "tech": [
      "Mapbox",
      "WebAudio"
    ],
    "links": []
  },
  {
    "id": "soroka",
    "name": {
      "uk": "Кав’ярня «Сорока»",
      "en": "Soroka Café"
    },
    "category": "sites",
    "year": 2026,
    "platform": {
      "uk": "Веб",
      "en": "Web"
    },
    "version": "1.2",
    "size": "—",
    "rating": {
      "uk": "4,7 ★",
      "en": "4.7 ★"
    },
    "shape": "s5",
    "colors": [
      "#FFC7B8",
      "#16121F"
    ],
    "image": "",
    "description": {
      "uk": "Сайт і онлайн-замовлення для мережі кав’ярень з оплатою та самовивозом.",
      "en": "Website and online ordering for a coffee shop chain, with payment and pickup."
    },
    "features": {
      "uk": [
        "Замовлення за 3 кліки",
        "Програма лояльності",
        "Меню, що оновлюється щоранку"
      ],
      "en": [
        "Order in 3 clicks",
        "Loyalty program",
        "A menu that updates every morning"
      ]
    },
    "result": {
      "uk": "Замовлення онлайн виросли вдвічі",
      "en": "Online orders doubled"
    },
    "tech": [
      "Next.js",
      "Stripe"
    ],
    "links": []
  },
  {
    "id": "gram",
    "name": {
      "uk": "Ґрам",
      "en": "Gram"
    },
    "category": "ai",
    "year": 2026,
    "platform": {
      "uk": "Веб, API",
      "en": "Web, API"
    },
    "version": "1.5",
    "size": "—",
    "rating": {
      "uk": "4,7 ★",
      "en": "4.7 ★"
    },
    "shape": "s3",
    "colors": [
      "#6C4BFF",
      "#FFF6E5"
    ],
    "image": "",
    "description": {
      "uk": "ШІ-помічник підтримки для інтернет-магазину. Відповідає за 4 секунди та знає всю базу товарів.",
      "en": "An AI support assistant for an online store. Replies in 4 seconds and knows the whole product catalog."
    },
    "features": {
      "uk": [
        "Відповіді за базою товарів",
        "Передача складних питань людині",
        "Підключається за один день"
      ],
      "en": [
        "Answers from the product database",
        "Hands complex questions to a human",
        "Connects in one day"
      ]
    },
    "result": {
      "uk": "73% звернень закриває без оператора",
      "en": "Resolves 73% of requests without an operator"
    },
    "tech": [
      "LLM",
      "Python",
      "RAG"
    ],
    "links": []
  },
  {
    "id": "sadivnyk",
    "name": {
      "uk": "Садівник",
      "en": "Gardener"
    },
    "category": "ai",
    "year": 2026,
    "platform": "iOS, Android",
    "version": "1.1",
    "size": {
      "uk": "61 МБ",
      "en": "61 MB"
    },
    "rating": {
      "uk": "4,5 ★",
      "en": "4.5 ★"
    },
    "shape": "s4",
    "colors": [
      "#B9F3D6",
      "#16121F"
    ],
    "image": "",
    "description": {
      "uk": "Система розпізнає хвороби рослин за фото й радить, що робити. Працює й без інтернету.",
      "en": "A system that recognizes plant diseases from a photo and suggests what to do. Works offline too."
    },
    "features": {
      "uk": [
        "Розпізнавання 400+ хвороб",
        "Календар поливу",
        "Працює офлайн"
      ],
      "en": [
        "Recognizes 400+ diseases",
        "Watering calendar",
        "Works offline"
      ]
    },
    "result": {
      "uk": "Точність розпізнавання 94%",
      "en": "94% recognition accuracy"
    },
    "tech": [
      "TensorFlow",
      "Swift"
    ],
    "links": []
  },
  {
    "id": "tykhyi-reis",
    "name": {
      "uk": "Тихий рейс",
      "en": "Quiet Ride"
    },
    "category": "games",
    "year": 2025,
    "platform": "Windows, macOS, Android",
    "version": "1.0",
    "size": {
      "uk": "420 МБ",
      "en": "420 MB"
    },
    "rating": {
      "uk": "4,9 ★",
      "en": "4.9 ★"
    },
    "shape": "s3",
    "colors": [
      "#16121F",
      "#FF4B2B"
    ],
    "image": "",
    "description": {
      "uk": "Сюжетна гра про нічний автобус. Три години проходження, п’ять фіналів і жодного слова зайвого.",
      "en": "A story game about a night bus. Three hours of play, five endings and not a word too many."
    },
    "features": {
      "uk": [
        "П’ять різних фіналів",
        "Оригінальний саундтрек",
        "Керування однією рукою"
      ],
      "en": [
        "Five different endings",
        "Original soundtrack",
        "One-handed controls"
      ]
    },
    "result": {
      "uk": "Фінал фестивалю незалежних ігор",
      "en": "Independent games festival finalist"
    },
    "tech": [
      "Unity",
      "C#"
    ],
    "links": []
  },
  {
    "id": "kliuch",
    "name": {
      "uk": "Квест «Ключ»",
      "en": "The Key Quest"
    },
    "category": "games",
    "year": 2024,
    "platform": "iOS, Android",
    "version": "1.3",
    "size": {
      "uk": "85 МБ",
      "en": "85 MB"
    },
    "rating": {
      "uk": "4,6 ★",
      "en": "4.6 ★"
    },
    "shape": "s4",
    "colors": [
      "#FFD23F",
      "#2FD38A"
    ],
    "image": "",
    "description": {
      "uk": "AR-квест вулицями міста: 12 локацій, загадки в телефоні та справжній скарб наприкінці.",
      "en": "An AR quest through the city streets: 12 locations, riddles in your phone and a real treasure at the end."
    },
    "features": {
      "uk": [
        "12 локацій у центрі міста",
        "Режим для команд",
        "Нові загадки щомісяця"
      ],
      "en": [
        "12 locations downtown",
        "Team mode",
        "New riddles every month"
      ]
    },
    "result": {
      "uk": "40 000 пройдених маршрутів",
      "en": "40,000 routes completed"
    },
    "tech": [
      "ARKit",
      "Unity"
    ],
    "links": []
  },
  {
    "id": "shov",
    "name": {
      "uk": "Шов",
      "en": "Seam"
    },
    "category": "branding",
    "year": 2024,
    "platform": {
      "uk": "Веб, друк",
      "en": "Web, print"
    },
    "version": "—",
    "size": "—",
    "rating": "—",
    "shape": "s2",
    "colors": [
      "#FFC7B8",
      "#6C4BFF"
    ],
    "image": "",
    "description": {
      "uk": "Айдентика й інтернет-магазин для українського бренду одягу: логотип, шрифт, упаковка, сайт.",
      "en": "Identity and online store for a Ukrainian clothing brand: logo, typeface, packaging, website."
    },
    "features": {
      "uk": [
        "Логотип і фірмовий шрифт",
        "Дизайн-система для сайту",
        "Гайдлайн на 48 сторінок"
      ],
      "en": [
        "Logo and brand typeface",
        "Design system for the website",
        "A 48-page guideline"
      ]
    },
    "result": {
      "uk": "Продажі онлайн зросли на 60%",
      "en": "Online sales grew by 60%"
    },
    "tech": [
      "Figma",
      "Shopify"
    ],
    "links": []
  },
  {
    "id": "pisok",
    "name": {
      "uk": "Стілець «Пісок»",
      "en": "Sand Chair"
    },
    "category": "physical",
    "year": 2025,
    "platform": {
      "uk": "Майстерня",
      "en": "Workshop"
    },
    "version": "—",
    "size": "—",
    "rating": "—",
    "shape": "s5",
    "colors": [
      "#FFF0B8",
      "#FF4B2B"
    ],
    "image": "",
    "description": {
      "uk": "Наш рідкісний фізичний проєкт: стілець із перероблених пляшок.",
      "en": "Our rare physical project: a chair made from recycled bottles."
    },
    "features": {
      "uk": [
        "Збирається за 40 хвилин",
        "Витримує 180 кг",
        "Креслення у відкритому доступі"
      ],
      "en": [
        "Assembles in 40 minutes",
        "Holds 180 kg",
        "Open-source blueprints"
      ]
    },
    "result": {
      "uk": "Серія з 500 стільців розпродана",
      "en": "A run of 500 chairs sold out"
    },
    "tech": [
      "Переробка",
      "3D-друк"
    ],
    "links": []
  }
];
