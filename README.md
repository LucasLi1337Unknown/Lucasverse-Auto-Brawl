# Lucasverse Auto Brawl

A pixel-art auto-battler. Choose 2–12 fighters, then watch their signature abilities collide in a free-for-all arena.

## Play

[Play on GitHub Pages](https://lucasli1337unknown.github.io/Lucasverse-Auto-Brawl/)

Lucas, Cynthia, Junyi and Mr. Eppley join eight fictional Lucasverse fighters. Skills include dashes, frost stuns, triple attacks, shields, traps, teleportation, healing, reflection and fire zones. All abilities are fictional game roles.

Select fighters before starting. Use Pause, 1×/2×/4× playback and Reset for seeded rematches. Click a standing to highlight a fighter. Space starts or pauses the battle when a control is not focused. Sound is optional and off by default.

## Run locally

Open `index.html` in a browser. No installation, API keys or server required.

- `engine.js`: seeded combat simulation and 12 unique skill implementations.
- `app.js`: canvas sprites, animation, roster and controls.
- `style.css`: responsive arena interface.

Battles use a seeded random generator. Reset keeps the seed; a new brawl changes it. Sudden death increases damage after 45 seconds. The arena runs locally in each visitor's browser; this is not a multiplayer game.

## Validation

40 full-roster battles and all 66 distinct duels finished; health bounds and deterministic replays passed. Interface checks covered selection, pause/resume, speed, victory, reset and rules. Browser layout has not yet been checked on every device.
