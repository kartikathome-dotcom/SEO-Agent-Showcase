/**
 * Illustrative source-recovery gate, newly written for this showcase.
 * Not production code: risk and winnability are supplied, not calculated.
 * No network, LLM, database, credentials, or publication side effects.
 */
import assert from 'node:assert/strict';

export function assess(results, { strictRisk = false, classification = 'clear', score = 60 } = {}) {
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error('Score must be between 0 and 100');
  }
  if (!['clear', 'flagged', 'failed', 'pending'].includes(classification)) {
    throw new Error('Unknown classification');
  }
  const ranks = new Set();
  for (const row of results) {
    if (!Number.isInteger(row.absoluteRank) || row.absoluteRank < 1 || ranks.has(row.absoluteRank)) {
      throw new Error('Ranks must be positive and unique');
    }
    ranks.add(row.absoluteRank);
    if (typeof row.readable !== 'boolean' || !['organic', 'feature'].includes(row.kind)) {
      throw new Error('Invalid result shape');
    }
  }
  // Assign organic position BEFORE removing unreadable pages.
  const organic = [...results]
    .sort((a, b) => a.absoluteRank - b.absoluteRank)
    .filter(row => row.kind === 'organic')
    .map((row, index) => ({ ...row, position: index + 1 }));
  const top = organic.filter(row => row.position <= 10);
  const recovered = top.filter(row => row.readable).length;
  const evidence = `${recovered}/10`;
  if (classification === 'pending') return { evidence, status: 'blocked', reason: 'classification pending' };
  if (strictRisk && ['flagged', 'failed'].includes(classification)) {
    return { evidence, status: 'parked', reason: 'risk gate' };
  }
  if (recovered < 5) return { evidence, status: 'parked', reason: 'insufficient sources' };
  if (score < 40) return { evidence, status: 'parked', reason: 'low winnability' };
  return { evidence, status: recovered < 8 ? 'degraded' : 'ready', reason: 'continue' };
}

// Ten organic slots at absolute ranks 2–15; rank 16 is contrast only.
// Synthetic feature rows explain the gaps. No real search records are used.
function fixture(count) {
  const organicRanks = [2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 16];
  return Array.from({ length: 16 }, (_, index) => {
    const absoluteRank = index + 1;
    const ordinal = organicRanks.indexOf(absoluteRank);
    return {
      absoluteRank,
      kind: ordinal < 0 ? 'feature' : 'organic',
      readable: ordinal >= 0 && (ordinal < count || ordinal === 10),
    };
  });
}

const cases = [
  { name: 'normal', count: 8, options: {}, expected: ['8/10', 'ready', 'continue'] },
  { name: 'rank gaps', count: 7, options: {}, expected: ['7/10', 'degraded', 'continue'] },
  { name: 'too few', count: 4, options: {}, expected: ['4/10', 'parked', 'insufficient sources'] },
  { name: 'strict risk', count: 10, options: { strictRisk: true, classification: 'flagged' }, expected: ['10/10', 'parked', 'risk gate'] },
  { name: 'low score', count: 10, options: { score: 39 }, expected: ['10/10', 'parked', 'low winnability'] },
  { name: 'pending', count: 10, options: { classification: 'pending' }, expected: ['10/10', 'blocked', 'classification pending'] },
];

for (const scenario of cases) {
  const result = assess(fixture(scenario.count), scenario.options);
  assert.deepEqual([result.evidence, result.status, result.reason], scenario.expected);
  console.log(`${scenario.name}: ${result.evidence} | ${result.status} | ${result.reason}`);
}
assert.throws(() => assess([{ absoluteRank: 0, readable: true, kind: 'organic' }]), /Ranks/);
assert.throws(() => assess([
  { absoluteRank: 1, readable: true, kind: 'organic' },
  { absoluteRank: 1, readable: true, kind: 'organic' },
]), /Ranks/);
console.log('PASS: 6 synthetic scenarios and invalid-rank checks');
