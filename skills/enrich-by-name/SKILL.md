---
name: enrich-by-name
description: "Turns a list of names plus companies into current roles and verified work emails, with no LinkedIn URL needed. Finds each person with search_people scoped to the company domain, confirms the name match, then runs enrich_person and labels every email honestly. Use when someone says \"find the email for Maya Chen at Northwind\", \"enrich these names\" or \"I only have name and company\"."
license: MIT
metadata:
  title: "Find and enrich by name"
  category: "Enrichment"
  outcome: "Get verified contact data"
  tools: [get_usage, search_people, enrich_person]
  version: "1.0"
  author: Leadsets
  homepage: https://www.leadsets.ai/skills
---

# Find and enrich by name

Takes a name and company, or a list of them, and returns each person's current role, company and a verified work email when one exists. Built for founders, SDRs and GTM engineers holding names from events, referrals or notes, with no profile URL to enrich from.

**Category:** Enrichment · **Outcome:** Get verified contact data · **Tools:** `get_usage`, `search_people`, `enrich_person`

## Requirements

- The Leadsets MCP server connected to your agent: `https://mcp.leadsets.ai` ([setup](https://www.leadsets.ai/docs/mcp)), or a Leadsets API key for the REST API.
- A Leadsets account. The free plan includes 1,000 records, no card ([get a key](https://www.leadsets.ai/signup)).

## When to use

- "Find the work email for Maya Chen, VP Revenue Operations at Northwind Analytics."
- "I have 40 names and companies from a dinner list. Get me their emails."
- "Enrich these contacts. I only have first name, last name and company."
- A sheet or CSV has name and company columns but no email or LinkedIn URL
- A referral or warm intro gives a name and employer, and you need a send-safe address

## What you give it

- **People**: Full name plus company for each person, as a pasted list, CSV or Google Sheet. A company domain (northwind.co) is best; a company name alone works if the domain is unambiguous. Default: whatever rows the user provides.
- **Title hint** (optional): Known or likely job title or function per person (for example "VP Revenue Operations" or "revenue"). Narrows the search and saves search records. Default: none, the skill uses seniority and function filters instead.
- **Where it goes** (optional): Return a table in chat, write a CSV, or add columns to the user's Google Sheet through the agent's own connection. Default: table in chat, plus CSV if more than 25 people.

## Steps

1. **Normalize the input**
   Parse each row into full name, company and domain. If a company has no domain and the right one is not obvious, ask the user once for the missing domains rather than guessing. Drop exact duplicate rows and note how many were removed.
2. **Check limits and plan the run** · `get_usage`
   Call get_usage (free). Estimate cost as up to about 25 search records per person (one page of results) plus 1 enrichment record per matched person. If the estimate exceeds what is left in the five-hour search or enrichment window, or the free records, tell the user and split the list into batches that fit.
3. **Probe with one person** · `search_people`
   For the first person, call search_people with company_domain set to their domain, title set to the title hint if given, and limit 1. Confirm the filters return data and that the response shape and usage object look right before running the rest. An empty result costs 0 records.
4. **Find each person at their company** · `search_people`
   For each person, call search_people with company_domain and, when known, title (fuzzy-matched) or function and seniority. Use limit 25 and follow next_cursor for at most one more page. search_people has no name filter, so match full_name in the results yourself: exact match first, then common variants (Mike/Michael, middle initials). If two results match, keep both and flag the row as ambiguous. If nothing matches, mark the row not found and move on. Respect concurrent search limits; on 429 too_many_concurrent or window_full, wait for Retry-After and retry with the same Idempotency-Key.
5. **Enrich each matched person** · `enrich_person`
   Call enrich_person for every confirmed match. Record current role, company, work email, email status, confidence and checked_at. Emails from enrich_person are already verified, so do not call verify_email again. On 404 not_found, mark the row no email and move on; do not retry.
6. **Compare and report**
   Compare the enriched current company with the company the user gave. If they differ, flag the row as moved. Split results into verified, catch-all, unknown, no email, not found and ambiguous, then write the output to the chosen destination.

## Checks before returning

- Every returned person was matched on full name at the given domain; ambiguous matches are flagged, never silently picked.
- Email status is copied exactly as returned: verified, catch-all and unknown are never relabelled as valid, and no invalid address appears as a contact email.
- Rows where the enriched company differs from the input company are flagged as moved, not overwritten.
- Every input row appears in the output exactly once, including not found and no email rows, so counts add up to the input total.
- get_usage is re-checked before each batch on long lists, and the run stops cleanly with a resume point on 402 free_records_exhausted or 429 weekly_limit.

## Output

One table (chat, CSV or a new tab in the user's sheet) with columns: input_name, input_company, matched_name, current_title, current_company, domain, work_email, email_status, confidence, checked_at, match_note, row_status. row_status is one of verified, catch-all, unknown, no email, not found, ambiguous or moved. Verified rows come first. Catch-all rows keep their email and are marked send at lower volume. Unknown rows keep their email but are marked unconfirmed, do not send without review. Invalid emails are never returned as contact emails. A short summary line reports counts per status.

## Example

> Here are 30 people I met at a RevOps meetup, name and company only. Find their work emails and put them in my Google Sheet next to each name. First one is Maya Chen at Northwind Analytics.

```
✓ 30 names · 30 domains confirmed · ✓ 6,480 search records left this window
✓ 27 found by name · 2 ambiguous (flagged) · 1 not found
✓ 22 verified · 3 catch-all · 1 unknown · 1 no email · 2 moved company
→ Columns added to sheet "Meetup contacts", 30 rows
```

Illustrative output.

## Cost and limits

search_people uses 1 search record per person returned, so each lookup costs up to the page size (25 by default) and an empty search costs 0 records but still 1 request. enrich_person uses 1 enrichment record per matched person, and its emails are already verified at no extra charge. Records count only when data comes back. The skill calls get_usage first (free), narrows searches with title or function to keep pages small, caps paging at two pages per person, and splits long lists across five-hour windows. It works on the free plan's 1,000 one-time records and uses no scrape units.

## What it doesn't do

- Does not guess email addresses from name patterns or present unconfirmed addresses as verified.
- Does not pick between two people with the same name; it flags the row for the user to decide.
- Does not send email or write to a CRM; it hands back the data for the user's own tools.
