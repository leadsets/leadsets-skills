---
name: your-skill-id
description: "What the skill does and when an agent should use it, in third person, 200 to 450 characters. End with a sentence like: Use when someone asks to ..."
license: MIT
metadata:
  title: "Your skill title"
  category: "Prospecting"
  outcome: "Find new prospects"
  tools: [search_people, enrich_person]
  version: "1.0"
  author: "Your name or GitHub handle"
  homepage: https://www.leadsets.ai/skills
---

# Your skill title

Two or three sentences: what it produces and who it is for.

**Category:** Prospecting · **Outcome:** Find new prospects · **Tools:** `search_people`, `enrich_person`

## Requirements

- The Leadsets MCP server connected to your agent: `https://mcp.leadsets.ai` ([setup](https://www.leadsets.ai/docs/mcp)), or a Leadsets API key for the REST API.
- A Leadsets account. The free plan includes 1,000 records, no card ([get a key](https://www.leadsets.ai/signup)).

## When to use

- A request phrasing that should trigger this skill
- Another situation where it applies

## What you give it

- **Input name**: what it is, and its default.
- **Another input** (optional): what it is.

## Steps

1. **Check limits** · `get_usage`
   Confirm there are enough records left for the run before spending any.
2. **Next step** · `search_people`
   Exactly what to call, with which arguments, and what to check before moving on.

## Checks before returning

- A check the agent runs before handing back results

## Output

The exact shape of the result: columns or fields, and how catch-all, unknown and invalid emails are handled.

## Example

> A realistic request someone would type

```
✓ What happened  ·  ✓ counts
→ Where the result went
```

Illustrative output.

## Cost and limits

How records, requests and scrape units are spent, and how the skill stays inside limits.

## What it doesn't do

- Something it deliberately leaves out
