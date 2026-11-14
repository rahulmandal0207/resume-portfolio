import {
  certificates,
  profile,
  projects,
  skills,
  timeline,
} from '../../../data/portfolio.data';
import { TimelineEntry, TimelineKind } from '../../../data/portfolio.models';
import { formatDate, formatRange, shortHash, sortKey } from '../../../utils/format';

/* ------------------------------------------------------------------ *
 *  The terminal's "shell". Pure functions: text in, lines out.
 *  Everything it prints is read from portfolio.data.ts.
 *
 *  To add a command: add it to COMMANDS (so `help` lists it) and
 *  handle it in the switch inside runCommand().
 * ------------------------------------------------------------------ */

export interface TerminalLine {
  kind: 'command' | 'text' | 'muted' | 'detail' | 'error' | 'pair' | 'commit' | 'link';
  text: string;
  /** Left column for 'pair' and 'link' lines. */
  key?: string;
  /** Commit-style hash for 'commit' lines. */
  hash?: string;
  head?: boolean;
  href?: string;
  /** Delay before the line fades in, used for the scripted intro. */
  delay?: number;
}

/** Something the terminal component has to do in the page. */
export type TerminalEffect =
  | { type: 'clear' }
  | { type: 'open'; url: string }
  | { type: 'goto'; id: string }
  | { type: 'theme'; value: 'dark' | 'light' | 'toggle' };

export interface CommandResult {
  lines: TerminalLine[];
  effect?: TerminalEffect;
}

interface CommandInfo {
  name: string;
  usage?: string;
  description: string;
}

export const COMMANDS: CommandInfo[] = [
  { name: 'help', description: 'list these commands' },
  { name: 'whoami', description: 'name and role' },
  { name: 'about', description: 'short bio' },
  { name: 'experience', description: 'work history' },
  { name: 'education', description: 'degrees' },
  { name: 'skills', description: 'tech stack by area' },
  { name: 'projects', description: 'things I have built' },
  { name: 'certificates', description: 'courses and credentials' },
  { name: 'contact', description: 'email and profiles' },
  { name: 'open', usage: 'open <name>', description: 'open a project or profile' },
  { name: 'goto', usage: 'goto <where>', description: 'scroll to a page section' },
  { name: 'theme', usage: 'theme [mode]', description: 'dark, light, or toggle' },
  { name: 'clear', description: 'clear the screen' },
];

/** Shorter or more familiar names for the commands above. */
const ALIASES: Record<string, string> = {
  '?': 'help',
  work: 'experience',
  jobs: 'experience',
  stack: 'skills',
  ls: 'projects',
  certs: 'certificates',
  email: 'contact',
  cd: 'goto',
  cls: 'clear',
};

const SECTIONS = ['top', 'about', 'journey', 'projects', 'certificates', 'contact'];

/** Shown as tappable chips under the terminal. */
export const SUGGESTIONS = ['help', 'experience', 'skills', 'projects', 'contact'];

const text = (value: string): TerminalLine => ({ kind: 'text', text: value });
const muted = (value: string): TerminalLine => ({ kind: 'muted', text: value });
const error = (value: string): TerminalLine => ({ kind: 'error', text: value });
const pair = (key: string, value: string): TerminalLine => ({ kind: 'pair', key, text: value });
const link = (key: string, label: string, href: string): TerminalLine => ({
  kind: 'link',
  key,
  text: label,
  href,
});

function newestFirst(kind?: TimelineKind): TimelineEntry[] {
  return timeline
    .filter((entry) => !kind || entry.kind === kind)
    .sort((a, b) => sortKey(b.start) - sortKey(a.start));
}

function commits(entries: TimelineEntry[]): TerminalLine[] {
  return entries.map((entry, index) => ({
    kind: 'commit',
    hash: shortHash(entry.id),
    text: `${entry.title} @ ${entry.org}`,
    head: index === 0,
  }));
}

