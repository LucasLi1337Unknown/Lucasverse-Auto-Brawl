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

## Combat effects update

Skills now use distinct actions: crossing sword dashes, blink combos, delayed ice spikes, question-mark lightning, shield knockback, fork mines, ghost portals, keyboard ground slams, marked anvil drops, healing runes and poison vines, counter-blade spins, and delayed fire eruptions. Ordinary ranged attacks have character-specific visuals instead of generic bullets. Windups use marked impact areas, so moving rivals can escape ice, anvils and fire. Screen shake respects reduced-motion preferences.

Validation: all 66 duels and 20 full-roster battles finished with bounded health; a simulated interface battle exercised the canvas effects and reset control.
