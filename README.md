# Leadsets GTM skills

Free, open-source skills that teach your AI agent how to do go-to-market work: build prospect lists, enrich and verify contacts, research accounts, watch hiring signals, keep your CRM clean and hand off to your sequencer.

Each skill is a `SKILL.md` that knows which [Leadsets](https://www.leadsets.ai?utm_source=github&utm_medium=leadsets-skills&utm_campaign=readme) tools to call, in what order, and how to check the result. They work in Claude, ChatGPT, Cursor and any agent that reads the SKILL.md standard. **50 skills** · MIT licensed.

Browse them on the website: [leadsets.ai/skills](https://www.leadsets.ai/skills?utm_source=github&utm_medium=leadsets-skills&utm_campaign=readme).

## Install

**Claude (web and desktop):** download a skill's zip from the index below, then upload it under **Settings → Skills**.

**Claude Code or any agent with a skills folder:**

```bash
git clone https://github.com/leadsets/leadsets-skills.git
cp -r leadsets-skills/skills/<skill-id> ~/.claude/skills/
```

**Everything at once:** [dist/leadsets-skills.zip](dist/leadsets-skills.zip)

Skills call Leadsets through its remote MCP server, `https://mcp.leadsets.ai` ([connect your agent](https://www.leadsets.ai/docs/mcp?utm_source=github&utm_medium=leadsets-skills&utm_campaign=readme)). The free plan includes 1,000 records, no card: [get a key](https://www.leadsets.ai/signup?utm_source=github&utm_medium=leadsets-skills&utm_campaign=readme).

## Skills

<!-- INDEX:START -->
### Prospecting

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Buying committee mapper](skills/buying-committee-mapper) | Finds the missing stakeholders on an open deal and adds them to the account. | `get_usage` `search_people` `enrich_person` | [zip](dist/buying-committee-mapper.zip) |
| [Champion job-change tracker](skills/champion-tracker) | Spots past champions who moved to a new company, so you reach them in their first 90 days. | `get_usage` `enrich_person` | [zip](dist/champion-tracker.zip) |
| [Contacts at target accounts](skills/contacts-at-target-accounts) | Turns an account list into ranked contacts per account, with optional enrichment. | `get_usage` `search_people` `enrich_person` | [zip](dist/contacts-at-target-accounts.zip) |
| [Find decision-makers at a company](skills/decision-makers-at-company) | Turns one domain into a ranked list of the people who buy what you sell. | `get_usage` `enrich_company` `search_people` | [zip](dist/decision-makers-at-company.zip) |
| [Lookalike accounts](skills/lookalike-accounts) | Starts from your best customers and finds companies that look like them. | `get_usage` `enrich_company` `search_companies` | [zip](dist/lookalike-accounts.zip) |
| [Names to prospects](skills/names-to-prospects) | Turns a list of names and companies (event attendees, webinar sign-ups) into enriched contacts. | `get_usage` `search_people` `enrich_person` | [zip](dist/names-to-prospects.zip) |
| [Build an outbound prospect list](skills/outbound-prospect-list) | Defines your ICP, finds matching people, enriches and verifies them, and exports a send-ready list. | `get_usage` `search_companies` `search_people` `enrich_person` `verify_email` | [zip](dist/outbound-prospect-list.zip) |
| [Search B2B prospects](skills/search-b2b-prospects) | Finds people by title, function, seniority, location, company size and industry, with match reasons. | `get_usage` `search_people` | [zip](dist/search-b2b-prospects.zip) |

### Enrichment

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Best work email for a person](skills/best-work-email) | Returns the best verified work email for one person, or says honestly that there isn't one. | `get_usage` `enrich_person` `verify_email` `search_companies` | [zip](dist/best-work-email.zip) |
| [Bulk enrich a CSV](skills/bulk-enrich-csv) | Enriches a whole file as an async job, checking your limits before each batch. | `get_usage` `enrich_person` | [zip](dist/bulk-enrich-csv.zip) |
| [Find and enrich by name](skills/enrich-by-name) | Goes from name plus company to contact data, no LinkedIn URL needed. | `get_usage` `search_people` `enrich_person` | [zip](dist/enrich-by-name.zip) |
| [Enrich companies from domains](skills/enrich-company-domains) | Adds industry, headcount band, location and stack to a list of domains. | `get_usage` `enrich_company` | [zip](dist/enrich-company-domains.zip) |
| [Enrich a contact from a LinkedIn URL](skills/enrich-from-linkedin) | Returns current role, company and a verified work email for one profile URL or a batch. | `get_usage` `enrich_person` | [zip](dist/enrich-from-linkedin.zip) |
| [Job-change detector](skills/job-change-detector) | Re-checks a contact list and flags everyone who changed role or company. | `get_usage` `enrich_person` | [zip](dist/job-change-detector.zip) |

### Email verification

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Bounce recovery](skills/bounce-recovery) | Takes your bounced contacts and finds a current, verified email for the ones who moved. | `get_usage` `verify_email` `enrich_person` | [zip](dist/bounce-recovery.zip) |
| [Catch-all segmenter](skills/catch-all-segmenter) | Separates catch-all domains so you can warm them at lower volume instead of dropping them. | `get_usage` `verify_email` | [zip](dist/catch-all-segmenter.zip) |
| [Clean a list before sending](skills/list-cleaner) | Verifies every address and returns send-safe, catch-all, unknown and invalid segments. | `get_usage` `verify_email` | [zip](dist/list-cleaner.zip) |
| [Pre-send campaign check](skills/pre-send-check) | Runs a final verification on a loaded campaign and pauses risky contacts before launch. | `get_usage` `verify_email` | [zip](dist/pre-send-check.zip) |
| [Role-address filter](skills/role-address-filter) | Flags info@, sales@ and other shared inboxes, and finds a named person behind each. | `get_usage` `verify_email` `search_people` | [zip](dist/role-address-filter.zip) |

### Company research

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Account research brief](skills/account-research-brief) | Reads a company's site and returns a one-page brief: what they sell, to whom, and angles to open with. | `get_usage` `scrape_company` `enrich_company` | [zip](dist/account-research-brief.zip) |
| [Account tiering](skills/account-tiering) | Scores an account list against your ICP and sorts it into tiers with reasons. | `get_usage` `enrich_company` `scrape_company` | [zip](dist/account-tiering.zip) |
| [Competitor customer finder](skills/competitor-customer-finder) | Pulls the customer logos and case studies a competitor publishes, then finds contacts there. | `get_usage` `scrape_company` `search_people` | [zip](dist/competitor-customer-finder.zip) |
| [Personalized first lines](skills/first-line-writer) | Writes one specific, true opening line per prospect from their company's site and hiring. | `get_usage` `scrape_company` `scrape_jobs` | [zip](dist/first-line-writer.zip) |
| [Positioning snapshot](skills/positioning-snapshot) | Summarizes a company's products, pricing model and ideal customer from its own pages. | `get_usage` `scrape_company` | [zip](dist/positioning-snapshot.zip) |

