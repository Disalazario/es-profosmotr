# APIS Cube — Standalone

Изометрический куб APIS Media как отдельный модуль. Без сборщиков, без зависимостей. Открывается прямо в браузере.

## Файлы

| Файл | Что внутри |
|---|---|
| `cube.css` | Все стили: размеры, тоны, анимации, варианты фигур |
| `cube.html` | Демо-страница с шестью кубами разных вариантов |
| `README.md` | Этот файл |

## Открыть

```bash
# Просто откройте cube.html в браузере
open cube.html             # macOS
xdg-open cube.html         # Linux
start cube.html            # Windows
```

Или через локальный сервер:
```bash
python3 -m http.server 8000
# → http://127.0.0.1:8000/cube.html
```

## Использовать в своём проекте

```html
<head>
  <link rel="stylesheet" href="cube.css">
</head>
<body>
  <div class="iso iso--md iso--orbit iso--shape-hex">
    <svg viewBox="-120 -120 240 240">
      <!-- скопировать SVG из cube.html, см. ниже -->
    </svg>
  </div>
</body>
```

## API классов

| Класс | Варианты | Что делает |
|---|---|---|
| `iso--xs / sm / md / lg / xl` | 5 | размер (24px → 400px) |
| `iso--static / draw / orbit` | 3 | режим: статика / сборка по линиям / + спин + орбитальные точки |
| `iso--brand / light / dark / mono` | 4 | тон под подложку |
| `iso--shape-hex / cube / solid / cluster` | 4 | вариант геометрии |

**Дефолтные комбинации:**
- Логотип в шапке → `iso--sm iso--static iso--brand iso--shape-hex`
- Hero-куб → `iso--xl iso--orbit iso--light iso--shape-hex`
- Маркер секции → `iso--sm iso--draw iso--brand iso--shape-hex`
- Фавикон → `iso--xs iso--static iso--mono iso--shape-hex`

## Что внутри SVG (hex-вариант)

```html
<svg viewBox="-120 -120 240 240">
  <defs>
    <!-- Три градиента для трёх граней (top/right/left) -->
    <linearGradient id="hex-top"   x1="50%"  y1="0%" x2="50%"  y2="100%">…</linearGradient>
    <linearGradient id="hex-right" x1="0%"   y1="0%" x2="100%" y2="100%">…</linearGradient>
    <linearGradient id="hex-left"  x1="100%" y1="0%" x2="0%"   y2="100%">…</linearGradient>
  </defs>

  <g class="iso__group">
    <!-- 3 грани (под линиями) -->
    <path class="iso__face iso__face--top"   d="M0 -100 L86.6 -50 L0 0 L-86.6 -50 Z" fill="url(#hex-top)"/>
    <path class="iso__face iso__face--right" d="M86.6 -50 L86.6 50 L0 100 L0 0 Z"    fill="url(#hex-right)"/>
    <path class="iso__face iso__face--left"  d="M-86.6 -50 L0 0 L0 100 L-86.6 50 Z"  fill="url(#hex-left)"/>

    <!-- 6 внешних рёбер (шестиугольник) -->
    <path class="iso__edge iso__edge--outer iso__edge--1" d="M0 -100 L86.6 -50"/>
    <path class="iso__edge iso__edge--outer iso__edge--2" d="M86.6 -50 L86.6 50"/>
    <path class="iso__edge iso__edge--outer iso__edge--3" d="M86.6 50 L0 100"/>
    <path class="iso__edge iso__edge--outer iso__edge--4" d="M0 100 L-86.6 50"/>
    <path class="iso__edge iso__edge--outer iso__edge--5" d="M-86.6 50 L-86.6 -50"/>
    <path class="iso__edge iso__edge--outer iso__edge--6" d="M-86.6 -50 L0 -100"/>

    <!-- 3 внутренних ребра (Y от центра) -->
    <path class="iso__edge iso__edge--inner iso__edge--7" d="M0 0 L0 -100"/>
    <path class="iso__edge iso__edge--inner iso__edge--8" d="M0 0 L86.6 50"/>
    <path class="iso__edge iso__edge--inner iso__edge--9" d="M0 0 L-86.6 50"/>

    <!-- 7 вершин -->
    <circle class="iso__vert iso__vert--1" cx="0"     cy="-100"/>
    <circle class="iso__vert iso__vert--2" cx="86.6"  cy="-50"/>
    <circle class="iso__vert iso__vert--3" cx="86.6"  cy="50"/>
    <circle class="iso__vert iso__vert--4" cx="0"     cy="100"/>
    <circle class="iso__vert iso__vert--5" cx="-86.6" cy="50"/>
    <circle class="iso__vert iso__vert--6" cx="-86.6" cy="-50"/>
    <circle class="iso__vert iso__vert--center" cx="0" cy="0"/>
  </g>

  <!-- Только для iso--orbit: 3 орбитальные точки -->
  <g class="iso__orbit">
    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="16s" repeatCount="indefinite"/>
    <circle class="iso__particle" cx="112"  cy="0"    r="3"/>
    <circle class="iso__particle" cx="-56"  cy="97"   r="2"/>
    <circle class="iso__particle" cx="-56"  cy="-97"  r="2.5"/>
  </g>
</svg>
```

## Важное про SVG id

Каждый куб на странице должен иметь **уникальные id градиентов**: `hex-top`, `cb-top`, `sl-top`, `lt-top` и т.д. Если на странице два куба с одинаковым `id="hex-top"` — второй не отрисует заливку.

В Astro-версии (`/app/src/components/IsoCube.astro`) это решено через `Math.random()` per-instance.

## Геометрия — короткая шпаргалка

```
       (0, -100)             ← верхняя вершина
        /     \
       /       \
(-86.6, -50)  (86.6, -50)    ← верхне-левая и верхне-правая
   |\           /|
   | \         / |
   |  (0, 0) ←──── центральная вершина, к ней сходится Y
   | /         \ |
   |/           \|
(-86.6, 50)   (86.6, 50)     ← нижне-левая и нижне-правая
       \       /
        \     /
       (0, 100)              ← нижняя вершина

Радиус 100. ViewBox: -120 -120 240 240 (с запасом 20px на штрихи).
```

## Бренд-палитра APIS (из бренд-бука 2017)

| Цвет | HEX | RGB | CMYK |
|---|---|---|---|
| Тёмный | `#0542AC` | 5 66 172 | 100 80 0 0 |
| Средний | `#2167E0` | 33 103 224 | 100 50 0 0 |
| Светлый (акцент) | `#7DA8FF` | 125 168 255 | 51 19 0 0 |

Фирменный градиент: 135°, dark → mid → light, со слайдером на 60% к светлой стороне.

## Лицензия / использование

Знак APIS Media — собственность ООО «ЭЙПИСМЕДИА». Файлы предназначены для использования только в рамках сайта и материалов этой организации.
