# Validation and evidence

[← Project overview](../README.md) · [Architecture](architecture.md) · [Aggregate JSON](../evidence/metrics.json)

Reviewed on 2026-09-29 against source revision `e965d0a8d44a`. Only aggregate values are published. Raw CI logs, vendor responses, customer rows, hosted identifiers and private repository links are excluded.

## Current-source CI evidence

The successful push workflow on **2026-09-11** ran against the inspected revision. Its `isolation-spike` job name is historical: the current workflow invokes the **full configured Vitest suite**, not just isolation tests.

| Check | Observed result | Denominator |
| --- | --- | --- |
| Main Vitest job | 1,077 passed; 21 skipped | 1,098 test cases across 91 files |
| Auth-simulation job | 41 passed | 41 test cases across 5 files |
| Migration re-run | At head; ledger and probes agree | 92 ledger rows |

The auth job overlaps the main suite; these totals must not be added as unique cases. The 21 skipped main-suite cases include authenticated-role grant/policy checks; the separate auth-simulation job exercises the auth test directory in an appropriate environment. A skipped case is not a pass.

The workflow also completed TypeScript checking, the Next.js build, architectural/security lint commands, hero-footprint and perceptual checks, and a browser-grant sweep. The migration job applied migrations, reapplied them, then checked head probes. File-presence checks alone would not detect an old function body restored by rerunning an earlier migration; content/consequence probes address that failure mode.

The inspected tree contains 91 Vitest test files, two Playwright smoke spec files, and 92 migration files. The latest push workflow did **not** run the optional hosted browser-smoke job, which is dispatch-only. Installing Chromium for perceptual checks is not evidence that hosted UI smoke ran. CI used PostgreSQL 16; the documented local Docker environment uses PostgreSQL 17. No fresh full-suite or hosted run was initiated during showcase preparation.

## Historical product and vendor proofs

These are recorded acceptance reports, not fresh measurements performed for the showcase.

- **Publication, 2026-08-23:** `docs/gate-stage1-acceptance.md` records one generated draft, approval through the browser, live WordPress publication and saved receipt. Nine Chromium checks passed against a locally running application using a hosted database. This is a local-web/hosted-data acceptance path, not nine independent publications. The referenced screenshots are not included in the inspected snapshot.
- **Measurement and refresh, status 2026-09-07:** `docs/stage3-acceptance.md` records database-worker/vendor proof for GSC/GA4 imports, recurring imports, scheduled rank checks and an approved WordPress refresh. It does not provide a controlled quality benchmark or a reliability denominator, so none is invented here. Draft-ready email remained held for its delivery integration.
- **Paid discovery, 2026-09-10:** the worker runbook records a controlled hosted run with the global scheduler disabled, held jobs with no usage before release, budget blocking with zero new usage, and pause/resume behavior. Source toggles and temporary overrides were reset afterward. This proves specific controls, not broad rollout.
- **Internal-link planning, 2026-09-11:** two controlled runs produced first a `no_data` result from one source, then six review-only proposals across three source pages. The second run is not presented alone as a quality score. No WordPress mutation occurred; recurring planning and temporary entitlement were disabled after the proof. Six proposals are not six independently validated improvements.

Older retained logs include a 368-test passing run and a 365-test run with 55 failures. Those earlier snapshots are not the current CI cohort, are not combined with current totals, and do not describe the newer customer/measurement workflows.

## Reproducible public examples

[Run instructions](../examples/README.md) cover six synthetic source-recovery cases and eight synthetic conversion-evidence cases. Their documented output is verified locally. They use invented inputs, no external calls and no database. They demonstrate selected control-flow decisions only; they do not evaluate model accuracy, tenant isolation or end-to-end product quality.

## Limits

No defensible ranking lift, traffic growth, conversion increase, user scale or time saving is claimed. Tests with vendor doubles validate contracts and decisions; recorded live proofs validate specific integrations at specific times. Neither establishes ongoing provider availability or factual correctness of generated content.

A safe product demo, reviewed screenshots from synthetic data, independent content-quality evaluation, and a repeatable current hosted acceptance run remain useful presentation gaps. The source stays private; further evidence can be reviewed in an interview after disclosure review.
