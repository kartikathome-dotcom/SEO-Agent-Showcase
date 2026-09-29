# Run the engineering examples

[← Project overview](../README.md) · [Validation](../docs/validation.md)

Two newly written **illustrative examples**, not production excerpts. All inputs are invented. Neither makes network calls or needs credentials, packages or a database. Use **Node.js 22 or later**, from the repository root.

## Missing analytics is not zero performance

[View code](outcome_gate.mjs)

```sh
node examples/outcome_gate.mjs
```

Verified expected output:

```text
disconnected: missing_integration
no observations: unknown
count without sessions: insufficient_data
too young: insufficient_data
too few sessions: insufficient_data
measured zero: not_converting
positive evidence: converting
lower conversion rate: mixed
PASS: 8 synthetic cases and invalid-observation check
```

This isolates the conversion evidence branch: no observations, missing integration, insufficient age/session evidence, measured zero and rate comparison. The 28-day and 20-session floors reflect current provisional product rules, not a significance test. Production also supports explicit rates, ranking evidence, URL identity, snapshot windows, source status and confounders; none is reproduced here. A “converting” label does not attribute conversions causally to the application.

## Preserve organic search position

[View code](source_gate.mjs)

```sh
node examples/source_gate.mjs
```

Verified expected output:

```text
normal: 8/10 | ready | continue
rank gaps: 7/10 | degraded | continue
too few: 4/10 | parked | insufficient sources
strict risk: 10/10 | parked | risk gate
low score: 10/10 | parked | low winnability
pending: 10/10 | blocked | classification pending
PASS: 6 synthetic scenarios and invalid-rank checks
```

The fixtures contain ten organic results interspersed with five search features, followed by one readable contrast result. Organic position is assigned before failed fetches are removed. A readable result outside the top-ten band cannot replace missing evidence inside it. Scores and risk states are hand-authored inputs; production computes them separately and adds a semantic-relevance gate that this example omits.

Assertions pin the documented scenarios and reject selected malformed inputs. These demonstrations are not a replacement for the private application's database, vendor and browser tests.
