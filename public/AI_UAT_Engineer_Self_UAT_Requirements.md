# AI UAT Engineer — Self-UAT Product Requirement Specification

Version: 1.0  
Date: 22 August 2026  
Purpose: Upload this requirement into AI UAT Engineer and use the product to test itself end-to-end.

## Product Vision
AI UAT Engineer shall convert business requirements into evidence-backed UAT and a governed release recommendation. AI reasons; Java controls state and policy; Playwright executes; evidence supports the release decision; humans retain release authority.

## Core Business Flow
1. Register company / establish tenant.
2. Create and manage UAT team.
3. Register product/environment and target URL.
4. Configure secure runtime access.
5. Upload requirement and create mission.
6. Analyze requirement with tenant-safe RAG/product context.
7. Calculate risk/change/regression intelligence.
8. Select the smallest useful bounded AI mission workforce.
9. Design functional, negative, boundary and data tests.
10. Generate/prepare automation.
11. Execute supported UI/API tests with Playwright.
12. Capture durable evidence and traceability.
13. Present results and diagnostics.
14. Apply release governance.
15. Return READY/BLOCKED while retaining human release authority.

## Functional Requirements
- FR-001 Authentication: valid active users can sign in; invalid credentials are rejected with product-friendly validation.
- FR-002 SSO: Google/GitHub SSO is available only when configured and maps only to an existing active user.
- FR-003 Password recovery: reset tokens are single-use and sensitive values are never exposed.
- FR-004 Tenant isolation: Company A cannot access Company B resources by changing identifiers.
- FR-005 Company users: Company Admin can manage permitted tenant users and roles with admin safeguards.
- FR-006 Product registration: Company Admin can register a product/environment with a valid target URL and the product remains tenant-scoped.
- FR-007 Product validation: invalid/missing product data is rejected without partial persistence.
- FR-008 Credentials: runtime credentials are referenced securely and raw secrets are never returned to the browser/reporting APIs.
- FR-009 Mission creation: an authorized tenant user can start UAT against a registered product and receive a persisted run identifier.
- FR-010 Requirement intelligence: uploaded requirements are analyzed into structured, testable behavior and risks.
- FR-011 RAG: relevant tenant-safe product knowledge may ground requirement analysis.
- FR-012 Risk intelligence: governed risk/change/regression scoring can influence mission planning and release decisions.
- FR-013 AI workforce catalog: the platform exposes 100 canonical specialized UAT worker capabilities.
- FR-014 AI workforce planning: a mission selects only a bounded relevant subset; all 100 workers do not run for every mission.
- FR-015 Test design: generated tests cover relevant positive, negative, boundary and data cases with observable expected results.
- FR-016 Automation: supported tests can be converted into executable UI/API automation.
- FR-017 Execution: Playwright/browser executions record status, duration and traceable identifiers.
- FR-018 Diagnostics/healing: failure diagnosis is available and bounded healing cannot silently convert an unverified failure into PASS.
- FR-019 Evidence: Open Evidence returns the correct stored screenshot/content through a stable API endpoint.
- FR-020 Evidence durability: evidence remains retrievable after normal API container redeployment.
- FR-021 Results: company users can review persisted mission/test status, duration, failures and evidence without cross-tenant exposure.
- FR-022 Release governance: evidence/risk/quality policy produces a governed READY/BLOCKED state or equivalent.
- FR-023 Human authority: AI may recommend release readiness but cannot bypass human production-release authority.
- FR-024 Integrations: authorized HTTPS/webhook endpoints can subscribe to UAT/release events and delivery history is visible.
- FR-025 Integration resilience: webhook delivery failure is recorded without corrupting mission/result state.
- FR-026 Company UX: authenticated company users use a compact left-sidebar workflow rather than repeated static header/tray content.
- FR-027 Platform Admin UX: PLATFORM_ADMIN/SUPER_ADMIN uses one Platform Dashboard and does not enter tenant UAT workflow pages.
- FR-028 Platform oversight: the dashboard shows companies, users, enrolled products and platform-wide activity.
- FR-029 Platform operations: the dashboard surfaces executions, failures and health/operational status.
- FR-030 Navigation: static account/session context lives in compact navigation/account UI instead of repeated business-page cards.
- FR-031 How It Works: the public explainer represents the current product journey through M50.
- FR-032 Health: the deployed backend exposes an HTTP 200 actuator health response with status UP when healthy.
- FR-033 Backend CI/CD: production backend deployment is controlled from main using an immutable commit/image identity.
- FR-034 Frontend CI/CD: React/nginx/UI deployment health is validated independently from backend availability.
- FR-035 Persistence: PostgreSQL tenant/run/evidence metadata survives normal container replacement.
- FR-036 Secret safety: passwords, OAuth secrets, API credentials and raw reset tokens never appear in normal reporting/logs.
- FR-037 Audit: authentication/SSO/governance events produce security-safe audit metadata.
- FR-038 Performance: governed load/SLO checks can feed quality/release evaluation.
- FR-039 Traceability: requirement → test case → execution → evidence → release decision remains traceable.
- FR-040 Self-UAT: this document itself can be uploaded against a registered AI UAT Engineer environment and should drive analysis, tests, execution, evidence and a governed release recommendation.

