import {
  siApachekafka,
  siCircleci,
  siDjango,
  siFramer,
  siMapbox,
  siMobx,
  siNextdotjs,
  siPostgresql,
  siPython,
  siReact,
  siSentry,
  siSonarqubeserver,
  siStoryblok,
  siStyledcomponents,
  siTypescript,
  siWordpress,
} from 'simple-icons';

export interface TechItem {
  name: string;
  /** SVG path from simple-icons (CC0). Omitted where no icon is available: name only. */
  path?: string;
}

/** Technologies from the founder's own projects and skills. */
export const techStack: TechItem[] = [
  { name: 'React', path: siReact.path },
  { name: 'Next.js', path: siNextdotjs.path },
  { name: 'TypeScript', path: siTypescript.path },
  { name: 'Python', path: siPython.path },
  { name: 'Django', path: siDjango.path },
  { name: 'PostgreSQL', path: siPostgresql.path },
  { name: 'OpenAI' },
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
];