### Hiring signals

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Companies hiring SDRs](skills/companies-hiring-sdrs) | Lists companies that posted SDR or BDR roles recently, with their sales leaders. | `get_usage` `search_companies` `scrape_jobs` `search_people` | [zip](dist/companies-hiring-sdrs.zip) |
| [Hiring signal finder](skills/hiring-signal-finder) | Finds companies hiring for roles that predict they need what you sell, and who to contact. | `get_usage` `scrape_jobs` `search_people` | [zip](dist/hiring-signal-finder.zip) |
| [Hiring-to-pain mapper](skills/hiring-to-pain) | Reads job descriptions and turns them into the likely pain and a matching message angle. | `get_usage` `scrape_jobs` | [zip](dist/hiring-to-pain.zip) |
| [New leader alerts](skills/new-leader-alerts) | Watches target accounts for new VP and C-level hires, the classic buying trigger. | `get_usage` `search_people` `enrich_person` | [zip](dist/new-leader-alerts.zip) |

### Web scraping

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Careers page to structured jobs](skills/careers-to-jobs) | Turns a careers page into title, team, location and date for every open role. | `get_usage` `scrape_jobs` | [zip](dist/careers-to-jobs.zip) |
| [Homepage to company profile](skills/homepage-to-profile) | Turns a homepage into products, audience, proof points and key links. | `get_usage` `scrape_company` | [zip](dist/homepage-to-profile.zip) |
| [Partner directory to account list](skills/partner-directory-accounts) | Turns a public partner or integrations directory into an enriched account list. | `get_usage` `scrape_company` `enrich_company` | [zip](dist/partner-directory-accounts.zip) |
| [Team page to contacts](skills/team-page-to-contacts) | Reads a public team page, then finds and verifies the people listed on it. | `get_usage` `scrape_company` `enrich_person` `verify_email` | [zip](dist/team-page-to-contacts.zip) |

