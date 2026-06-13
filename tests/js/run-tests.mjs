/**
 * No-dependency Node.js test runner.
 * Imports each JS suite in dependency order.
 * Prints "ok <suite>" on success; exits 1 on first failure.
 */

import { run as runPhysics } from './physics.test.js';
import { run as runEngine } from './engine.test.js';
import { run as runStaticRelease } from './static-release.test.js';
import { run as runTraceRecorder } from './trace-recorder.test.js';
import { run as runSolver } from './solver.test.js';
import { run as runLevelSolutions } from './level-solutions.test.js';

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

try {
  await runStaticRelease();
  console.log('ok static release');
} catch (err) {
  console.error('FAIL static release:', err.message);
  process.exit(1);
}

try {
  await runTraceRecorder();
  console.log('ok trace recorder');
} catch (err) {
  console.error('FAIL trace recorder:', err.message);
  process.exit(1);
}

try {
  runSolver();
  console.log('ok solver');
} catch (err) {
  console.error('FAIL solver:', err.message);
  process.exit(1);
}

try {
  runLevelSolutions();
  console.log('ok level solutions');
} catch (err) {
  console.error('FAIL level solutions:', err.message);
  process.exit(1);
}

console.log('All JS tests passed');
