# Video 2 — AI UAT Engineer Step-by-Step Functionality Walkthrough

**Target length:** 5:00–7:00
**Format:** 16:9, 1080p screen walkthrough
**Audience:** New users, QA managers, testers, company admins, demo viewers
**Purpose:** Show exactly how to use the product from login through release decision.

## Suggested chapter index
1. Sign in or create company
2. Understand user roles
3. Add team members
4. Register a product
5. Add credentials if required
6. Start UAT
7. Understand run statuses
8. Review results
9. Review execution and evidence
10. Re-run and release review

## Scene-by-scene walkthrough

### Chapter 1 — Sign in / Register | 0:00–0:35
**Screen:** `/login`
**Action:** Show email/password login, Google/GitHub SSO when enabled, and Create workspace.
**Voice-over:**
“Existing users sign in with their company account or an enabled SSO provider. A new company creates a workspace using company name, optional slug, work email and a strong password. The first account becomes Company Admin.”

**Status explanation:**
- `Please wait…` — authentication or registration request is being processed.
- Login error — credentials, backend availability or SSO configuration needs attention.

### Chapter 2 — Roles | 0:35–1:00
**Screen:** Company Setup → Team.
**Voice-over:**
“Company Admin manages users and can assign Company Admin, QA Manager, Tester or Viewer. Company Admin, QA Manager and Tester can start UAT. Viewer is results-only. Platform Admin is a separate platform-wide role.”

### Chapter 3 — Add a team member | 1:00–1:25
**Screen:** Company Setup → Team.
**Action:** Enter email, temporary password, role, click Add team member.
**Voice-over:**
“Add team members from Company Setup. Select the minimum role required. Active users can work in the company workspace; inactive users cannot access it.”

**Status explanation:**
- `ACTIVE` — user is enabled.
- `INACTIVE` — user is disabled.

### Chapter 4 — Register product | 1:25–2:00
**Screen:** Company Setup → Products.
**Action:** Enter Product name, Target URL, Environment, Authentication.
**Voice-over:**
“A UAT mission must run against a registered product target. Add the product name and approved URL, then choose UAT, QA or DEV. Set authentication to NONE, USERNAME_PASSWORD, API_TOKEN or OIDC depending on the application.”

**Status explanation:**
- `ACTIVE` — product appears in Start UAT selection.
- `INACTIVE` — product is retained but cannot be selected for a new mission.

### Chapter 5 — Credentials | 2:00–2:30
**Screen:** Company Setup → Credentials.
**Voice-over:**
“If the product requires authentication, attach a credential profile to that product. Secrets should never be displayed in a video or stored in documentation. The runtime retrieves the configured profile only when the mission needs it.”

**Recording rule:** Blur all usernames, passwords, tokens, cookies and OAuth client secrets.

### Chapter 6 — Start UAT | 2:30–3:20
**Screen:** `/mission`
**Action sequence:**
1. Select product/environment.
2. Upload requirement file.
3. Confirm readiness.
4. Click Start UAT.

**Voice-over:**
“The Start UAT page intentionally has four steps. First select the registered target. Second upload the requirement as TXT, Markdown, DOCX or PDF. Third confirm that company, target and requirement are resolved. When the page says READY, start the mission.”

**Expected timing:**
- Upload and mission creation: usually seconds.
- AI analysis and test planning: commonly tens of seconds to a few minutes depending on requirement size and model latency.
- Browser execution: depends on number of tests, target response time and retries.
- Final report: appears after execution and release evaluation complete.

Do not promise a fixed completion time; show the current stage instead.

### Chapter 7 — Run statuses | 3:20–4:05
**Screen:** Results page, run status card.
**Voice-over:**
“After starting, the platform redirects to Results and refreshes automatically. QUEUED means the mission is waiting to run. RUNNING means one of the analysis or execution stages is active. COMPLETED means the mission reached a final result. FAILED means execution stopped before completion and the error message needs review.”

**Status dictionary:**
- `QUEUED` — accepted, waiting for processing.
- `RUNNING` — currently processing.
- `COMPLETED` — processing finished; inspect decision and evidence.
- `FAILED` — mission stopped unexpectedly.
- `PASS` — individual execution passed.
- `FAIL` — individual execution failed.
- `APPROVED` / `READY` — release evidence supports readiness.
- `BLOCKED` — release should not proceed until issues are resolved.
- `PROCESSING` / `PENDING` — final decision is not ready yet.

### Chapter 8 — Results | 4:05–4:45
**Screen:** `/dashboard?run=...`
**Voice-over:**
“Results is decision-first. Step one shows run status and current stage. Step two shows the release decision, passed and failed tests, and requirement coverage. Step three highlights what needs attention. Step four provides downloadable XLSX and JSON reports.”

**Action:** Show Download report and Advanced technical details.

### Chapter 9 — Execution and evidence | 4:45–5:30
**Screen:** `/execution`
**Voice-over:**
“Execution Details is for diagnosis. It shows total tests, pass rate, the latest browser execution, failures, duration and diagnostic messages. Open evidence only when you need to verify a pass or understand a failure.”

**Action:** Open one screenshot evidence in a new tab.

### Chapter 10 — Re-run and release review | 5:30–6:10
**Screen:** Results → Re-run requirement, then Release page.
**Voice-over:**
“After fixing a product issue, re-run the same requirement to create a new run and fresh evidence. Release governance combines test outcomes with policy, risk, SLO and approval controls. AI can recommend, but governance and human authority remain the final boundary.”

### Chapter 11 — Finish | 6:10–6:25
**Screen:** How It Works roadmap.
**Voice-over:**
“That is the complete daily workflow: configure once, upload the requirement, let the specialist workforce execute, inspect evidence, and make the release decision.”

## Screen capture checklist
- Login / registration
- Company Setup: Team
- Company Setup: Products
- Company Setup: Credentials
- Start UAT four steps
- Results: status
- Results: release decision
- Results: report download
- Execution: pass/fail and evidence
- Re-run
- Release governance

## Safety and demo-data rule
Use a dedicated demo tenant and synthetic product data. Never record production credentials, personal data, raw cookies, API tokens, secrets or private customer URLs.
