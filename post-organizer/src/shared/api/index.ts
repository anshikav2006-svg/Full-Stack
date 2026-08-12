// This app is frontend-only — no real backend calls are made.
// This module exists as the FSD "api" slot and simulates network latency
// for actions that would normally hit an API (used sparingly for realism).
export function simulateLatency(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
