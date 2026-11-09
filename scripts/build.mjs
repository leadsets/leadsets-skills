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

// UTM tags on every leadsets.ai link, so the website can see traffic from this repo.
// utm_campaign names the skill (SKILL.md) or the file (readme, contributing). Idempotent.
const tagLinks = (text, campaign) =>
  text.replace(/https:\/\/www\.leadsets\.ai([^\s)"'>\]]*)/g, (m, rest) => {
    if (/[?&]utm_source=/.test(rest)) return m
    const [p, hash = ''] = rest.split('#')
    return `https://www.leadsets.ai${p}${p.includes('?') ? '&' : '?'}utm_source=github&utm_medium=leadsets-skills&utm_campaign=${campaign}${hash ? `#${hash}` : ''}`
  })
for (const [file, campaign] of [['README.md', 'readme'], ['CONTRIBUTING.md', 'contributing'], ['skills/_template/SKILL.md', 'template']]) {
  const f = path.join(root, file)
  fs.writeFileSync(f, tagLinks(fs.readFileSync(f, 'utf8'), campaign))
}
for (const id of ids) {
  const f = path.join(skillsDir, id, 'SKILL.md')
  fs.writeFileSync(f, tagLinks(fs.readFileSync(f, 'utf8'), id))
}

fs.rmSync(path.join(root, 'dist'), { recursive: true, force: true })
fs.mkdirSync(path.join(root, 'dist'))
for (const id of ids) execFileSync('zip', ['-qrX', path.join(root, 'dist', `${id}.zip`), id, '-x', '*/.DS_Store'], { cwd: skillsDir })
execFileSync('zip', ['-qrX', path.join(root, 'dist', 'leadsets-skills.zip'), ...ids, '-x', '*/.DS_Store'], { cwd: skillsDir })

// Systems a skill hands off to (the website's Connection filter), read from its SKILL.md.
// Every skill runs in any MCP agent, so Claude, ChatGPT and Cursor apply to all.
const CONNECTIONS = ['CSV', 'Google Sheets', 'Excel', 'HubSpot', 'Salesforce', 'Pipedrive', 'Attio', 'LinkedCamp', 'Instantly', 'Smartlead', 'Clay', 'n8n', 'Slack']
const connectionsOf = (id) => {
  const md = fs.readFileSync(path.join(skillsDir, id, 'SKILL.md'), 'utf8')
  return [...CONNECTIONS.filter((c) => new RegExp(`\\b${c.replace(' ', '\\s')}\\b`).test(md)), 'Claude', 'ChatGPT', 'Cursor']
}
const authorOf = (id) => (fs.readFileSync(path.join(skillsDir, id, 'SKILL.md'), 'utf8').match(/^\s+author:\s*"?([^"\n]+)"?$/m)?.[1] ?? 'Leadsets').trim()
const catalog = skills.map((s) => ({ ...s, connections: connectionsOf(s.id), author: authorOf(s.id) === 'Leadsets' ? 'Leadsets team' : 'Community', path: `skills/${s.id}`, url: `${REPO}/tree/main/skills/${s.id}`, download: `${REPO}/raw/main/dist/${s.id}.zip` }))
fs.writeFileSync(path.join(root, 'skills.json'), JSON.stringify(catalog, null, 2) + '\n')

const rows = ORDER.filter((c) => skills.some((s) => s.category === c))
  .map((c) => `### ${c}\n\n| Skill | What it does | Tools | Download |\n| --- | --- | --- | --- |\n${skills.filter((s) => s.category === c).map((s) => `| [${s.name}](skills/${s.id}) | ${s.summary} | ${s.tools.map((t) => `\`${t}\``).join(' ')} | [zip](dist/${s.id}.zip) |`).join('\n')}`)
  .join('\n\n')
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8')
const next = readme.replace(/<!-- INDEX:START -->[\s\S]*<!-- INDEX:END -->/, `<!-- INDEX:START -->\n${rows}\n<!-- INDEX:END -->`).replace(/\*\*\d+ skills\*\*/, `**${skills.length} skills**`)
fs.writeFileSync(path.join(root, 'README.md'), next)
console.log(`${skills.length} skills · dist/ and README index updated`)