function history(entries: TimelineEntry[]): TerminalLine[] {
  return entries.flatMap<TerminalLine>((entry) => [
    text(`${entry.title} @ ${entry.org}`),
    {
      kind: 'detail',
      text: `${formatRange(entry.start, entry.end)}${entry.tags?.length ? '  ·  ' + entry.tags.join(', ') : ''}`,
    },
  ]);
}

/** Things `open` understands, mapped to the URL they open. */
function openTargets(): Record<string, string> {
  const targets: Record<string, string> = {
    github: `https://github.com/${profile.github}`,
    linkedin: `https://www.linkedin.com/in/${profile.linkedin}`,
    email: `mailto:${profile.email}`,
  };
  if (profile.resumeUrl) targets['resume'] = profile.resumeUrl;
  for (const project of projects) {
    const url = project.demo ?? project.repo;
    if (url) targets[project.id] = url;
  }
  return targets;
}

/** Lines the terminal "types" by itself when the page loads. */
export function introLines(): TerminalLine[] {
  const lines: TerminalLine[] = [
    { kind: 'command', text: 'whoami' },
    ...runCommand('whoami').lines,
    { kind: 'command', text: 'git log --oneline' },
    ...commits(newestFirst().slice(0, 4)),
    muted("Type 'help' to see what else you can run."),
  ];
  return lines.map((line, index) => ({ ...line, delay: 350 + index * 130 }));
}

