# prof-mo / app — Astro v5

Полноценный сайт ЕС-Профосмотр / APIS Media на Astro 5. Статический SSG.

## Стек

- **Astro 5** — статический генератор, без React
- **Vanilla CSS** — без Tailwind, токены в `src/styles/tokens.css`
- **TypeScript** strict
- **Шрифты** — Room/Circe (бренд), Source Serif 4, Inter, JetBrains Mono (Google Fonts)
- Деплой — `npm run build` → статика в `dist/`, заливается куда угодно (Netlify, Vercel, S3)

## Запуск

```bash
cd app
npm install           # уже выполнено
npm run dev           # → http://127.0.0.1:4321
npm run build         # → dist/
npm run preview       # просмотр продакшен-билда
```

## Структура

```
app/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/                  # отдаётся as-is
│   ├── fonts/               # ROOM, Circe (бренд)
│   └── img/                 # логотипы APIS
└── src/
    ├── styles/
    │   ├── tokens.css       # ★ бренд-токены, палитра, типографика, размеры
    │   ├── base.css         # reset + базовая типографика
    │   └── components.css   # btn, badge, table, callout, pull, field, toast
    ├── components/
    │   ├── Masthead.astro   # верхняя полоса с метаданными журнала
    │   ├── Header.astro     # sticky хедер с навигацией
    │   └── Footer.astro     # колофон (выходные данные)
    ├── layouts/
    │   └── BaseLayout.astro # обёртка: Masthead + Header + slot + Footer
    └── pages/
        ├── index.astro      # ГЛАВНАЯ · стиль «Издание» (B)
        └── tarify.astro     # ТАРИФЫ · стиль «Терминал» (A)
```

## Дизайн-система

Все токены — CSS Custom Properties в `src/styles/tokens.css`.

**Бренд-палитра** (строго из APIS бренд-бука 2017):
- `--brand-dark` `#0542AC`
- `--brand-mid` `#2167E0`
- `--brand-light` `#7DA8FF`
- `--brand-gradient` `linear-gradient(135deg, ...)` со сдвигом 60% (как в бренд-буке)

**Поверхности:**
- `--paper` `#F7F9FE` — холодная бумага с лёгким бренд-undertone
- `--ink` `#060D1B` — основной текст (deep navy, начало бренд-градиента)
- `--brand-deep-1/2/3` — тёмные секции (футер, контактный блок)

**Шрифты по назначению:**
- ROOM Bold — display, огромные заголовки
- Source Serif 4 — длинный редакционный текст (на лендинге, в блоге)
- Inter — UI, кнопки, навигация, тело короткого текста
- JetBrains Mono — все числа, технические лейблы, статусные плашки, секционные §

## Архитектура дизайна — гибрид B+A

| Тип страницы | Стиль | Пример |
|---|---|---|
| Главная (`/`) | **Издание** — журнальная обложка с серифом, буквицей, кураторскими блоками | `index.astro` |
| Блог (`/blog`, `/blog/[slug]`) | Издание — long-form | TODO |
| Продуктовые модули (`/farmvirav` и т.д.) | Издание — глава | TODO |
| Тарифы (`/tarify`) | **Терминал** — GOV.UK-style с TOC, sticky CTA, таблицами | `tarify.astro` |
| Лицензии (`/licenzia`, `/licenziam`) | Терминал — табличный | TODO |
| Партнёрство (`/partnership`) | Издание + табличные условия | TODO |

Единая дизайн-система. Разная плотность подачи под тип контента.

## Контент

Все факты в страницах — реальные, верифицированы с **prof-mo.site** (см. `~/.claude/projects/.../memory/project_es_profosmotr.md`):

- 15 лет на рынке, 540+ клиник, ООО «ЭЙПИСМЕДИА», Наб. Челны
- Тарифы: 4 900 — 25 900 ₽/мес (реальный прайс)
- Реестр Минцифры № 17473 (ЕС-Профосмотр), № 13348 (EasyClinic)
- Приказы: 29н от 28.01.2021, 201н от 14.04.2025
- Поддержка: 08:00–17:00 МСК (не 24/7)
- 7 типов СЭМД с реальными кодами: 103, 204, 182, 183, 188, 228, 230, 196
- Интеграции: ИНВИТРО, Биомед, ПРОДОКТОРОВ, СБЕРЗДОРОВЬЕ, НАПОПРАВКУ

## Что дальше

Главная и тарифы — это **эталоны** для двух типов страниц. Следующая итерация:

1. `/blog` (index + post template) — повторяет редакционный стиль главной
2. `/farmvirav`, `/kontrolpreparatov` — продуктовые подстраницы (стиль главы из «Издания»)
3. `/licenzia`, `/licenziam` — услуги (стиль «Терминала» как `/tarify`)
4. `/partnership` — гибрид
5. Sitemap, robots.txt, OG-теги, JSON-LD для медицинской организации
6. Подключить блог через Content Collections (markdown файлы) — нативная фишка Astro

## Старые варианты

Папки `v3-brutalist/`, `v4-narrative/`, `v5-scrolljack/` в корне репозитория — статические HTML-прототипы предыдущих итераций. Можно использовать как референсы или удалить.
