import {
  Award, BarChart3, Bell, Briefcase, Building2, Camera, Car, CheckCircle2, ChevronRight, Code2, Coins, FileText, Gauge,
  Headphones, History, Layers, Leaf, Link2, ListChecks, LogIn, Map, MapPin, MessageCircle, Play, RefreshCw,
  Route, Rss, ScanLine, Search, ShieldCheck, SlidersHorizontal, TrendingUp, Truck, Upload, Users,
  type LucideIcon,
} from 'lucide-react';
import type { ProcessIcon, ProcessStep } from '@/content/projects';

export const processIcons: Record<ProcessIcon, LucideIcon> = {
  file: FileText, upload: Upload, code: Code2, award: Award, scan: ScanLine, layers: Layers, chart: BarChart3,
  map: Map, link: Link2, rss: Rss, message: MessageCircle, 'log-in': LogIn, 'map-pin': MapPin, route: Route,
  car: Car, users: Users, check: CheckCircle2, sliders: SlidersHorizontal, list: ListChecks, play: Play,
  camera: Camera, bell: Bell, search: Search, building: Building2, shield: ShieldCheck, history: History,
  refresh: RefreshCw, leaf: Leaf, trending: TrendingUp, briefcase: Briefcase, coins: Coins, truck: Truck,
  headset: Headphones, gauge: Gauge,
};

/**
 * Infographic of how a project works: numbered steps, each a compact card with an icon, a title and one line.
 * Up to 4 steps run in one row joined by arrows; more than that wrap into a numbered grid (no arrows) so the
 * cards stay readable.
 */
export function ProcessFlow({ steps }: { steps: ProcessStep[] }) {
  if (steps.length > 4) {
    return (
      <ol className={`grid gap-3 sm:grid-cols-2 ${steps.length <= 6 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
        {steps.map((step, i) => {
          const Icon = processIcons[step.icon];
          return (
            <li key={step.title} className="flex flex-col gap-2 rounded-card border border-line bg-card p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-soft text-link">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="font-mono text-xs font-medium text-eyebrow">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-display text-sm font-bold leading-snug text-strong">{step.title}</h3>
              <p className="text-xs leading-relaxed text-muted">{step.body}</p>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-2">
      {steps.map((step, i) => {
        const Icon = processIcons[step.icon];
        return (
          <li key={step.title} className="contents lg:flex lg:flex-1 lg:items-stretch lg:gap-2">
            <div className="flex flex-col gap-2 rounded-card border border-line bg-card p-4 lg:flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent-soft text-link">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="font-mono text-xs font-medium text-eyebrow">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-display text-sm font-bold leading-snug text-strong">{step.title}</h3>
              <p className="text-xs leading-relaxed text-muted">{step.body}</p>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="hidden items-center text-subtle lg:flex">
                <ChevronRight size={16} />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
