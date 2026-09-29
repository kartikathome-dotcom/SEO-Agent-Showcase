# Customer and operator walkthrough

[← Project overview](../README.md) · [Architecture](architecture.md) · [Run examples](../examples/README.md)

This is a **synthetic textual walkthrough** for a fictional bicycle-maintenance business. It describes implemented paths while separating later-stage plans. It is not a screenshot or a claim about a real customer.

## Customer administrator

After the operator provisions the account, the customer admin manages websites and ordinary team members within that tenant. WordPress credentials have an operator-managed setup path. The code includes Google authorization and property-selection flows, subject to deployment configuration and actual account access.

The customer admin inspects an opportunity such as “city bicycle maintenance,” edits or approves it, and reviews resulting keyword evidence. Explicitly enabled paid discovery has spend and pause gates; simply opening the opportunity inbox does not authorize unlimited vendor work.

Research produces a brief or parks the keyword with a reason. Seven readable top-ten organic pages means degraded recovery, not a full source set padded with later pages. Other risk, relevance and winnability checks can further constrain the result.

The generated article appears in the review workspace. The customer admin approves it or sends it back; send-back requires a note. Claim candidates still require human scrutiny. Approval makes the article eligible for publishing subject to the publishing ramp and remaining operational checks.

## Ordinary customer member

Members inspect articles, briefs, measurement and authority worksheets. They can request a keyword or refresh and ask for changes to a proposal. They do not gain draft approval, team administration or cross-tenant diagnostics merely by seeing an object. The application checks role and tenant scope at action time.

## Operator and background execution

Operators manage provisioning, integration support, job diagnostics and recovery. Support actions that duplicate customer-owned decisions use explicit audited paths. The database worker processes eligible jobs; missing credentials, pauses and exhausted budgets produce explainable blocked or missing-data states.

WordPress publication saves a receipt. The current vendor adapter searches by slug and updates an existing post where found, improving retry recovery; operators still investigate ambiguous external failures. Refresh work updates the existing post only through its approved workflow.

## Results and the next decision

With GSC/GA4 connected and sufficient observation history, imports and rank checks populate page-level results. A disconnected analytics account is `missing_integration`; conversion counts without session denominators are `insufficient_data`. Neither becomes “zero conversions.”

A recommendation may prompt a refresh request, research, a new draft and another human review. Customer-reviewed opportunities and recommendations are not automatic retraining or automatic permission to change a live page.

Authority monitoring and link-gap worksheets help prioritize further review. Internal-link planning proposes exact changes against current source content; in the inspected slice it does not apply them to WordPress. Application/revert, landing-page briefs and brand-profile refresh remain later work despite registry entries for those capabilities.
