// Validates WCAG contrast of token pairs in light and dark palettes (parsed from tokens.css).
import { readFileSync } from 'node:fs'
import { parse, wcagContrast } from 'culori'

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8')
const grab = (block) => Object.fromEntries([...block.matchAll(/(--[\w-]+):\s*(oklch\([^)]*\))/g)].map((m) => [m[1], m[2]]))
const light = grab(css.slice(0, css.indexOf('@media (prefers-color-scheme: dark)')))
const darkBlock = css.slice(css.indexOf(':root[data-theme="dark"] {'))
const dark = { ...light, ...grab(darkBlock.slice(0, darkBlock.indexOf('}'))) }

const pairs = [
  // [fg, bg, min, what]
  ['--ink', '--bg', 4.5, 'body text'], ['--ink-2', '--bg', 4.5, 'secondary text'], ['--ink-3', '--bg', 4.5, 'meta text'],
  ['--ink-3', '--surface', 4.5, 'meta on card'], ['--ink-3', '--bg-grouped', 4.5, 'meta on grouped'], ['--ink-3', '--surface-2', 4.5, 'meta on fill'],
  ['--ink-2', '--surface', 4.5, 'tab labels (solid fallback)'],
  ['--on-signal', '--signal', 4.5, 'primary button'], ['--signal-ink', '--bg', 4.5, 'quiet button'], ['--signal-ink', '--surface', 4.5, 'link on card'],
  ['--done-ink', '--done-soft', 4.5, 'ok pill'], ['--warn', '--warn-soft', 4.5, 'warn pill'], ['--warn', '--surface', 4.5, 'warn text'],
  ['--info', '--info-soft', 4.5, 'info pill'], ['--sim', '--sim-soft', 4.5, 'sim pill'],
  ['--focus', '--bg', 3, 'focus ring'], ['--focus', '--surface', 3, 'focus ring on card'],
  ['--field-line', '--surface', 3, 'input border'], ['--line-strong', '--surface', 3, 'unreported dash'],
  ['--done', '--surface', 3, 'completed mark'], ['--partial', '--surface', 3, 'partial mark'],
  ['--missed', '--surface', 3, 'missed ring'], ['--skipped', '--surface', 3, 'skipped ring'],
]
let fails = 0
for (const [name, pal] of [['light', light], ['dark', dark]]) {
  for (const [fg, bg, min, what] of pairs) {
    const r = wcagContrast(parse(pal[fg]), parse(pal[bg]))
    const ok = r >= min
    if (!ok) fails++
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${name.padEnd(5)} ${what.padEnd(26)} ${fg} on ${bg}: ${r.toFixed(2)} (need ${min})`)
  }
}
process.exitCode = fails ? 1 : 0
