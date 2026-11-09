## New skill / change

**Skill folder:** `skills/<your-skill-id>/`
**Category:** <!-- one of the 11 categories in CONTRIBUTING.md -->
**Outcome:** <!-- one of the 5 outcomes -->

### What it does

<!-- One or two sentences. Who is it for, what do they get? -->

### How you tested it

<!-- Which agent (Claude, ChatGPT, Cursor, …), the prompt you used, and a short summary of the run. -->

### Checklist

- [ ] The folder name and the frontmatter `name` are the same lowercase-with-hyphens id
- [ ] `SKILL.md` follows `skills/_template/SKILL.md` (all sections present)
- [ ] `skill.json` is filled in (id, name, category, outcome, tools, summary)
- [ ] Only real Leadsets tools are used, and the steps say which tool each step calls
- [ ] Example people and companies are fictional (no real personal data)
- [ ] `node scripts/validate.mjs` passes
- [ ] I'm fine with this being published under the MIT license