### CRM hygiene

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Attio record enrichment](skills/attio-record-enrich) | Fills people and company records in Attio with sourced, dated fields. | `get_usage` `enrich_company` `enrich_person` | [zip](dist/attio-record-enrich.zip) |
| [HubSpot company enrichment](skills/hubspot-company-enrich) | Fills empty industry, size and location fields on HubSpot companies. | `get_usage` `enrich_company` | [zip](dist/hubspot-company-enrich.zip) |
| [HubSpot email backfill](skills/hubspot-email-backfill) | Finds contacts with missing or bounced emails and writes verified addresses back. | `get_usage` `enrich_person` `verify_email` | [zip](dist/hubspot-email-backfill.zip) |
| [Pipedrive lead enrichment](skills/pipedrive-lead-enrich) | Enriches new Pipedrive leads with role, company and a verified email. | `get_usage` `enrich_person` `enrich_company` | [zip](dist/pipedrive-lead-enrich.zip) |
| [Salesforce title refresh](skills/salesforce-title-refresh) | Refreshes titles and seniority on Salesforce contacts and logs every change. | `get_usage` `enrich_person` | [zip](dist/salesforce-title-refresh.zip) |
| [Stale record audit](skills/stale-record-audit) | Flags contacts whose title or company is out of date before reps waste a sequence on them. | `get_usage` `enrich_person` | [zip](dist/stale-record-audit.zip) |

### List building

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Data quality check](skills/data-quality-check) | Audits any list for duplicates, stale titles and risky emails, with a fix list. | `get_usage` `enrich_person` `verify_email` | [zip](dist/data-quality-check.zip) |
| [Dedupe and merge lists](skills/dedupe-merge) | Merges several lists into one, resolving duplicates by person and company. | `get_usage` `enrich_person` | [zip](dist/dedupe-merge.zip) |
| [ICP builder](skills/icp-builder) | Interviews you for five minutes, then saves your ICP as reusable Leadsets filters. | `get_usage` `search_companies` | [zip](dist/icp-builder.zip) |
| [ICP fit scoring](skills/icp-fit-scoring) | Scores any account or contact list against your ICP and explains each score. | `get_usage` `enrich_company` `enrich_person` | [zip](dist/icp-fit-scoring.zip) |

### Outreach handoff

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Clay table enrichment](skills/clay-http-enrich) | Calls Leadsets from a Clay HTTP column to fill emails and roles across a table. | `get_usage` `enrich_person` | [zip](dist/clay-http-enrich.zip) |
| [n8n inbound lead enrichment](skills/n8n-inbound-enrich) | Enriches every new form fill in n8n and routes good-fit leads to sales. | `get_usage` `enrich_person` `enrich_company` | [zip](dist/n8n-inbound-enrich.zip) |
| [Push a list to LinkedCamp](skills/push-to-linkedcamp) | Sends a verified prospect list straight into a LinkedCamp campaign as leads. | `get_usage` `search_people` `enrich_person` | [zip](dist/push-to-linkedcamp.zip) |
| [Push to Instantly or Smartlead](skills/push-to-sequencer) | Loads verified, segmented contacts into your email sequencer with custom fields. | `get_usage` `verify_email` | [zip](dist/push-to-sequencer.zip) |
| [Signal alerts to Slack](skills/signal-slack-alerts) | Posts new hiring and leadership signals on your target accounts to a Slack channel. | `get_usage` `scrape_jobs` `enrich_person` | [zip](dist/signal-slack-alerts.zip) |

### Usage and ops

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Batch job runner](skills/batch-job-runner) | Runs large jobs asynchronously, resumes after limits refill and reports progress. | `get_usage` `enrich_person` | [zip](dist/batch-job-runner.zip) |
| [Usage planner](skills/usage-planner) | Checks remaining limits and splits big jobs across windows so runs never stall halfway. | `get_usage` | [zip](dist/usage-planner.zip) |

### Agency workflows

| Skill | What it does | Tools | Download |
| --- | --- | --- | --- |
| [Multi-client ICP runner](skills/multi-client-icp-runner) | Runs a saved ICP for each agency client and delivers one clean list per client. | `get_usage` `search_people` `enrich_person` `verify_email` | [zip](dist/multi-client-icp-runner.zip) |
<!-- INDEX:END -->

## Submit a skill

New skills come in as pull requests. The guide is in [CONTRIBUTING.md](CONTRIBUTING.md): copy `skills/_template`, write the SKILL.md and skill.json, run `node scripts/validate.mjs`, and open a PR. Ideas without code are welcome too: [open a skill idea](https://github.com/leadsets/leadsets-skills/issues/new?template=skill-idea.yml).

## License

MIT © Mobylogix LLC (Leadsets). See [LICENSE](LICENSE).
