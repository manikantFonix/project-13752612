'use client';

import { useSyncExternalStore } from 'react';
import {
  getDemoVisible,
  subscribeDemoVisible,
} from '../../lib/demoVisibility';

export function useDemoVisible() {
  return useSyncExternalStore(subscribeDemoVisible, getDemoVisible, getDemoVisible);
}