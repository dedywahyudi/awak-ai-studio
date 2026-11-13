'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// three.js is heavy and needs WebGL: load it in the browser only, after the hero text.
const StudioMachine3D = dynamic(() => import('@/components/ui/studio-machine-3d'), { ssr: false });

/** The 3D "how the studio works" machine for the home hero. Fades in once the first frame is drawn. */
export function HeroMachine({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);

  return (
    <div className={cn('transition-opacity duration-700', ready ? 'opacity-100' : 'opacity-0', className)}>
      <StudioMachine3D embed height="100%" onReady={() => setReady(true)} />
    </div>
  );
}
