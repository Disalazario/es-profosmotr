# ЕС-Профосмотр / APIS Media

Сайт **prof-mo.site** — Astro 5 + Tailwind 4, 10 страниц, кастомный дизайн «редакторский синий», брендовый куб APIS.

## Быстрый старт

```bash
cd app
npm install
npm run dev          # → http://127.0.0.1:4321
```

Подробнее — [`app/README.md`](app/README.md).

## Структура репо

```
app/         ← основной проект (Astro)
cube/        ← standalone HTML+CSS брендового куба + SVG для Figma
posts/       ← SVG-шаблоны постов для соцсетей (1200×630, 1080×1080, 1080×1920)
handle.md    ← оперативный handbook (история решений, табу, известные грабли)
```

## Деплой

`npm run build` в `app/` → статика в `app/dist/` → любой статик-хостинг (Netlify, Vercel, Cloudflare Pages, S3, GitHub Pages).

## Контакты

- ООО «ЭЙПИСМЕДИА» — Набережные Челны, ул. Столбовая, 44
- 8 (800) 600-13-18 · sales@apismedia.pro
