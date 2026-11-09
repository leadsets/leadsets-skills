#!/usr/bin/env node
/** Checks every skill folder: SKILL.md frontmatter, required sections, skill.json, known tools and categories. Exit 1 on any problem. */
import fs from 'node:fs'
import path from 'node:path'

const TOOLS = new Set(['search_people', 'search_companies', 'enrich_person', 'enrich_company', 'verify_email', 'scrape_company', 'scrape_jobs', 'get_usage'])
const CATEGORIES = new Set(['Prospecting', 'Enrichment', 'Email verification', 'Company research', 'Hiring signals', 'Web scraping', 'CRM hygiene', 'List building', 'Outreach handoff', 'Usage and ops', 'Agency workflows'])
const OUTCOMES = new Set(['Find new prospects', 'Get verified contact data', 'Research accounts and timing', 'Keep your CRM clean', 'Launch outreach'])
const SECTIONS = ['## Requirements', '## When to use', '## What you give it', '## Steps', '## Checks before returning', '## Output', '## Example', '## Cost and limits']

const root = path.join(process.cwd(), 'skills')
const problems = []
const ids = fs.readdirSync(root).filter((d) => !d.startsWith('_') && fs.statSync(path.join(root, d)).isDirectory())
for (const id of ids) {
  const p = (m) => problems.push(`${id}: ${m}`)
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id) || id.length > 64) p('folder name must be lowercase-with-hyphens, max 64 characters')
  const mdPath = path.join(root, id, 'SKILL.md')
  if (!fs.existsSync(mdPath)) { p('missing SKILL.md'); continue }
  const md = fs.readFileSync(mdPath, 'utf8')
  const fm = md.match(/^---\n([\s\S]*?)\n---\n/)
  if (!fm) { p('SKILL.md must start with YAML frontmatter between --- lines'); continue }
  const name = fm[1].match(/^name:\s*(.+)$/m)?.[1]?.trim()
  const desc = fm[1].match(/^description:\s*(.+)$/m)?.[1]?.trim().replace(/^"|"$/g, '')
  if (name !== id) p(`frontmatter name "${name}" must equal the folder name`)
  if (!desc || desc.length < 80 || desc.length > 1024) p('frontmatter description must be 80 to 1024 characters')
  if (!/^license:\s*MIT$/m.test(fm[1])) p('license must be MIT')
  for (const s of SECTIONS) if (!md.includes(`\n${s}\n`)) p(`missing section "${s}"`)
  for (const t of md.matchAll(/`([a-z]+_[a-z_]+)`/g)) if (/^(search|enrich|verify|scrape|get)_/.test(t[1]) && !TOOLS.has(t[1])) p(`unknown Leadsets tool \`${t[1]}\``)
  if (/\[(TODO|TBD|insert|placeholder)/i.test(md)) p('contains a placeholder')
  const jPath = path.join(root, id, 'skill.json')
  if (!fs.existsSync(jPath)) { p('missing skill.json'); continue }
  let j
  try { j = JSON.parse(fs.readFileSync(jPath, 'utf8')) } catch { p('skill.json is not valid JSON'); continue }
  if (j.id !== id) p('skill.json id must equal the folder name')
  if (!CATEGORIES.has(j.category)) p(`unknown category "${j.category}"`)
  if (!OUTCOMES.has(j.outcome)) p(`unknown outcome "${j.outcome}"`)
  if (!Array.isArray(j.tools) || j.tools.some((t) => !TOOLS.has(t))) p('skill.json tools must be Leadsets tool names')
  if (!j.summary || j.summary.length > 160) p('skill.json summary is required, max 160 characters')
}
if (problems.length) {
  console.error(problems.join('\n'))
  console.error(`\n${problems.length} problem(s) in ${ids.length} skills`)
  process.exit(1)
}
console.log(`${ids.length} skills OK`)
