/**
 * Shapes for everything shown on the site.
 * Content lives in `portfolio.data.ts` — edit that file, not the components.
 */

/** A date written as 'YYYY' or 'YYYY-MM', e.g. '2023' or '2022-11'. */
export type YearMonth = string;

export interface Link {
  label: string;
  url: string;
  icon?: 'github' | 'external' | 'linkedin' | 'mail' | 'download';
}

export interface Profile {
  name: string;
  /** Short lowercase handle shown in the header, e.g. 'rahul-mandal'. */
  handle: string;
  role: string;
  tagline: string;
  about: string[];
  email: string;
  github: string;
  linkedin: string;
  /** Stack shown in the hero terminal. Keep it to 4–6 items. */
  headlineStack: string[];
  /** Put a PDF in /public and set this to its file name to show a "Résumé" button. */
  resumeUrl?: string;
}

export type TimelineKind = 'work' | 'education';

export interface TimelineEntry {
  /** Unique, never shown. Also seeds the commit-style hash next to the entry. */
  id: string;
  kind: TimelineKind;
  /** Job title, or the degree / class for education. */
  title: string;
  /** Company, school or university. */
  org: string;
  location?: string;
  start: YearMonth;
  /** Leave out for something you are still doing — it shows as "Present". */
  end?: YearMonth;
  summary?: string;
  highlights?: string[];
  tags?: string[];
  links?: Link[];
}

export interface Project {
  id: string;
  title: string;
  /** e.g. 'Major project', 'Hobby project'. */
  kind: string;
  /** Where it was built, e.g. a university or company. */
  context?: string;
  start: YearMonth;
  end?: YearMonth;
  description: string;
  stack: string[];
  repo?: string;
  demo?: string;
  /** Optional screenshot in /public, e.g. 'projects/vrpr.png'. */
  image?: string;
  /** Featured projects get the large cards at the top. */
  featured?: boolean;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date: YearMonth;
  description?: string;
  url?: string;
}