## Non-Functional Requirements
- NFR-001 Security: protected business APIs require authenticated and authorized access.
- NFR-002 Isolation: no cross-tenant data/execution leakage.
- NFR-003 Availability: healthy API avoids restart loops and exposes reliable health diagnostics.
- NFR-004 Durability: audit-relevant company/product/run/evidence data survives normal redeployment.
- NFR-005 Usability: screens prioritize actionable/dynamic content, compact spacing and clear validation.
- NFR-006 Responsive UI: sidebar/navigation and core flows remain usable on smaller viewports.
- NFR-007 Observability: failures provide actionable diagnostics without secret leakage.
- NFR-008 Determinism: authorization, tenant resolution, policy and release-control state are deterministic even when AI reasons.
- NFR-009 Bounded AI: agent selection/retries/healing are bounded.
- NFR-010 Traceability: production artifacts/deployments are traceable to source commit/version.

## Critical Self-UAT Scenarios
1. Login and role routing for Company Admin and Platform Admin.
2. Register AI UAT Engineer as a company product/environment.
3. Upload this requirement and create a persisted mission.
4. Verify bounded AI workforce selection.
5. Generate requirement-linked tests.
6. Execute supported browser flows.
7. Open evidence and receive HTTP 200 content.
8. Redeploy/restart API and verify evidence remains available.
9. Attempt cross-tenant resource/evidence access and verify denial.
10. Verify Platform Admin sees company/user/product/execution/failure/health activity from one dashboard.
11. Create a critical failing path and verify release is BLOCKED with reasons/evidence.
12. Create a qualifying passing path and verify READY can be recommended while human authority remains.
13. Verify frontend health is distinguishable from backend 502/unavailability.
14. Inspect UI/API/logs for raw secret leakage.
15. Trace a completed mission from requirement to final release state.

## M1–M50 Capability Roadmap
- M1–M20: core UAT, RAG, automation, execution, multi-tenant foundation.
- M21–M30: Super Admin/company administration, authorization hardening, security/audit, integrations, webhooks, release approval and platform analytics.
- M31–M34: 100-agent workforce foundation and risk/change/flaky/regression intelligence.
- M35–M38: enterprise/tenant integrations and delivery planning.
- M39–M42: governance, compliance, approvals and audit expansion.
- M43–M46: quotas, scale, recovery, observability and SLO guardrails.
- M47–M50: multi-agent release intelligence, prediction/learning, self-UAT and autonomous release gating while preserving human release authority.

## Release Acceptance Gate
- All applicable P0 requirements pass or have an explicitly approved exception.
- No unresolved cross-tenant security defect exists.
- Authentication, product registration, mission creation, execution and evidence retrieval work end to end.
- Critical evidence required for release review is retrievable and durable.
- Platform Admin oversight accurately reflects tenant activity without tenant workflow navigation.
- No raw secret leakage exists in UI, API payloads, logs or evidence metadata.
- AI recommendations do not bypass deterministic authorization or human release authority.
- Backend and frontend production health remain independently observable.
