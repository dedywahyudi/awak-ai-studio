import {
  siApachekafka,
  siCircleci,
  siDocker,
  siDjango,
  siFramer,
  siGithub,
  siMapbox,
  siMobx,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siResend,
  siSentry,
  siSonarqubeserver,
  siStoryblok,
  siStyledcomponents,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWordpress,
} from 'simple-icons';

export interface TechItem {
  name: string;
  /** SVG path (24x24), from simple-icons (CC0). */
  path?: string;
  /** Fill the path with the even-odd rule, for icons that need it. */
  evenodd?: boolean;
}

/** Technologies from the founder's own projects and skills. */
export const techStack: TechItem[] = [
  { name: 'React', path: siReact.path },
  { name: 'Next.js', path: siNextdotjs.path },
  { name: 'TypeScript', path: siTypescript.path },
  { name: 'Python', path: siPython.path },
  { name: 'Django', path: siDjango.path },
  { name: 'PostgreSQL', path: siPostgresql.path },
  { name: 'Mapbox', path: siMapbox.path },
  { name: 'Apache Kafka', path: siApachekafka.path },
  { name: 'MobX', path: siMobx.path },
  { name: 'Storyblok', path: siStoryblok.path },
  { name: 'Framer', path: siFramer.path },
  { name: 'Styled Components', path: siStyledcomponents.path },
  { name: 'WordPress', path: siWordpress.path },
  { name: 'CircleCI', path: siCircleci.path },
  { name: 'Sentry', path: siSentry.path },
  { name: 'SonarQube', path: siSonarqubeserver.path },
  { name: 'Tailwind CSS', path: siTailwindcss.path },
  { name: 'Node.js', path: siNodedotjs.path },
  { name: 'Supabase', path: siSupabase.path },
  { name: 'Vercel', path: siVercel.path },
  { name: 'Resend', path: siResend.path },
  { name: 'GitHub', path: siGithub.path },
  { name: 'Docker', path: siDocker.path },
];
