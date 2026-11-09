#!/usr/bin/env node
/**
 * Builds the downloads and the index:
 *  - dist/<id>.zip: the skill folder, ready to upload to Claude (Settings → Skills) or drop into an agent's skills directory
 *  - dist/leadsets-skills.zip: every skill
 *  - skills.json: the catalog the website reads
 *  - README.md: the table of skills between the INDEX markers
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const REPO = 'https://github.com/leadsets/leadsets-skills'
const root = process.cwd()
const skillsDir = path.join(root, 'skills')
const ORDER = ['Prospecting', 'Enrichment', 'Email verification', 'Company research', 'Hiring signals', 'Web scraping', 'CRM hygiene', 'List building', 'Outreach handoff', 'Usage and ops', 'Agency workflows']
const ids = fs.readdirSync(skillsDir).filter((d) => !d.startsWith('_') && fs.existsSync(path.join(skillsDir, d, 'skill.json'))).sort()
const skills = ids.map((id) => JSON.parse(fs.readFileSync(path.join(skillsDir, id, 'skill.json'), 'utf8')))

fs.rmSync(path.join(root, 'dist'), { recursive: true, force: true })
fs.mkdirSync(path.join(root, 'dist'))
for (const id of ids) execFileSync('zip', ['-qrX', path.join(root, 'dist', `${id}.zip`), id, '-x', '*/.DS_Store'], { cwd: skillsDir })
execFileSync('zip', ['-qrX', path.join(root, 'dist', 'leadsets-skills.zip'), ...ids, '-x', '*/.DS_Store'], { cwd: skillsDir })

const catalog = skills.map((s) => ({ ...s, path: `skills/${s.id}`, url: `${REPO}/tree/main/skills/${s.id}`, download: `${REPO}/raw/main/dist/${s.id}.zip` }))
fs.writeFileSync(path.join(root, 'skills.json'), JSON.stringify(catalog, null, 2) + '\n')

const rows = ORDER.filter((c) => skills.some((s) => s.category === c))
  .map((c) => `### ${c}\n\n| Skill | What it does | Tools | Download |\n| --- | --- | --- | --- |\n${skills.filter((s) => s.category === c).map((s) => `| [${s.name}](skills/${s.id}) | ${s.summary} | ${s.tools.map((t) => `\`${t}\``).join(' ')} | [zip](dist/${s.id}.zip) |`).join('\n')}`)
  .join('\n\n')
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8')
const next = readme.replace(/<!-- INDEX:START -->[\s\S]*<!-- INDEX:END -->/, `<!-- INDEX:START -->\n${rows}\n<!-- INDEX:END -->`).replace(/\*\*\d+ skills\*\*/, `**${skills.length} skills**`)
fs.writeFileSync(path.join(root, 'README.md'), next)
console.log(`${skills.length} skills · dist/ and README index updated`)
