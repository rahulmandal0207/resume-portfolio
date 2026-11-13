import { profile, projects, timeline } from '../../../data/portfolio.data';
import { COMMANDS, complete, introLines, runCommand } from './terminal.commands';

const printed = (input: string) =>
  runCommand(input)
    .lines.map((line) => `${line.key ?? ''} ${line.text}`)
    .join('\n');

describe('terminal commands', () => {
  it('lists every command in help', () => {
    const output = printed('help');
    for (const command of COMMANDS) expect(output).toContain(command.name);
  });

  it('answers whoami from the profile', () => {
    expect(printed('whoami')).toContain(profile.name);
  });

  it('shows the current job as Present in experience', () => {
    const current = timeline.find((entry) => entry.kind === 'work' && !entry.end);
    const output = printed('experience');

    expect(current).toBeDefined();
    expect(output).toContain(current!.org);
    expect(output).toContain('Present');
    expect(output).not.toContain('University');
  });

  it('accepts aliases and ignores case and extra spaces', () => {
    expect(printed('  WORK  ')).toBe(printed('experience'));
    expect(printed('ls')).toBe(printed('projects'));
  });

  it('lists every project', () => {
    const output = printed('projects');
    for (const project of projects) expect(output).toContain(project.id);
  });

  it('opens profiles and projects by name', () => {
    expect(runCommand('open github').effect).toEqual({
      type: 'open',
      url: `https://github.com/${profile.github}`,
    });
    const project = projects[0];
    expect(runCommand(`open ${project.id}`).effect).toEqual({
      type: 'open',
      url: (project.demo ?? project.repo)!,
    });
  });

  it('reports an unknown open target without opening anything', () => {
    const result = runCommand('open nothing-here');
    expect(result.effect).toBeUndefined();
    expect(result.lines[0].kind).toBe('error');
  });

  it('scrolls to known sections only', () => {
    expect(runCommand('goto journey').effect).toEqual({ type: 'goto', id: 'journey' });
    expect(runCommand('cd #projects').effect).toEqual({ type: 'goto', id: 'projects' });
    expect(runCommand('goto nowhere').effect).toBeUndefined();
  });

  it('switches theme', () => {
    expect(runCommand('theme').effect).toEqual({ type: 'theme', value: 'toggle' });
    expect(runCommand('theme light').effect).toEqual({ type: 'theme', value: 'light' });
    expect(runCommand('theme pink').effect).toBeUndefined();
  });

  it('clears the screen', () => {
    expect(runCommand('clear')).toEqual({ lines: [], effect: { type: 'clear' } });
  });

  it('suggests the nearest command for a typo', () => {
    const result = runCommand('skils');
    expect(result.lines[0].kind).toBe('error');
    expect(result.lines[1].text).toContain("'skills'");
  });

  it('prints nothing for empty input', () => {
    expect(runCommand('   ').lines).toEqual([]);
  });

  it('completes command names and arguments', () => {
    expect(complete('exp').value).toBe('experience ');
    expect(complete('goto jo').value).toBe('goto journey');
    expect(complete('c').options).toContain('contact');
    expect(complete('c').options).toContain('clear');
    expect(complete('zzz')).toEqual({ value: 'zzz', options: [] });
  });

  it('starts with an intro that includes the newest timeline entry', () => {
    const newest = [...timeline].sort((a, b) => b.start.localeCompare(a.start))[0];
    expect(introLines().some((line) => line.text.includes(newest.org))).toBeTrue();
  });
});
