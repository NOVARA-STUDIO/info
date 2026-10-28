/* =====================================================================
   ПРОЄКТИ. Щоб додати новий проєкт: скопіюйте будь-який блок { ... },
   вставте в кінець списку (не забудьте кому) і змініть поля.

   id          унікальний, латиницею, без пробілів (потрапляє в посилання #projects/id)
   category    будь-яка назва. Нова категорія сама зʼявиться у фільтрах
   shape       s1 | s2 | s3 | s4 | s5   (проста форма для превʼю)
   colors      [колір фону, колір фігури]
   image       шлях до картинки, напр. "assets/projects/lumo.jpg". Порожній рядок = форма
   links       [{label:"Текст кнопки", url:"https://..."}]. Порожній список = типові кнопки
   caseStudy   (необовʼязково) шлях до PDF з кейсом
   Поля platform, version, size, rating можна лишати порожніми або "—"
   ===================================================================== */
window.PROJECTS = [
  {
    "id": "air-defense-ops",
    "name": "Air Defense Ops",
    "category": "Ігри",
    "year": 2026,
    "platform": "iOS, Android, Windows",
    "version": "0.25.3",
    "size": "138 МБ",
    "rating": "4,8 ★",
    "shape": "s2",
    "colors": [
      "#FFD23F",
      "#6C4BFF"
    ],
    "image": "",
    "description": "You must defend the country by repelling air attacks.",
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
  }
];
