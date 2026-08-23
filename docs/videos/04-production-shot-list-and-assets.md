# AI UAT Engineer — Video Production Shot List & Asset Plan

This document converts the three approved video scripts into a practical recording/editing checklist.

## Global production standard
- Canvas: 1920×1080, 16:9, 30 fps.
- Browser zoom: 100%; hide bookmarks/personal browser data.
- Use production-like demo data only; never expose passwords, tokens, cookies, OAuth secrets, SSH keys or real customer data.
- Keep mouse movement deliberate. Pause 1–2 seconds before and after every important click.
- Record each UI sequence as an independent clip so failed takes can be replaced without re-recording the entire video.
- Use subtle zoom/crop in editing rather than rapid transitions.
- Status colors/text must remain readable; do not rely on color alone.
- Every product claim should match the current M1–M100 implementation and public documentation.

# Video 1 — Product Overview
Target final duration: 2:30–3:00.

| Clip | Time | Record | Overlay / edit |
|---|---:|---|---|
| V1-01 | 0:00–0:12 | Public landing/login page | Title: `AI UAT Engineer` + `Requirement → Release Confidence` |
| V1-02 | 0:12–0:30 | How It Works overview visual | Highlight requirement, workforce, execution, evidence, release decision |
| V1-03 | 0:30–0:47 | Product registration/setup screen | Callout: `Connect the product under test` |
| V1-04 | 0:47–1:05 | Start UAT / requirement input | Callout: `Describe or upload the requirement` |
| V1-05 | 1:05–1:25 | Agent/workforce view | `100-agent catalog • bounded specialists per mission` |
| V1-06 | 1:25–1:45 | Execution Center | Show pass/fail, duration, diagnosis |
| V1-07 | 1:45–2:02 | Evidence view | Open one safe screenshot/evidence item |
| V1-08 | 2:02–2:18 | Results/release decision | Emphasize evidence-backed READY/BLOCKED recommendation |
| V1-09 | 2:18–2:38 | M1–M100 roadmap | Slow pan across roadmap phases |
| V1-10 | 2:38–2:55 | Landing/CTA | `Build UAT capacity with an AI workforce` |

## Video 1 thumbnail
Headline: **Hire an AI UAT Workforce**
Subhead: **Requirement → Tests → Evidence → Release**
Visual composition: product dashboard on right; simple 3-node flow on left; small `M1–M100` badge.

# Video 2 — Step-by-Step Functionality
Target final duration: 5:00–7:00.

| Clip | Chapter | Record | Important explanation |
|---|---|---|---|
| V2-01 | Sign in | Login page | Email/password and supported SSO paths; no demo credentials shown |
| V2-02 | Company | Registration/onboarding | Explain tenant/company boundary |
| V2-03 | Roles | User/team management | Explain Platform Admin, Company Admin and operational users based on UI availability |
| V2-04 | Product | Add/register product | Name, target URL/environment and ownership |
| V2-05 | Credentials | Product credential configuration | Explain secret handling; never reveal actual values |
| V2-06 | Requirement | Start UAT | Enter/upload requirement and choose product |
| V2-07 | Workforce | Agent plan | Explain specialist selection and bounded mission workforce |
| V2-08 | Running | Run/mission progress | Explain QUEUED/RUNNING-style progress exactly as shown in current UI |
| V2-09 | Results | Results page | Explain pass/fail and coverage/diagnostic information |
| V2-10 | Execution | Execution Details | Total, passed, failed, pass rate, latest execution |
| V2-11 | Evidence | Evidence list | Open screenshot safely; explain audit value |
| V2-12 | Decision | Release/governance screen | Explain recommendation versus human/policy authority |
| V2-13 | Retry | Re-run failed/changed scope | Explain why focused reruns reduce wasted execution |
| V2-14 | End | Roadmap/How It Works | Point viewers to documentation and architecture |

## Status narration rule
Do not invent status names in narration. Before recording, read the exact status shown by the deployed UI/API and describe it in plain language. Example structure: `RUNNING — agents are actively processing or executing this mission.`

## Video 2 thumbnail
Headline: **AI UAT Engineer — Full Walkthrough**
Subhead: **Setup to Release Decision**
Visual: numbered 1→6 flow with Login, Product, Requirement, Agents, Evidence, Release.

# Video 3 — Market View + How It Works
Target final duration: 3:30–4:30.

| Clip | Time | Record / asset | Overlay / edit |
|---|---:|---|---|
| V3-01 | 0:00–0:20 | Pricing market graph | `AI agents are becoming a workforce category` |
| V3-02 | 0:20–0:45 | Market/adoption cards | Keep source names visible in description/end card |
| V3-03 | 0:45–1:10 | Pricing page | Explain agent-day, monthly and annual packaging |
| V3-04 | 1:10–1:35 | How It Works product flow | Requirement → AI/RAG → workforce → execution → evidence |
| V3-05 | 1:35–2:05 | Architecture visual | React/Nginx → Spring Boot/Spring AI → PostgreSQL/pgvector → Playwright/evidence |
| V3-06 | 2:05–2:30 | Workforce/roadmap | Explain bounded 100-agent catalog rather than uncontrolled parallelism |
| V3-07 | 2:30–2:55 | Governance/release view | Human authority, policy gates and audit trail |
| V3-08 | 2:55–3:25 | M1–M100 roadmap | Foundation → intelligence → autonomy governance |
| V3-09 | 3:25–3:55 | Pricing + landing CTA | Position as capacity augmentation for UAT/release teams |
| V3-10 | 3:55–4:10 | End card | Product URL + `AI UAT Engineer` |

## Video 3 thumbnail
Headline: **The AI Agent Workforce for UAT?**
Subhead: **Market • Architecture • Pricing**
Visual: market curve on left, AI UAT product flow on right.

# Recording order
Record shared clips once and reuse them: landing/login, How It Works overview, roadmap, pricing, workforce, execution and evidence. Then record Video 2-specific onboarding clips. This minimizes UI drift between videos.

# Asset checklist
1. Clean product logo/wordmark from the live UI.
2. 1920×1080 landing/login capture.
3. How It Works overview, architecture and roadmap captures.
4. Pricing/market graph capture.
5. Product setup capture using demo-safe data.
6. Start UAT requirement capture.
7. Workforce/agent-selection capture.
8. Execution Center capture with at least one pass and one safe failure example.
9. Evidence screenshot with no sensitive data.
10. Release/governance decision capture.
11. Three thumbnails using the approved headlines above.
12. End card: `AI UAT Engineer • ai-uat.duckdns.org`.

# Editing QA checklist
- No secret or personal data visible frame-by-frame.
- All UI labels match the deployed version.
- Voiceover matches what is visible on screen.
- No claim that 100 agents always execute simultaneously; say catalog/capacity and bounded mission workforce.
- No claim that AI unilaterally releases production when human/policy gates apply.
- Market numbers are sourced and dates are stated.
- Captions enabled and manually reviewed.
- Final audio normalized consistently across all three videos.
