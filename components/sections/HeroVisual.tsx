'use client';

import { Badge } from '@/components/ui/Badge';
import { useActiveService } from '@/components/sections/active-service';
import { cn } from '@/lib/utils';
import { ArrowRight, Bell, Database, FileText, Globe, MessageCircle, Plug, Send, Smartphone, UserCheck, Workflow, type LucideIcon } from 'lucide-react';

const chatFlow = [
  { icon: MessageCircle, label: 'Pelanggan bertanya' },
  { icon: Database, label: 'Dijawab dari data Anda' },
  { icon: UserCheck, label: 'Diteruskan ke tim bila perlu' },
];

const flow = [
  { icon: Bell, label: 'Lead masuk' },
  { icon: FileText, label: 'Penawaran dibuat' },
  { icon: Send, label: 'Anda setujui, terkirim' },
];

const customTypes = [
  { icon: Globe, label: 'Web app' },
  { icon: Smartphone, label: 'Aplikasi mobile' },
  { icon: Plug, label: 'Integrasi sistem' },
];

/** Card surface; the card of the service the headline is showing gets the featured look. */
const cardClass = (active: boolean) =>
  cn(
    'flex flex-col gap-3 rounded-card border p-5 transition-colors duration-300',
    active ? 'border-accent-ring bg-featured' : 'border-line bg-card',
  );

function FlowCard({
  icon: Icon,
  title,
  steps,
  tone = 'blue',
  active = false,
}: {
  icon: LucideIcon;
  title: string;
  steps: { icon: LucideIcon; label: string }[];
  /** 'grey' = raised grey chips with white text; 'blue' = soft blue chips. */
  tone?: 'blue' | 'grey';
  active?: boolean;
}) {
  return (
    <div className={cardClass(active)}>
      <div className="flex items-center gap-2 text-sm font-bold text-strong">
        <Icon size={18} className="text-link" aria-hidden="true" />
        <span className="font-display">{title}</span>
      </div>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-body">
        {steps.map(({ icon: StepIcon, label }, i) => (
          <li key={label} className="flex items-center gap-2">
            <Badge tone={tone === 'grey' ? 'onDark' : 'soft'} icon={StepIcon}>
              {label}
            </Badge>
            {i < steps.length - 1 && <ArrowRight size={14} className="text-subtle" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Hero visual: one picture for all three services (AI Chat, Otomatisasi, Solusi Custom), as three equal cards. */
export function HeroVisual() {
  const active = useActiveService();
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <FlowCard icon={MessageCircle} title="AI Chat" steps={chatFlow} tone="grey" active={active === 0} />
      <FlowCard icon={Workflow} title="Otomatisasi" steps={flow} active={active === 1} />

      <div className={cardClass(active === 2)}>
        <div className="flex items-center gap-2 text-sm font-bold text-strong">
          <Globe size={18} className="text-link" aria-hidden="true" />
          <span className="font-display">Solusi Custom</span>
        </div>
        <ul className="flex flex-wrap gap-2">
          {customTypes.map(({ icon: Icon, label }) => (
            <li key={label}>
              <Badge tone="neutral" icon={Icon}>
                {label}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
