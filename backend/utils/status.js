import { RELEASE_STEPS } from '../config/steps.js';

export function computeStatus(completedSteps) {
  if (!completedSteps || completedSteps.length === 0) {
    return 'planned';
  }
  if (completedSteps.length === RELEASE_STEPS.length) {
    return 'done';
  }
  return 'ongoing';
}
