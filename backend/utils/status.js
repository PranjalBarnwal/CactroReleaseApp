import { RELEASE_STEPS } from '../config/steps.js';

export function computeStatus(completedSteps) {
  if (!completedSteps || completedSteps.length === 0) {
    return 'planned';
  }
  if (completedSteps.length === 7) {
    return 'done';
  }
  return 'ongoing';
}
