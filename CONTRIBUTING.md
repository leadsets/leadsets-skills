# Submit a skill

Thanks for adding to the library. Every skill here is a plain `SKILL.md` that teaches an agent one GTM job, end to end, with Leadsets data. New skills arrive as pull requests and are reviewed before they're listed on [leadsets.ai/skills](https://www.leadsets.ai/skills).

Not ready to write one? [Open a skill idea](https://github.com/leadsets/leadsets-skills/issues/new?template=skill-idea.yml) instead.

## Before you start

- **One job per skill.** "Build an outbound prospect list" is a skill; "do all my prospecting" isn't.
- **Check it's new.** Search the [skills index](README.md#skills) for something similar. Improving an existing skill is just as welcome.
- **Test it for real.** Run it in at least one agent (Claude, ChatGPT, Cursor or another MCP client) connected to Leadsets. The free plan's 1,000 records are enough.

## Step by step

1. **Fork** this repository and clone your fork.

   ```bash
   git clone https://github.com/<you>/leadsets-skills.git
   cd leadsets-skills
   git checkout -b add-<your-skill-id>
   ```

2. **Copy the template** into a new folder named after your skill id (lowercase, words joined by hyphens, max 64 characters).

   ```bash
   cp -r skills/_template skills/<your-skill-id>
   ```

3. **Write `SKILL.md`.** Keep every section from the template:

   | Section | What goes in it |
   | --- | --- |
   | Frontmatter | `name` (same as the folder), `description` (what it does and when to use it, 200 to 450 characters, ends with "Use when …"), `license: MIT`, and `metadata` (title, category, outcome, tools, version, author) |
   | Requirements | Leave as in the template |
   | When to use | 3 to 5 request phrasings that should trigger it |
   | What you give it | Each input, with its default |
   | Steps | Numbered; each step names the Leadsets tool it calls. Start with `get_usage` when the run spends records, and probe with a 1-record search before large ones |
   | Checks before returning | What the agent verifies before handing back results |
   | Output | The exact shape of the result, and how catch-all, unknown and invalid emails are handled |
   | Example | A realistic prompt and a short run summary, marked illustrative |
   | Cost and limits | How records, requests and scrape units are spent |
   | What it doesn't do | 2 or 3 things it deliberately leaves out |

4. **Fill in `skill.json`.** It powers the website listing.

   ```json
   {
     "id": "your-skill-id",
     "name": "Your skill title",
     "category": "Prospecting",
     "outcome": "Find new prospects",
     "tools": ["search_people", "enrich_person"],
     "summary": "One sentence, max 160 characters."
   }
   ```

   - **Category**, one of: Prospecting, Enrichment, Email verification, Company research, Hiring signals, Web scraping, CRM hygiene, List building, Outreach handoff, Usage and ops, Agency workflows.
   - **Outcome**, one of: Find new prospects, Get verified contact data, Research accounts and timing, Keep your CRM clean, Launch outreach.
   - **Tools**, any of: `search_people`, `search_companies`, `enrich_person`, `enrich_company`, `verify_email`, `scrape_company`, `scrape_jobs`, `get_usage`.

5. **Validate.**

   ```bash
   node scripts/validate.mjs
   ```

   The same check runs on every pull request.

6. **Open a pull request** against `main`. The template asks what the skill does, how you tested it, and for a short checklist. Don't commit `dist/` or edit the README index; they're rebuilt when a skill is merged.

## Rules

- **Only real Leadsets tools.** No invented tools or parameters. The tools and what they return are in the [MCP docs](https://www.leadsets.ai/docs/mcp).
- **No real personal data.** Examples use fictional people and companies, such as Maya Chen at Northwind Analytics (northwind.co).
- **Respect the data.** Skills must honour opt-outs, never scrape behind logins, and keep outreach lawful (see the [fair use policy](https://www.leadsets.ai/fair-use)).
- **Plain writing.** Short sentences, imperative steps, no hype.
- **MIT licensed.** By opening a pull request you agree to publish your skill under the MIT license.

## What happens next

A maintainer reviews within a few business days. We may suggest edits for clarity or to keep skills consistent. Once merged, your skill appears in the index, gets a download zip, and is listed on [leadsets.ai/skills](https://www.leadsets.ai/skills) with credit to you as author.

Questions: open an issue, or email support@leadsets.ai.
