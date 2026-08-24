import type { RecentClosetItem } from '@/types/closet';
import { useEffect, useState } from 'react';

const SIMULATED_STEPS = [0, 20, 40, 60, 75, 85, 89];

export function useItemProgress(item: RecentClosetItem) {
  const hasServerProgress = typeof item.progress === 'number';
  const [simulatedProgress, setSimulatedProgress] = useState(
    item.status === 'complete' ? 100 : SIMULATED_STEPS[0],
  );

  useEffect(() => {
    if (hasServerProgress) return;
    if (item.status === 'complete') return;
    if (item.status !== 'processing') return;

    let step = 0;
    const interval = setInterval(() => {
      step = Math.min(step + 1, SIMULATED_STEPS.length - 1);
      setSimulatedProgress(SIMULATED_STEPS[step]);
      if (step === SIMULATED_STEPS.length - 1) clearInterval(interval);
    }, 1300);

    return () => clearInterval(interval);
  }, [hasServerProgress, item.status]);

  const resolvedProgress =
    item.status === 'complete'
      ? 100
      : hasServerProgress
        ? item.progress!
        : simulatedProgress;

  return Math.max(0, Math.min(100, resolvedProgress));
}
