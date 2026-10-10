import { describe, expect, it, beforeEach } from 'vitest';
import {
  awardXpForCorrectAnswer,
  getRequireXpForErrorJournal,
  getXpState,
  resetXpForTesting,
  setRequireXpForErrorJournal,
  setXpStateForTesting,
  spendXpForErrorJournal,
} from './xp';

beforeEach(() => {
  resetXpForTesting();
});

describe('XP system', () => {
  it('awards +4 XP once per correct answer and keeps balance stable across replays', () => {
    const first = awardXpForCorrectAnswer('attempt-1', 'q-1');
    const second = awardXpForCorrectAnswer('attempt-1', 'q-1');
    const state = getXpState();

    expect(first.amount).toBe(4);
    expect(second.amount).toBe(0);
    expect(state.balance).toBe(4);
    expect(state.transactions.filter((t) => t.sourceId === 'attempt-1:q-1')).toHaveLength(1);
  });

  it('spends only when there is enough XP and accumulates weekly totals within the active cycle', () => {
    setXpStateForTesting({ balance: 100, weeklyEarned: 4, weeklySpent: 0, cycleStart: new Date().toISOString(), cycleEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), transactions: [] });
    const earned = awardXpForCorrectAnswer('attempt-2', 'q-2');
    const spent = spendXpForErrorJournal('ej-1', 20);
    const state = getXpState();

    expect(earned.amount).toBe(4);
    expect(spent.ok).toBe(true);
    expect(state.balance).toBe(84);
    expect(state.weeklyEarned).toBe(8);
    expect(state.weeklySpent).toBe(20);
  });

  it('defaults Error Journal XP enforcement to on and allows free saves when disabled', () => {
    expect(getRequireXpForErrorJournal()).toBe(true);

    setRequireXpForErrorJournal(false);
    expect(getRequireXpForErrorJournal()).toBe(false);

    setXpStateForTesting({ balance: 0, weeklyEarned: 0, weeklySpent: 0, cycleStart: new Date().toISOString(), cycleEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), transactions: [] });
    const result = spendXpForErrorJournal('ej-free', 20);
    expect(result.ok).toBe(false);
    expect(result.insufficient).toBe(true);

    setRequireXpForErrorJournal(true);
    expect(getRequireXpForErrorJournal()).toBe(true);
  });
});
