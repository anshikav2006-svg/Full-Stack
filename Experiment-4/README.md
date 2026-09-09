# Aniscribe — Interactive Social Media Calendar with React Rendering Optimization

## Aim
To design and implement an interactive calendar interface for scheduling and
managing posts, while optimizing rendering performance and implementing
testing strategies for interactive UI components.

## Objectives
- Understand time-based data visualization in UI systems.
- Implement a calendar-based scheduling interface.
- Map structured post data to temporal layouts (date + time).
- Enable user interactions: click, edit, delete, drag-and-drop.
- Understand performance bottlenecks in UI systems.
- Optimize rendering using memoization techniques (`React.memo`, `useMemo`,
  `useCallback`, scoped selectors).
- Reduce unnecessary re-renders.
- Implement automated tests for UI components and logic.

## Technologies
- React 18 + Vite
- Redux Toolkit + React-Redux
- Vitest + React Testing Library
- Plain CSS (anime-inspired theme)

## Features
- **Calendar scheduling** — Week (7-day) and Month (~30-day) views, posts
  mapped to date + time.
- **CRUD** — create, edit, delete posts via a modal form with validation.
- **Drag-and-drop** — drag a post card from one day and drop it on another to
  reschedule it (native HTML5 drag-and-drop, no extra library).
- **Status management** — Scheduled / Draft / Done / Posted posts are all
  visible on the calendar and in the compact status-filterable post list;
  nothing is hidden automatically.
- **Rendering optimization demo** — a toggle switches the calendar between:
  - **Optimized**: each `CalendarDay` subscribes to its own slice of the
    Redux store (`useSelector` + `shallowEqual`) and is wrapped in
    `React.memo`, so moving a post only re-renders the two affected days.
  - **Non-Optimized**: the calendar subscribes to the entire posts array and
    passes it down unmemoized, so any change re-renders every displayed day.
- **Render counter** — a single badge above the calendar
  (`🔄 Renders: N`) that counts *actual* `CalendarDay` render commits via a
  `useEffect`-based reporter, not button clicks, dispatches, or hardcoded
  numbers. A "Reset" button (and mode/view switches) reset it to zero so a
  specific action's render cost can be observed in isolation.

## Project structure
```
src/
├── components/
│   ├── Calendar/       Calendar grid, day variants, event card, render counter
│   ├── Posts/          Post card, post list (status tabs), create/edit modal
│   ├── Layout/          App header
│   └── UI/              Generic button, confirm dialog
├── store/               Redux Toolkit store + posts slice/selectors
├── pages/                CalendarPage (wires everything together)
├── data/                 Sample seed posts
└── tests/                Vitest + React Testing Library test suites
```

## Running the project
```bash
npm install
npm run dev
```
Then open the printed local URL.

## Running the tests
```bash
npm test
```
This runs the full suite, including:
- calendar rendering and status visibility (Scheduled/Done posts)
- post create / edit / delete
- drag-and-drop rescheduling
- **optimized vs non-optimized render-count tests**, which observe real
  component render commits (via the same instrumentation the app itself
  uses) to assert the 2-vs-7 and 2-vs-30 render counts — nothing is
  hardcoded.

## Building for production
```bash
npm run build
npm run preview
```

## Demonstrating the optimization
1. Open the app; the "Rendering" toggle defaults to **Optimized**.
2. Drag a post from one day to another.
3. Note the render counter (small delta — typically 2).
4. Click **Reset**, switch to **Non-Optimized**.
5. Drag a post again.
6. Note the render counter now matches the number of displayed days
   (7 in Week view, up to 31 in Month view).
