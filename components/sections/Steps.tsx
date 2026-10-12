export interface Step {
  title: string;
  body: string;
}

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-col gap-3 rounded-card border border-line bg-card p-6">
          <span className="font-mono text-sm font-medium text-eyebrow">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display text-lg font-bold text-strong">{s.title}</h3>
          <p className="text-sm leading-relaxed text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
