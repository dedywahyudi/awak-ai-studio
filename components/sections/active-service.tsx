'use client';

import { createContext, useContext, useState } from 'react';
import { Globe, MessageCircle, Workflow } from 'lucide-react';
import { FlipWords } from '@/components/ui/flip-words';

/** Which of the three services the hero headline is showing: 0 AI Chat, 1 Otomatisasi, 2 Solusi Custom. */
const ActiveServiceContext = createContext<number>(0);
const SetActiveServiceContext = createContext<(index: number) => void>(() => {});

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  return (
    <ActiveServiceContext.Provider value={active}>
      <SetActiveServiceContext.Provider value={setActive}>{children}</SetActiveServiceContext.Provider>
    </ActiveServiceContext.Provider>
  );
}

export const useActiveService = () => useContext(ActiveServiceContext);

/** The flipping headline word; tells the hero cards which service is current. */
export function HeroServiceFlip() {
  const setActive = useContext(SetActiveServiceContext);
  return (
    <FlipWords
      words={['AI Chat', 'Otomatisasi', 'Solusi Custom']}
      icons={[MessageCircle, Workflow, Globe]}
      onIndexChange={setActive}
    />
  );
}
