/**
 * Newly written illustrative conversion-evidence gate, not production code.
 * Isolates missing-data and denominator handling. No network or database.
 * Production also handles ranking, URL identity, snapshots and confounders.
 */
import assert from 'node:assert/strict';

export function conversionOutcome({ connected, ageDays, current, previous, conversionCountOnly }) {
  if (!current && !previous && conversionCountOnly == null) {
    return connected === false ? 'missing_integration' : 'unknown';
  }
  if (!Number.isFinite(ageDays) || ageDays < 28) return 'insufficient_data';
  if (!current) return 'insufficient_data'; // A count alone has no denominator.
  for (const window of [current, previous].filter(Boolean)) {
    if (!Number.isFinite(window.sessions) || window.sessions < 0 ||
        !Number.isFinite(window.conversions) || window.conversions < 0) {
      throw new Error('Observations must be finite and non-negative');
    }
  }
  if (current.sessions < 20) return 'insufficient_data';
  if (current.conversions === 0) return 'not_converting';
  if (previous && previous.sessions >= 20) {
    const currentRate = current.conversions / current.sessions;
    const previousRate = previous.conversions / previous.sessions;
    if (previous.conversions > 0 && currentRate < previousRate) return 'mixed';
  }
  return 'converting';
}

const cases = [
  ['disconnected', { connected: false }, 'missing_integration'],
  ['no observations', { connected: true }, 'unknown'],
  ['count without sessions', { connected: true, ageDays: 45, conversionCountOnly: 4 }, 'insufficient_data'],
  ['too young', { ageDays: 7, current: { sessions: 100, conversions: 3 } }, 'insufficient_data'],
  ['too few sessions', { ageDays: 45, current: { sessions: 10, conversions: 0 } }, 'insufficient_data'],
  ['measured zero', { ageDays: 45, current: { sessions: 100, conversions: 0 } }, 'not_converting'],
  ['positive evidence', { ageDays: 45, current: { sessions: 100, conversions: 4 } }, 'converting'],
  ['lower conversion rate', { ageDays: 45, current: { sessions: 100, conversions: 2 }, previous: { sessions: 100, conversions: 4 } }, 'mixed'],
];
for (const [name, input, expected] of cases) {
  const actual = conversionOutcome(input);
  assert.equal(actual, expected);
  console.log(`${name}: ${actual}`);
}
assert.throws(() => conversionOutcome({ ageDays: 45, current: { sessions: -1, conversions: 0 } }), /non-negative/);
console.log('PASS: 8 synthetic cases and invalid-observation check');
