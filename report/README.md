# Validisory report template

React + TypeScript implementation of the Claude Design handoff
`project/Validisory Sample Report.dc.html`: 20 A4 pages rendered from one typed
`ReportData` object.

```bash
npm install
npm run dev        # screen preview (pages as cards)
npm run build      # typecheck + static build to dist/
npm run pdf        # build, then export validisory-report.pdf (A4, bookmarks, internal links)
```

`npm run pdf` uses the playwright-core managed Chromium; set `CHROMIUM_PATH` to use another binary.

## Visual system: Signal Strokes

The print template follows the approved **Signal Strokes** report concept
(Validisory Admin Panel, approved 22 Oct 2026) on the Validisory design system:

- **The stroke meter**: the three 45° strokes of the logo as the instrument.
  Filled strokes are navy (white on navy), the last filled stroke is gold,
  and empty strokes are grey (`Strokes`). The running header carries a
  chapter rail with one stroke per TOC section.
- **Verdict marks**: the cut corner is the only shape that carries a decision.
  Fill follows confidence: solid (GO), tone (Conditional-Go, Revalidate),
  outline (No-Go, Stop) (`VerdictMark`).
- **Fields, not boxes**: navy field for the signal (cover, decision hero, key
  findings), white for detail, grey-2 for the workbench. Hairlines only for tables.
- **Two sizes**: numbers in Space Grotesk Bold, text in Montserrat.
- Teal, gold and copper are accents only (stroke tips, chart series, status
  strokes). Lilac is not a Validisory colour and is not used.

## Layout

| Path | Role |
| --- | --- |
| `src/model/types.ts` | The report data contract (the JSON the Validisory app must produce). |
| `src/model/states.ts` | Semantic → visual state mapping: evidence, exposure, importance, impact, verdict, provenance. |
| `src/theme/tokens.ts` | Brand colours, fonts, hatch patterns, section families. |
| `src/components/` | `Page` (A4 master page with header, footer and edge tab) and shared primitives (`EvidenceBadge`, `ExposureChip`, `ImpactTag`, `ProvTag`, `Rich`, …). |
| `src/pages/` | One component per page; `section.ts` holds the page order that drives page numbers, TOC targets and cross-references. |
| `src/data/micro-tutorials-ai.ts` | The sample report content, carried over verbatim from the design. |

## Data conventions

- Values are semantic (`evidence: 'partial'`, `exposure: 'high'`); components choose the visuals.
- `null` means "not provided by source" and renders a hatched, labelled empty state (thresholds, P&L, what-if results, publishers, dates).
- `[n]` inside text links to source card *n*; `**bold**` and `[label](#anchor)` are also supported.
- Derived values are computed rather than stored: evidence profile counts, risk matrix cells and severity, SOM/TAM square sizes, chart scales, source counts, and page numbers in links.
