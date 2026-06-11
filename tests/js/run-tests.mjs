/**
 * No-dependency Node.js test runner.
 * Imports physics.test.js then engine.test.js in order.
 * Prints "ok <suite>" on success; exits 1 on first failure.
 */

import { run as runPhysics } from './physics.test.js';
import { run as runEngine } from './engine.test.js';

try {
  runPhysics();
  console.log('ok physics');
} catch (err) {
  console.error('FAIL physics:', err.message);
  process.exit(1);
}

try {
  runEngine();
  console.log('ok engine');
} catch (err) {
  console.error('FAIL engine:', err.message);
  process.exit(1);
}

console.log('All JS tests passed');