/** Runs one line of input and returns what to print (and do). */
export function runCommand(input: string, pastCommands: string[] = []): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [] };

  const [first, ...args] = trimmed.split(/\s+/);
  const typed = first.toLowerCase();
  const name = ALIASES[typed] ?? typed;
  const arg = args.join(' ').toLowerCase();

  switch (name) {
    case 'help':
      return {
        lines: [
          ...COMMANDS.map((command) => pair(command.usage ?? command.name, command.description)),
          muted('Tab completes, ↑ and ↓ walk through history.'),
        ],
      };

    case 'whoami':
      return { lines: [text(`${profile.name} · ${profile.role}`)] };

    case 'about':
      return { lines: profile.about.map(text) };

    case 'experience':
      return { lines: history(newestFirst('work')) };

    case 'education':
      return { lines: history(newestFirst('education')) };

    case 'skills':
      return { lines: skills.map((group) => pair(group.label.toLowerCase(), group.items.join(', '))) };

    case 'projects':
      return {
        lines: [
          ...projects.map((project) => pair(project.id, `${project.title} (${project.stack.join(', ')})`)),
          muted("Run 'open <name>' to open one, e.g. open " + (projects[0]?.id ?? 'github') + '.'),
        ],
      };

    case 'certificates':
      return {
        lines: [...certificates]
          .sort((a, b) => sortKey(b.date) - sortKey(a.date))
          .map((certificate) =>
            pair(formatDate(certificate.date), `${certificate.title} · ${certificate.issuer}`),
          ),
      };

    case 'contact':
      return {
        lines: [
          link('email', profile.email, `mailto:${profile.email}`),
          link('github', `github.com/${profile.github}`, `https://github.com/${profile.github}`),
          link(
            'linkedin',
            `linkedin.com/in/${profile.linkedin}`,
            `https://www.linkedin.com/in/${profile.linkedin}`,
          ),
        ],
      };

    case 'open': {
      const targets = openTargets();
      if (!arg) {
        return { lines: [muted('usage: open <name>'), text(Object.keys(targets).join('  '))] };
      }
      const url = targets[arg];
      if (!url) {
        return {
          lines: [error(`open: nothing called '${arg}'`), muted('Try: ' + Object.keys(targets).join(', '))],
        };
      }
      return { lines: [link('opening', url.replace(/^mailto:/, ''), url)], effect: { type: 'open', url } };
    }

    case 'goto': {
      if (!arg) return { lines: [muted('usage: goto <where>'), text(SECTIONS.join('  '))] };
      const id = arg.replace(/^[#/~]+/, '') || 'top';
      if (!SECTIONS.includes(id)) {
        return { lines: [error(`goto: no section '${arg}'`), muted('Try: ' + SECTIONS.join(', '))] };
      }
      return { lines: [muted(`Scrolling to ${id}…`)], effect: { type: 'goto', id } };
    }

    case 'theme': {
      if (arg && arg !== 'dark' && arg !== 'light' && arg !== 'toggle') {
        return { lines: [error(`theme: unknown mode '${arg}'`), muted('Use: theme dark, theme light, or theme')] };
      }
      const value = (arg || 'toggle') as 'dark' | 'light' | 'toggle';
      return {
        lines: [muted(value === 'toggle' ? 'Theme switched.' : `Theme set to ${value}.`)],
        effect: { type: 'theme', value },
      };
    }

    case 'clear':
      return { lines: [], effect: { type: 'clear' } };

    // ---- A few things people type into any terminal ----
    case 'git':
      return arg.startsWith('log')
        ? { lines: commits(newestFirst()) }
        : { lines: [error("git: only 'git log' works here")] };

    case 'cat':
      return arg === 'stack.txt'
        ? { lines: [text(profile.headlineStack.join('  ·  '))] }
        : { lines: [error(`cat: ${arg || 'missing file name'}: try 'cat stack.txt'`)] };

    case 'history':
      return { lines: pastCommands.map((command, index) => pair(String(index + 1), command)) };

    case 'echo':
      return { lines: [text(args.join(' '))] };

    case 'sudo':
      return { lines: [error('Permission denied. Nice try.')] };

    case 'exit':
      return { lines: [muted("Nothing to exit. Try 'goto contact' instead.")] };

    default: {
      const guess = closest(typed);
      return {
        lines: [
          error(`command not found: ${first}`),
          muted(guess ? `Did you mean '${guess}'? ` + "Type 'help' for the full list." : "Type 'help' for the full list."),
        ],
      };
    }
  }
}

export interface Completion {
  /** The input after completing as far as possible. */
  value: string;
  /** All candidates, when more than one matched. */
  options: string[];
}

/** Tab completion for command names and for the arguments of open / goto / theme. */
export function complete(input: string): Completion {
  const leading = input.trimStart();
  const parts = leading.split(/\s+/);

  if (parts.length <= 1) {
    const names = [...COMMANDS.map((command) => command.name), ...Object.keys(ALIASES)];
    const matches = names.filter((name) => name.startsWith(parts[0].toLowerCase())).sort();
    if (matches.length === 1) return { value: matches[0] + ' ', options: [] };
    return { value: commonPrefix(matches) || leading, options: matches };
  }

  const command = ALIASES[parts[0].toLowerCase()] ?? parts[0].toLowerCase();
  const candidates =
    command === 'open'
      ? Object.keys(openTargets())
      : command === 'goto'
        ? SECTIONS
        : command === 'theme'
          ? ['dark', 'light']
          : command === 'cat'
            ? ['stack.txt']
            : [];

  const partial = parts.slice(1).join(' ').toLowerCase();
  const matches = candidates.filter((candidate) => candidate.startsWith(partial)).sort();
  if (!matches.length) return { value: input, options: [] };
  if (matches.length === 1) return { value: `${parts[0]} ${matches[0]}`, options: [] };
  return { value: `${parts[0]} ${commonPrefix(matches)}`, options: matches };
}

function commonPrefix(values: string[]): string {
  if (!values.length) return '';
  let prefix = values[0];
  for (const value of values) {
    while (!value.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

/** Nearest command name within two edits, for "did you mean". */
function closest(typed: string): string | null {
  let best: string | null = null;
  let bestDistance = 3;
  for (const { name } of COMMANDS) {
    const distance = editDistance(typed, name);
    if (distance < bestDistance) {
      best = name;
      bestDistance = distance;
    }
  }
  return best;
}

function editDistance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}
